const Badges = artifacts.require("Badge");

module.exports = function (deployer) {
  deployer.deploy(Badges);
};
