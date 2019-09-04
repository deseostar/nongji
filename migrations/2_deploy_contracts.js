var Nongji = artifacts.require("NongJi");
var NongjiToken = artifacts.require("NongjiToken");

module.exports = function(deployer) {
  deployer.deploy(NongjiToken)
  deployer.deploy(Nongji)
};