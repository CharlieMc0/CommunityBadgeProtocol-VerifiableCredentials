const Awards = artifacts.require("Award");

module.exports = function (deployer) {
  deployer.deploy(Awards);
};
