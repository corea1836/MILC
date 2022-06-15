// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./NFT.sol";


import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


error AlreadyTokenExist();
error PriceEqualOrLessThenZero();
error NotEnoughEtherCoverItemPrice();
error ItemSoldOut();
error TokenNotinMarketplace();
error NotTokneOwner();
error ItemNotExist();

contract Marketplace is ReentrancyGuard {

  address payable public immutable feeAccount;
  
  uint public immutable feePercent;

  uint public itemCount;



  struct Item {
    uint itemId;
    IERC721 nft;
    uint tokenId;
    uint price;
    address payable seller;
    bool sold;
  }

  event Offered (
    uint itemId,
    address indexed nft,
    uint tokenId,
    uint price,
    address indexed seller
  );

  event Bought (
    uint itemId,
    address indexed nft,
    uint tokenId,
    uint price,
    address indexed seller,
    address indexed buyer
  );

mapping(uint => Item) public items;

constructor(uint _feePercent) {
  feeAccount = payable(msg.sender);
  feePercent = _feePercent;
}


function makeItem(NFT _nft, uint _tokenId, uint _price) external nonReentrant {
    if(_nft.isRealization(_tokenId) == true) revert AlreadyTokenExist();
    if(_price <= 0) revert PriceEqualOrLessThenZero();

    itemCount ++;

    _nft.transferFrom(msg.sender, address(this), _tokenId);

    items[itemCount] = Item (
      itemCount,
      _nft,
      _tokenId,
      _price,
      payable(msg.sender),
      false
    );

    emit Offered(itemCount, address(_nft), _tokenId, _price, msg.sender);
  }


  function purchaseItem(NFT _nft, uint _itemId) external payable nonReentrant {

    uint _totalPrice = getTotalPrice(_itemId);

    Item storage item = items[_itemId];

    if(_itemId <= 0 || _itemId > itemCount) revert ItemNotExist();
    if(msg.value < _totalPrice) revert NotEnoughEtherCoverItemPrice();
    if(item.sold == true) revert ItemSoldOut();

    item.seller.transfer(item.price);

    feeAccount.transfer(_totalPrice - item.price);

    item.sold = true;

    item.nft.transferFrom(address(this), msg.sender, item.tokenId);

    _nft.addTokenReceipt(item.seller, msg.sender, item.price, item.tokenId);


    emit Bought(
      _itemId,
      address(item.nft),
      item.tokenId,
      item.price,
      item.seller,
      msg.sender
    );
  }

  function getTotalPrice(uint _itemId) public view returns(uint) {
    return items[_itemId].price * (100 + feePercent) / 100;
  }

  function likeViewBatch(uint256[] memory ids) public view returns(Item[] memory) {
    uint LikeItemsCount = ids.length;
    uint currentIndex = 0;
    Item[] memory likeItems = new Item[](LikeItemsCount);


    for(uint i = 0; i < LikeItemsCount; i++) {
      uint currentId = items[ids[i]].itemId;
      Item storage currentItem = items[currentId];
      likeItems[currentIndex] = currentItem;
      currentIndex += 1;
    }
    return likeItems;
  }

  function nftInMarket(NFT _nft, uint _tokenId) public view returns(bool) {
    if (0 >= _tokenId || _tokenId > _nft.tokenCount()) revert TokenNotExist();
    if (address(_nft.ownerOf(_tokenId)) != address(this)) revert TokenNotinMarketplace();
    return true;
  }

  function cancelItem(uint _itemId) external nonReentrant {
    Item storage item = items[_itemId];

    if (msg.sender != item.seller) revert NotTokneOwner();
    if (_itemId <= 0 && _itemId > itemCount) revert ItemNotExist();
    if (item.sold == true) revert ItemSoldOut();

    item.sold = true;

    item.nft.transferFrom(address(this), msg.sender, item.tokenId);

    emit Bought(
      _itemId,
      address(item.nft),
      item.tokenId,
      item.price,
      item.seller,
      msg.sender
    );

  }

  
  function lastValidTransaction(uint _tokenId) public view returns(uint) {
    uint curr = itemCount;
    Item memory ownership = items[curr];
    if(ownership.tokenId == _tokenId) {
      if(ownership.sold == false) {
        return ownership.itemId;
      }
    } while(curr > 0) {
      curr--;
      ownership = items[curr];
      if(ownership.tokenId == _tokenId){
        if(ownership.sold == false) {
          return ownership.itemId;
        }
      }
    }
    return 0;
  }
}
  