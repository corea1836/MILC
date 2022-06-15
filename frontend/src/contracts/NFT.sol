// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


error NotTokenOwner();
error TokenInMarket();
error TokenAlreadyRealization();
error TokenNotExist();

contract NFT is ERC721URIStorage {

  uint public tokenCount;

  struct TokenData {

    // address ownerAddr;

    bool realization;
  }

  struct TokenReciept {

    address seller;

    address buyer;

    uint tokenId;

    uint price;

    uint transacTimeStamp;

    bool realized;

  }

  mapping(uint => TokenReciept[]) internal _tokenTracker;

  mapping(uint256 => TokenData) internal _tokenData;

  constructor() ERC721("DApp NFT", "DAPP") {}

  function mint(string memory _tokenURI) external returns (uint) {
    unchecked {
      tokenCount ++;
      _safeMint(msg.sender, tokenCount);
      _tokenData[tokenCount].realization = false;
      _setTokenURI(tokenCount, _tokenURI);

      return(tokenCount);
    }
  }

  function TokenTracking(uint _tokenId) public view returns(TokenReciept[] memory) {
    if(0 >= _tokenId || _tokenId > tokenCount) revert TokenNotExist();
    TokenReciept[] storage tokenReciepts = _tokenTracker[_tokenId];
    return tokenReciepts;
  }

  function addTokenReceipt(address _seller, address _buyer, uint _price, uint _tokenId) external {
    TokenReciept[] storage tokenRecipts = _tokenTracker[_tokenId];
    tokenRecipts.push(TokenReciept(
      _seller,
      _buyer,
      _tokenId,
      _price,
      block.timestamp,
      bool(isRealization(_tokenId))
    ));
  }



  function isRealization(uint _tokenId) public view returns (bool) {
    return _tokenData[_tokenId].realization;
  }


  function Realization(address marketplaceAddr, uint _tokenId) public {
    if (ownerOf(_tokenId) != msg.sender) revert NotTokenOwner();
    if (marketplaceAddr == ownerOf(_tokenId)) revert TokenInMarket();
    if (isRealization(_tokenId) == true ) revert TokenAlreadyRealization();
    _tokenData[_tokenId].realization = true;

  }
}