// SPDX-License-Identifier: MIT
/// @custom:security-contact charlie@nftythreads.club

//TODO - Lots of code clean up and style improvements - I am mixing lots of variables names
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol"; // Check if this is gas heavy and remove it if needed
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract BadgesERC1155 is ERC1155, AccessControl, ERC1155Supply {
    using SafeMath for uint256;
    uint256 private _currentTokenID = 0;
    mapping(uint256 => address) public badgeCreators;
    mapping(uint256 => uint256) private _totalSupply;
    mapping(uint256 => uint256) private badgeLimit;
    mapping(uint256 => string) private badgeName;
    mapping(uint256 => string) private tokenURIs;
    mapping(uint256 => mapping(address => uint256)) private _balances;
    string public name = "BadgesERC1155";
    bytes32 private constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // TODO - Setup roles for each badge ID

    constructor() ERC1155("BadgesERC1155") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Events
    event newBadgeCreated(address indexed _creator, uint256 _id, string  _tokenURI, uint256 _tokenMaxSupply);
    event newBadgeMinted(address indexed _recipent, uint256 _id, string  _tokenURI);


    /**
     * @dev Require msg.sender to be the creator of the token id
     * Should be replaced with a ROLE for each token ID (Badge Type)
     */
    modifier onlyCreator(uint256 _id) {
        require(
            badgeCreators[_id] == msg.sender,
            "ERC1155Tradable#onlyCreator: ONLY_creator_ALLOWED"
        );
        _;
    }

    function createNewBadge(
        uint256 _badgeLimit,
        string calldata _name,
        string calldata _uri
    ) external returns (uint256) {
        uint256 _id = _getNextTokenID();
        _incrementTokenTypeId();

        badgeCreators[_id] = msg.sender; // replace with role
        badgeLimit[_id] = _badgeLimit;
        badgeName[_id] = _name;
        tokenURIs[_id] = _uri;
        emit newBadgeCreated(msg.sender, _id, _uri, _badgeLimit);
        return _id;
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyCreator(id) { // Change to use a role allowing multiple minters
        uint256 token_limit = badgeLimit[id];
        if (token_limit != 0) {
            require(
                _totalSupply[id] + amount <= token_limit,
                "NFTy1155#mint: TOKEN_MAX_SUPPLY_EXCEEDED"
            );
        }
        _totalSupply[id] += amount;
        _mint(account, id, amount, data);
        emit newBadgeMinted(account, id, tokenURIs[id]);

    }

    // Change a role allowing multiple minters
    function setBadgeOwner(address _to, uint256[] memory _ids) public {
        require(
            _to != address(0),
            "ERC1155Tradable#setBadgeOwner: INVALID_ADDRESS."
        );
        for (uint256 i = 0; i < _ids.length; i++) {
            uint256 id = _ids[i];
            _setBadgeOwner(_to, id);
        }
    }

    function _setBadgeOwner(address _to, uint256 _id)
        internal
        onlyCreator(_id)
    {
        badgeCreators[_id] = _to;
    }

    // This seems unnecessary, could use a naked counter instead. 
    function _getNextTokenID() private view returns (uint256) {
        return _currentTokenID + 1;
    }

    function uri(uint256 id) public view virtual override returns (string memory) {
        return tokenURIs[id];
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
        require(from == address(0), "Badges are not transferable");
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
