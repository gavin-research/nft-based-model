// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.4.0
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

//SEPOLIA 0x8730Bc786060d20eA57E691f19196C460bc5E8B4 
contract GAVINNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    address public issuer;
    
    constructor(address initialOwner)
        ERC721("NFTGAVIN", "GVN")
        Ownable(initialOwner)
    {
        issuer = msg.sender;
    }

    modifier onlyIssuer(address _issuer)   {
        require(_issuer == issuer);
        _;
    }

    
    function safeMint(address to, string memory uri)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    // can only be minted or burnt by Issuer (from or to 0x00)
    function transferFrom(address _from, address _to, uint256 _tokenId)
        public 
        onlyIssuer(msg.sender) 
        override(ERC721, IERC721)
    {
        require((_from == address(0)) || (_to == address(0)), "Token not transferable");
        address previousOwner = _update(_to, _tokenId, _msgSender());
        if (previousOwner != _from) {
            revert ERC721IncorrectOwner(_from, _tokenId, previousOwner);
        }
    }

      function burn(uint256 tokenId) public onlyIssuer(msg.sender) {
        super._burn(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}