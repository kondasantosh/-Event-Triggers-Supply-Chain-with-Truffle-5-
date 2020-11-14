var Itemmanager = artifacts.require("./itemmanager.sol");

module.exports = function(deployer) {
  deployer.deploy(Itemmanager);
};
