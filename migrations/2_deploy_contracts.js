var RtcCoin = artifacts.require("./RtcCoin.sol");

const initialTokens = 10000;

module.exports = function(deployer) {
  deployer.deploy(RtcCoin, initialTokens);
};
