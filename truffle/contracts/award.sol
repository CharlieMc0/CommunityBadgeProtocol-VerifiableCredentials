// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

// TODO - Test Rinkey Opensea whitelisting 
// TODO - See If More Optimization Is Possible 
// TODO - ERC-2981 Support - Pending OpenZeppelin 4.5.0
// TODO - Check all values are correct for reserved apes, max ape purchases, etc 

contract OwnableDelegateProxy {}
/**
 * Used to delegate ownership of a contract to another address, to save on unneeded transactions to approve contract use for users
 */
contract ProxyRegistry {
  mapping(address => OwnableDelegateProxy) public proxies;
}

contract Award is ERC721 {
    // using SafeMath for uint256;
    using Strings for uint256;
    using Counters for Counters.Counter;
    using Address for address payable;

    address proxyRegistryAddress;

    Counters.Counter private _id;

    // struct AwardMetadata {
    //     string name;
    //     string description;
    //     string url;
    //     string image_url;
    //     string issuedByGroupId;
    //     string issuedByUserId;
    //     string issuedToGroupId;
    //     string issuedToUserId;
    // }

    // mapping (uint256 => AwardMetadata) metadata;

    mapping (uint256 => string) tokenURIs;

    constructor( ) ERC721("Excellence Award", "AWARD") {}

    function mintAward(address _recipient, string calldata  _uri) external payable {
        
        _id.increment();
        uint256 current_id = _id.current();
        tokenURIs[current_id] = _uri;
        _safeMint(_recipient, current_id);

        // metadata[current_id].name = "name";
        // metadata[current_id].description = "DESCRIPTION";
        // metadata[current_id].url = "URL";


        // require(privateSaleActive, "Sale is not active");
        // require(numberOfTokens <= _allowList[msg.sender], "You are not allowed to mint anymore apes");
        // require(_id.current() + numberOfTokens <= maxApes, "Apes have been sold out!");
        // require(price * numberOfTokens <= msg.value, "Ether value sent is not correct");
        // _allowList[msg.sender] -= numberOfTokens;
    }

    function transferFrom ( address from, address to, uint256 tokenId) public virtual override {
        require(from == address(0), "Awards are not transferable");
        _transfer(from, to, tokenId);
    }
    // function setAllowList(address[] calldata addresses, uint256 numAllowedToMint) external  {
    //     for (uint256 i = 0; i < addresses.length; i++) {
    //         _allowList[addresses[i]] = numAllowedToMint;
    //     }
    // }

    // function mintApe(uint256 numberOfTokens) external payable {
    //     require(privateSaleActive, "Sale is not active");
    //     require(numberOfTokens <= _allowList[msg.sender], "You are not allowed to mint anymore apes");
    //     require(_id.current() + numberOfTokens <= maxApes, "Apes have been sold out!");
    //     require(price * numberOfTokens <= msg.value, "Ether value sent is not correct");
    //     _allowList[msg.sender] -= numberOfTokens;
        
    //     for (uint256 i = 0; i < numberOfTokens; i++) {
    //         _id.increment();
    //         _safeMint(msg.sender, _id.current());
    //     }
    // }

    // function airdropApes(address[] calldata _addresses) external  {
    //     uint256 _quantity = _addresses.length;
    //     uint256 _airDroppedApes = airDroppedApes;
    //     require(_quantity + _airDroppedApes <= reservedAirApes , "This exceeds the number of reserved apes");
    //     require(_id.current() + _quantity <= maxApes, "Requested number of Apes exceeds max supply");
   
    //     airDroppedApes = _airDroppedApes + _quantity;
        
    //     for (uint256 i = 0; i < _quantity; i++) {
    //         _id.increment();
    //         _mint(_addresses[i], _id.current());
    //     }    
    // }

    // Internal Functions / State Changes
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // function togglePrivateSaleState() external  returns (bool) {
    //     privateSaleActive = !privateSaleActive;
    //     return privateSaleActive;
    // }

    // function toggleRevealState() external  returns (bool) {
    //     revealStatus = !revealStatus;
    //     return revealStatus;
    // }

    // function totalSupply() external view returns (uint256) {
    //     return _id.current();
    // }

    // function setPrice(uint256 _price) external  {
    //     price = _price;
    // }

    /**
     * @dev Returns placeholder IPFS image hash until reveal = true
     */

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenURIs[tokenId];

    }
    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    // function isApprovedForAll(address owner, address operator)
    //     override
    //     public
    //     view
    //     returns (bool)
    // {
    //     // Whitelist OpenSea proxy contract for easy trading.
    //     ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
    //     if (address(proxyRegistry.proxies(owner)) == operator) {
    //         return true;
    //     }
    //     return super.isApprovedForAll(owner, operator);
    // }
}
