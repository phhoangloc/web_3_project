// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import {IERC721} from "openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import {ERC721URIStorage} from "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract NFTMarket {
    struct Item {
        address owner;
        uint256 tokenId;
        uint256 price;
        bool sell;
    }

    mapping(uint256 => Item) public list;

    function consign(uint256 tokenId, uint256 price, address add) public {
        require(price > 0, "price must be bigger than 0");
        require(
            IERC721(add).ownerOf(tokenId) == msg.sender,
            "Contract not approved to transfer this token"
        );

        Item memory _item;
        _item = Item({
            owner: msg.sender,
            tokenId: tokenId,
            price: price,
            sell: true
        });
        list[tokenId] = _item;
    }
    function updateConsign(
        uint256 tokenId,
        uint256 price,
        address add,
        bool _sell
    ) public {
        require(price > 0, "price must be bigger than 0");
        require(
            IERC721(add).ownerOf(tokenId) == msg.sender,
            "Contract not approved to transfer this token"
        );
        Item memory _item;
        _item = Item({
            owner: msg.sender,
            tokenId: tokenId,
            price: price,
            sell: _sell
        });
        list[tokenId] = _item;
    }

    function buyNFT(uint256 tokenId) public payable {
        require(msg.value > 0, "price must be bigger than 0");
        Item memory item = list[tokenId];
        delete list[tokenId];
        bool success = payable(item.owner).send(msg.value);
        require(success, "send money failed");

        Item memory _item;
        _item = Item({
            owner: msg.sender,
            tokenId: tokenId,
            price: 0,
            sell: false
        });
        list[tokenId] = _item;
    }

    function getItem(uint256 id) external view returns (Item memory) {
        return list[id];
    }
}
