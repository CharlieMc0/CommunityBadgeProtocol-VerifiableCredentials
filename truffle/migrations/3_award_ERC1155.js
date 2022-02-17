const AwardsERC1155 = artifacts.require("AwardsERC1155");

module.exports = function (deployer) {
  deployer.deploy(AwardsERC1155);
};
