// SPDX-License-Identifier: MIT
/// @custom:security-contact charlie@nftythreads.club

pragma solidity >=0.8.6;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol"; // Check if this is gas heavy and remove it if needed
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AwardsERC1155 is ERC1155, AccessControl, ERC1155Supply {
    using SafeMath for uint256;
    uint256 private _currentTokenID = 0;
    mapping(uint256 => address) public awardCreators;
    mapping(uint256 => uint256) private _totalSupply;
    mapping(uint256 => uint256) private awardLimit;
    mapping(uint256 => string) private awardName;
    mapping(uint256 => string) private baseURI;
    mapping(uint256 => mapping(address => uint256)) private _balances;
    string public name = "AwardsERC1155";
    bytes32 private constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // TODO - Setup roles for each award ID

    constructor() ERC1155("AwardsERC1155") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Events

    /**
     * @dev Require msg.sender to be the creator of the token id
     * Should be replaced with a ROLE for each token ID (Award Type)
     */
    modifier onlyCreator(uint256 _id) {
        require(
            awardCreators[_id] == msg.sender,
            "ERC1155Tradable#onlyCreator: ONLY_creator_ALLOWED"
        );
        _;
    }

    function createNewAward(
        uint256 _awardLimit,
        string calldata _name,
        string calldata _uri
    ) external returns (uint256) {
        uint256 _id = _getNextTokenID();
        _incrementTokenTypeId();

        awardCreators[_id] = msg.sender; // replace with role
        awardLimit[_id] = _awardLimit;
        awardName[_id] = _name;
        baseURI[_id] = _uri;

        return _id;
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyCreator(id) {
        require(
            _totalSupply[id] + amount <= awardLimit[id],
            "NFTy1155#mint: TOKEN_MAX_SUPPLY_EXCEEDED"
        );
        _totalSupply[id] = _totalSupply[id] += amount;
        _mint(account, id, amount, data);
    }

    function setAwardOwner(address _to, uint256[] memory _ids) public {
        require(
            _to != address(0),
            "ERC1155Tradable#setAwardOwner: INVALID_ADDRESS."
        );
        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 id = _ids[i];
            _setAwardOwner(_to, id);
        }
    }

    function _setAwardOwner(address _to, uint256 _id)
        internal
        onlyCreator(_id)
    {
        awardCreators[_id] = _to;
    }

    /**
     * @dev calculates the next token ID based on value of _currentTokenID
     * @return uint256 for the next token ID
     */
    function _getNextTokenID() private view returns (uint256) {
        return _currentTokenID + 1;
    }

    /**
     * @dev increments the value of _currentTokenID
     */
    function _incrementTokenTypeId() private {
        _currentTokenID++;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        require(from == address(0), "Awards are not transferable");
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
