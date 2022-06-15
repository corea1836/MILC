//SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;

// openzeppelin ERC721 NFT 함수 가져오기

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
// 저장공간(IPFS에 저장하기 위한 정보)
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
// SafeMath => SmartContract 보안 업(토큰 발행 시 토큰의 양 증가, 문서화 등을 추적)
import '@openzeppelin/contracts/utils/Counters.sol';

// ERC721URIStorage를 상속받아 IPFS에 해당 정보를 저장
contract NFT is ERC721URIStorage {
  // using패턴으로 Counter사용  => 특정 데이터에 대한 카운터 설정 => 카운터를 통해 토큰 아이디로 설정해 해당 토큰 추적
  // Q : Spring에 DI같은 것?
  using Counters for Counters.Counter;
  // Counters.Counter이 데이터 타입처럼 사용 가능
  Counters.Counter private _tokenIds;

  // 상호작용할 NFT marketplace 주소
  address contractAddress;

  // 마켓(사이트) 이름, 심볼
  // ERC721URIStorage가 ERC721을 상속받고 있기 때문에 ERC721의 생성자 사용 가능
  // nft마켓의 이름과 심볼 설정
  constructor(address marketplaceAddress) ERC721('KryptoBirdz', 'KBIRDZ') {
    contractAddress = marketplaceAddress;
  }

  // 기본적으로 데이터 타입에 memory라 명시하지 않으면 storage로 작동 => 많은 가스비를 소모
  // 경제적인 코딩을 위해 문자열에 memory로 설정
  function mintToken(string memory tokenURI) public returns(uint) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    // ERC721의 민팅 기능
    // (민팅 하는 사람 = 컨트랙트를 호출한 사람, 현재 토큰 아이디)
    _mint(msg.sender, newItemId);

    // 이미지 경로(토큰id, 토큰 경로)
    _setTokenURI(newItemId, tokenURI);

    // 토큰 교환 유저간 트랜잭션 승인 여부(모든 경우 실행가능하도록 설정)
    setApprovalForAll(contractAddress, true);

    // 판매가능하도록 토큰ID 반환
    return newItemId;
  }
}