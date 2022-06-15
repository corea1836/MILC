const NFT = artifacts.require("NFT");
const Marketplace = artifacts.require("../src/contracts/Marketplace.sol");

module.exports = function (deployer) {
  deployer.deploy(NFT).then(function () {
    return deployer.deploy(Marketplace, 1);
  });
};
