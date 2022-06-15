//SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
// 보안 => 여러 요청에 대한 트랜잭션 보안
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

import 'hardhat/console.sol';

contract KBMarket is ReentrancyGuard {
  using Counters for Counters.Counter;

  // 구현해야 하는 것(토큰 추적용)
  // 1. 민팅된 아이템의 수 추적
  // 2. 트랜잭션 수 추적
  // 3. 판매되지 않은 토큰 수 추적
  // 4. 총 토큰의 숫자 추적 => 배열의 길이로 추적 가능

  Counters.Counter private _tokenIds;
  Counters.Counter private _tokenSold;

  // 구현해야 하는 것(계약 내용)
  // 계약의 소유자가 누군지
  // 리스팅 피 => 작품이 재판매 될때마다 커미션 발생

  // address 타입의 확장판 => address payalbe : 이더를 전송할 수 있는 send(예외 발생 x), transfer(예외 발생 o) 함수 내장
  address payable owner;

  uint256 listingPrice = 0.045 ether;

  // 계약의 소유자 설정, 지불 가능 설정
  constructor() {
    owner = payable(msg.sender);
  }

  // 구조체를 만들어서 객체서럼 사용, 추적
  struct MarketToken {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  // tokenId로 어떤 MarketToken인지 알아내기(tokenId로 MarketToken의 모든 정보에 접근 가능)
  mapping(uint256 => MarketToken) private idToMarketToken;

  // 이벤트를 통해 토큰에 대한 정보를 클라이언트와 상호작용
  event MarketTokenMinted(
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  // listing 가격을 보여주는 함수
  function getListingPrice() public view returns(uint256) {
    return listingPrice;
  }

  // 판매기능
  // 1. 민팅하면 판매가 되도록
  // 2. 판매자와 구매자간 구매 기능
  function makeMarketItem(
    address nftContract,
    uint tokenId,
    uint price
  ) public payable nonReentrant {
    // ReenterancyGuard에서 나온 nonReentrant = modifier
    // nonReentrant는 재진입 공격을 막기 위한 것
    // Q : 재진입 공격?
    require(price > 0, 'Price must be at least one wei');
    // msg.value => 송금을 보낸 코인 값
    // 판매용으로 nft를 올릴 때 지정된 리스팅 가격에 맞게 올려야 판매용으로 민팅할 수 있다.
    require(msg.value == listingPrice, 'Price must be equal to listing price');

    _tokenIds.increment();
    uint itemId = _tokenIds.current();


    // 판매용으로 올리는 기능
    // 판매용으로 올렸을 때는 owner이 없음!
    idToMarketToken[itemId] = MarketToken(
    itemId,
    nftContract,
    tokenId,
    // seller = 민팅한 사람
    payable(msg.sender),
    // owner = 아직 구입한 사람이 없음
    payable(address(0)),
    price,
    false
    );

    // nft transaction => 트랜잭션 발생
    // msg.sender = 계약이 호출되는 주소, address(this) = 인스턴스의 주소
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    // 상품이 민팅 되었다고 알리기
    emit MarketTokenMinted(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      false
    );
  }


  // 누군가 구입 => nft 판매 함수
  function createMarketSale(
      address nftContract,
      uint itemId)
      public payable nonReentrant {
        // 토큰이 발행되어야 구입할 수 있으므로 이미 민팅된 토큰 정보에 접근해서 사용
        uint price = idToMarketToken[itemId].price;
        uint tokenId = idToMarketToken[itemId].tokenId;
        // 지불된 가격이 상품 가격과 같아야 구입할 수 있다.
        require(msg.value == price, 'Please submit the asking price in order to continue');

        // 이더 판매자에게 이동
        // 아이템id로 상품에 접근 =>  .셀러로 셀러에 접근(address payable) => address payable은 이더 전송가능한 함수 내장(transfer = 예외 발생 o)
        idToMarketToken[itemId].seller.transfer(msg.value);

        // nft 소유권 이동
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketToken[itemId].owner = payable(msg.sender);
        idToMarketToken[itemId].sold = true;
        _tokenSold.increment();

        payable(owner).transfer(listingPrice);
      }

      function fetchMarketTokens() public view returns(MarketToken[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _tokenSold.current();
        uint currentIndex = 0;

        MarketToken[] memory items = new MarketToken[](unsoldItemCount);
        for(uint i = 0; i < itemCount; i++) {
          if(idToMarketToken[i + 1].owner == address(0)) {
            uint currentId = i + 1;
            MarketToken storage currentItem = idToMarketToken[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
          }
        }
        return items;
      }

      function fetchMyNFTs() public view returns(MarketToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++) {
          if(idToMarketToken[i + 1].owner == msg.sender) {
            itemCount += 1;
          }
        }

        MarketToken[] memory items = new MarketToken[](itemCount);
        for(uint i = 0; i < totalItemCount; i++) {
          if(idToMarketToken[i + 1].owner == msg.sender) {
            uint currentId = idToMarketToken[i + 1].itemId;
            MarketToken storage currentItem = idToMarketToken[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
          }
        }
        return items;
      }

      function fetchItemsCreated() public view returns(MarketToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

                for(uint i = 0; i < totalItemCount; i++) {
          if(idToMarketToken[i + 1].seller == msg.sender) {
            itemCount += 1;
          }
        }

        MarketToken[] memory items = new MarketToken[](itemCount);
        for(uint i = 0; i < totalItemCount; i++) {
          if(idToMarketToken[i + 1].seller == msg.sender) {
            uint currentId = idToMarketToken[i + 1].itemId;
            MarketToken storage currentItem = idToMarketToken[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
          }
      }
      return items;
      }
}