// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// 재진입 공격 방지
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {

  // 상태변수의 immutable : 값이 경정되고 나면 변경 불가( = 한 번만 결정될 수 있다.)
  //                     생성시에(생성자에서 설정) 값이 결정된다. 


  // 구매한 nft의 금액을 받는 계정
  address payable public immutable feeAccount;
  
  // 수수료
  uint public immutable feePercent;

  uint public itemCount;

  // 판매용으로 나열된 아이템 추적
  // 복잡한 구조는 mapping으로 추적하는게 편함 키로 쉽게 밸류에 접근 가능
  struct Item {
    uint itemId;
    // nft 인스턴스
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
  // event 에서 buyer을 indexed로 설정해 놓으면 구매가 일어났을 때 사용자가 마켓플레이스에서 구매한 모든 내역을 표시할 수 있다.
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
    // 이 계약서의 배포자가(msg.sender) 계약서의 주인이 되어야 하기 때문에 생성자로 값을 설정
    // -> 배포자는 자신의 nft를 나열하고, 구매할 수 있는 기능들을 할 수 있다.(밑에서 함수로 정의)
    feeAccount = payable(msg.sender);
    feePercent = _feePercent;
  }

// ERC721의 인스턴스를 인자로 전달해줌 -> 프론트엔드에서 사용자가 nft contract 주소를 전달하면 솔리디티가 자동으로 nft컨트랙트를 생성한다.
// nonReentrant(재진입 방지 modifier) : 누가 makeItem함수를 호출하고 끝나기 전에 다시 makeItem함수를 호출하는 것을 방지하기 위한 것
function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
  // 구매 가격이 0보다 높아야 함
  require(_price > 0, "Price must be greater than zero" );

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

  // payable으로 구매자는 판매자에게 구매 비용을 보내야하고, 일부는 수수료 계정으로 보내진다.    
  function purchaseItem(uint _itemId) external payable nonReentrant {
    uint _totalPrice = getTotalPrice(_itemId);
    // storage를 선언함으로써 items에 있는 값 중 복사값을 사용하는 것이 아닌 그대로를 사용하는 것
    Item storage item = items[_itemId];
    // item이 존재하는지 확인 0보다 크고 총 갯수보다는 같거나 작아야 함
    require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
    // msg.value를 통해 전송된 이더가 _totalPrice보다 같거나 큰지 확인
    require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
    // item이 아직 판매중인지 확인(item.sold는 boolean값 생성할 때 디폴트가 false이므로 !를 붙여 true 인 경우에만 거래 진행)
    require(!item.sold, "item already sold");

    // 판매자의 주소로 판매 가격 전송
    item.seller.transfer(item.price);
    // 수수료 계좌로 수수료 전송
    feeAccount.transfer(_totalPrice - item.price);

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

  // 판매자가 올린 가격 + 시장 수수료 
  function getTotalPrice(uint _itemId) public view returns(uint) {
    return items[_itemId].price * (100 + feePercent) / 100;
  }
}