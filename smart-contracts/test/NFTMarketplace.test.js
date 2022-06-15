const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("NFTMarketplace", function() {
  // 콜백함수 내부에서 모든 테스트가 진행된다.

  let deployer, addr1, addr2, nft, marketplace;
  let feePercent = 1;
  let URI = "Sample URI";

  // beforeEach 훅에 deploy 변수들을 넣어 여러 테스트가 진행될 때 각각의 테스트에서 자동으로 실행되도록 설정
  beforeEach(async function() {
    // ethers객체를 이용해 배포 스트립트 내부에서 했던 것 처럼 각각의 계약팩토리를 가져와야 한다.
    const NFT = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");


    // Get signers
    [deployer, addr1, addr2] = await ethers.getSigners()

    // Deploy contracts
    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
  });
  
  describe("Deployment", function() {
    it("Should track name and symbol of the nft collection", async function(){
      // chai의 expect사용(기대값, 실제값 비교)
      expect(await nft.name()).to.equal("DApp NFT");
      expect(await nft.symbol()).to.equal("DAPP");
    });

    it("Should track feeAccount and feePercent of the nft collection", async function(){
      expect(await marketplace.feeAccount()).to.equal(deployer.address);
      expect(await marketplace.feePercent()).to.equal(feePercent);
    });
  });

  describe("Minting NFTs", function() {
    it("Should track each minted NFT", async function() {

      // addr1의 Account를 nft contract에 연결 후 mint 기능 실행(URI = 메타데이터 주소를 전달)
      await nft.connect(addr1).mint(URI)
      // 발행한 토큰 수 = 1(첫 발행)
      expect(await nft.tokenCount()).to.equal(1);
      // addr1의 토큰 잔액(nft 갯수) = 1
      expect(await nft.balanceOf(addr1.address)).to.equal(1);
      // 테스트에서 발행한 1번 nft의 메타데이터 주소 = Sample URI
      expect(await nft.tokenURI(1)).to.equal(URI);

      await nft.connect(addr2).mint(URI)
      expect(await nft.tokenCount()).to.equal(2);
      expect(await nft.balanceOf(addr2.address)).to.equal(1);
      expect(await nft.tokenURI(2)).to.equal(URI);
    });
  });

  describe("Making marketplace items", function () {
    beforeEach(async function() {
      await nft.connect(addr1).mint(URI);
      await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
    });

    it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async function() {
      await expect(marketplace.connect(addr1).makeItem(nft.address, 1, toWei(1)))
      .to.emit(marketplace, "Offered")
      .withArgs(
        1,
        nft.address,
        1,
        toWei(1),
        addr1.address
      );
      expect(await nft.ownerOf(1)).to.equal(marketplace.address);

      expect(await marketplace.itemCount()).to.equal(1);

      const item = await marketplace.items(1);
      expect(item.itemId).to.equal(1)
      expect(item.nft).to.equal(nft.address)
      expect(item.tokenId).to.equal(1)
      expect(item.price).to.equal(toWei(1))
      expect(item.sold).to.equal(false)

    });

    it("Should fail if price is set to zero", async function() {
      await expect(
        marketplace.connect(addr1).makeItem(nft.address, 1, 0)
      ).to.be.revertedWith("Price must be greater than zero");
    });
  });

  describe("Purchasing marketplace items", function() {
    let price = 2;
    beforeEach(async function() {
      await nft.connect(addr1).mint(URI);
      await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
      await marketplace.connect(addr1).makeItem(nft.address, 1, toWei(2));
    });
    it("Should update item as sold, pay seller, transfer NFT to buyer, charge fees and emit a Bought event", async function() {
      // 판매자와 deployer의 계좌 초기 잔액으로 구매 후 비교할 예정
      const sellerInitialEthBal = await addr1.getBalance();
      const feeAccountInitialEthBal = await deployer.getBalance();
      
      totalPriceInWei = await marketplace.getTotalPrice(1);
      // 사려는 itemId, 보낼 이더 양
      await expect(marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei }))
      // 트랜잭션 로그 내부의 내용을 확인(Bought 로그 확인)
        .to.emit(marketplace, "Bought")
        .withArgs(
          1,
          nft.address,
          1,
          toWei(price),
          addr1.address,
          addr2.address
        );

        const sellerFinalEthBal = await addr1.getBalance();
        const feeAccountFinalEthBal = await deployer.getBalance();
        // 판매가 종료된 후 판매자의 잔액 = nft가격 + 판매자 초기 잔액인지 확인
        expect(+fromWei(sellerFinalEthBal)).to.equal(+price + +fromWei(sellerInitialEthBal));
        
        // 수수료 확인
        const fee = (feePercent / 100) * price;
        
        expect(+fromWei(feeAccountFinalEthBal)).to.equal(+fee + +fromWei(feeAccountInitialEthBal));

        // nft 구매자에게 구매 내역이 잘 들어갔는지 확인
        expect(await nft.ownerOf(1)).to.equal(addr2.address);

        expect((await marketplace.items(1)).sold).to.equal(true);
    });

    // 구매 시 require 구문이 제대로 작동하는지 확인
    it("Should fail for invalid item ids, sold items and when not enough ether is paid", async function() {
      await expect(
        marketplace.connect(addr2).purchaseItem(2, { value: totalPriceInWei })
      ).to.be.revertedWith("item doesn't exist");
      await expect(
        marketplace.connect(addr2).purchaseItem(0, { value: totalPriceInWei })
      ).to.be.revertedWith("item doesn't exist");

      await expect(
        marketplace.connect(addr2).purchaseItem(1, { value: toWei(price) })
      ).to.be.revertedWith("not enough ether to cover item price and market fee");
      
      // addr2가 1번 아이템을 사고 다시 deployer가 사려 한 경우
      await marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei })
      await expect(
        marketplace.connect(deployer).purchaseItem(1, { value: totalPriceInWei })
      ).to.be.revertedWith("item already sold");
    });
  });
})