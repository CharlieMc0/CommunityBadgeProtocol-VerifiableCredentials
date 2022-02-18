// const BigNumber = require("bignumber.js");
const Contract = artifacts.require("Badge");

// prerevealURI = "ipfs://QmWtDnP6XrF8bMLz1wy9J57z1pQYSx7iNwvj2pFH3Y9Eca";
// baseURI = "ipfs://QmQH2iz4rFM3Jy8VR9reTgU1PZky7mwm8Erem8y5Qkm4FK/";
// nftPrice = BigNumber(100000000000000000);
// openseaProxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";

// // TODO - Add isApprovedForAll Tests

contract("Contract", (accounts) => {
  let catchRevert = require("./exceptions.js").catchRevert;
  let catchAll = require("./exceptions.js").catchAll;

  it("Should Mint", async () => {
    let ContractInstance = await Contract.deployed();
    await ContractInstance.mintBadge(accounts[1], "www.metadata.com/1.json");
    await ContractInstance.mintBadge(accounts[2], "www.metadata.com/2.json");
    await ContractInstance.mintBadge(accounts[3], "www.metadata.com/3.json");
  });


  it("Should Return Token URI", async () => {
    let ContractInstance = await Contract.deployed();
    token1URI = await ContractInstance.tokenURI(1);
    token2URI = await ContractInstance.tokenURI(2);
    assert.equal(token1URI, "www.metadata.com/1.json");
    assert.equal(token2URI, "www.metadata.com/2.json");
  });


  it("Should track the tokens for each owner", async () => {
    let ContractInstance = await Contract.deployed();

    let ownerOfToken1 = await ContractInstance.ownerOf(1);
    let ownerOfToken2 = await ContractInstance.ownerOf(2);

    assert.equal(ownerOfToken1, accounts[1]);
    assert.equal(ownerOfToken2, accounts[2]);

    account1TokenCount = await ContractInstance.balanceOf(accounts[1]);
    account2TokenCount = await ContractInstance.balanceOf(accounts[2]);

    assert.equal(account1TokenCount, 1);
    assert.equal(account2TokenCount, 1);

  });

});


//     assert.equal(await ContractInstance.hasRole(ADMIN_ROLE, accounts[0]), true);
//     assert.equal(await ContractInstance.hasRole(ADMIN_ROLE, accounts[1]), true);
//     assert.equal(await ContractInstance.hasRole(ADMIN_ROLE, accounts[2]), true);
//     assert.equal(
//       await ContractInstance.hasRole(ADMIN_ROLE, accounts[3]),
//       false
//     );

//     await ContractInstance.revokeRole(ADMIN_ROLE, accounts[2]);
//     assert.equal(
//       await ContractInstance.hasRole(ADMIN_ROLE, accounts[2]),
//       false
//     );

//     await catchAll(
//       ContractInstance.airdropApes([accounts[0]], { from: accounts[9] })
//     );




//   it("Price Should Be Adjustable", async () => {
//     let ContractInstance = await Contract.deployed();
//     assert.equal(await ContractInstance.price(), 100000000000000000);
//     await ContractInstance.setPrice(50);
//     assert.equal(await ContractInstance.price(), 50);
//     await ContractInstance.setPrice(0);
//     assert.equal(await ContractInstance.price(), 0);
//     await ContractInstance.setPrice(BigNumber(100000000000000000));
//     assert.equal(await ContractInstance.price(), 100000000000000000);
//   });

//   it("Should AirDrop 200 Apes", async () => {
//     let ContractInstance = await Contract.deployed();

//     let listOfAccounts = [];
//     for (let i = 0; i < 100; i++) {
//       listOfAccounts.push(accounts[8]);
//       listOfAccounts.push(accounts[9]);
//     }
//     let tx = await ContractInstance.airdropApes(listOfAccounts, {
//       from: accounts[0],
//     });
//     // Revert when trying to airdrop more than 200
//     await catchAll(
//       ContractInstance.airdropApes([accounts[1]], { from: accounts[0] })
//     );

//     let totalSupply = await ContractInstance.totalSupply();
//     assert.equal(totalSupply, 200);

//     let balance1 = await ContractInstance.balanceOf(accounts[8]);
//     assert.equal(balance1, 100);

//     let balance2 = await ContractInstance.balanceOf(accounts[9]);
//     assert.equal(balance2, 100);

//   });

//   it("Should track total supply", async () => {
//     let ContractInstance = await Contract.deployed();
//     let totalSupply = await ContractInstance.totalSupply();
//     assert.equal(totalSupply, 200);
//   });

//   it("Should whitelist user addresses", async () => {
//     let ContractInstance = await Contract.deployed();

//     let whiteListedAccounts = [];
//     for (let i = 0; i < 490; i++) { // 490 loops = 4900 adresses = 9800 Apes 
//       whiteListedAccounts.push(accounts[6]);
//       whiteListedAccounts.push(accounts[7]);
//       whiteListedAccounts.push(accounts[6]);
//       whiteListedAccounts.push(accounts[7]);
//       whiteListedAccounts.push(accounts[6]);
//       whiteListedAccounts.push(accounts[7]);
//       whiteListedAccounts.push(accounts[6]);
//       whiteListedAccounts.push(accounts[7]);
//       whiteListedAccounts.push(accounts[6]);
//       whiteListedAccounts.push(accounts[7]);
//     }

//     let tx = await ContractInstance.setAllowList(whiteListedAccounts, 2, {
//       from: accounts[0],
//     });
//   });

//   it("Whitelisted users should be able to mint after the sale has started ", async () => {
//     let ContractInstance = await Contract.deployed();

//     // Test sale toggle is working correctly
//     saleState = await ContractInstance.privateSaleActive();
//     assert.equal(saleState, false);
//     await ContractInstance.togglePrivateSaleState();
//     saleState = await ContractInstance.privateSaleActive();
//     assert.equal(saleState, true);

//     // Test that whitelisted users can mint
//     await ContractInstance.mintApe(1, { from: accounts[6], value: nftPrice });
//     await ContractInstance.mintApe(1, { from: accounts[6], value: nftPrice });
//     await catchAll(
//       ContractInstance.mintApe(1, { from: accounts[6], value: nftPrice })
//     );

//     await catchAll(
//       ContractInstance.mintApe(10, { from: accounts[7], value: nftPrice * 10 })
//     );
//     await ContractInstance.mintApe(2, {
//       from: accounts[7],
//       value: nftPrice * 2,
//     });

//     // Test that non-whitelisted users cannot mint
//     await catchAll(
//       ContractInstance.mintApe(1, { from: accounts[1], value: nftPrice })
//     );
//   });



//   it("Tokens Should Be Transferable", async () => {
//     let ContractInstance = await Contract.deployed();

//     await ContractInstance.safeTransferFrom(accounts[6], accounts[7], 201, {
//       from: accounts[6],
//     });
//     await ContractInstance.safeTransferFrom(accounts[6], accounts[7], 202, {
//       from: accounts[6],
//     });

//     let balanceAccount6 = await ContractInstance.balanceOf(accounts[6]);
//     let balanceAccount7 = await ContractInstance.balanceOf(accounts[7]);
//     assert.equal(balanceAccount6, 0);
//     assert.equal(balanceAccount7, 4);

//     // Check for revert on unauthorized transfer
//     await catchAll(
//       ContractInstance.safeTransferFrom(accounts[7], accounts[5], 2, {
//         from: accounts[5],
//       })
//     );
//   });

//   it("Should Return Placeholder Metadata Before Reveal", async () => {
//     let ContractInstance = await Contract.deployed();
//     let revealStatus = await ContractInstance.revealStatus();
//     assert.equal(await revealStatus, false);
//     let token1URI = await ContractInstance.tokenURI(1);
//     assert.equal(token1URI, prerevealURI);
//   });

//   it("Should Return Real Metadata After The Reveal", async () => {
//     let ContractInstance = await Contract.deployed();
//     await ContractInstance.toggleRevealState();
//     let revealStatus = await ContractInstance.revealStatus();
//     assert.equal(await revealStatus, true);
//     let token1URI = await ContractInstance.tokenURI(1);
//     assert.equal(token1URI, baseURI + "1.json");
//     let token5URI = await ContractInstance.tokenURI(5);
//     assert.equal(token5URI, baseURI + "5.json");
//   });

//   it("Should Split Payment", async () => {
//     let ContractInstance = await Contract.deployed();

//     //Setup Shares
//     let totalShares = await ContractInstance.totalShares();
//     assert.equal(await totalShares, 100);

//     let shares1 = await ContractInstance.shares(accounts[0]);
//     assert.equal(shares1, 90);
//     let shares2 = await ContractInstance.shares(accounts[1]);
//     assert.equal(shares2, 10);

//     contractBalancePreRelease = await web3.eth.getBalance(
//       ContractInstance.address
//     );
//     assert.equal(contractBalancePreRelease, BigNumber(400000000000000000));

//     // Get Account Balances Pre TX
//     preTxBalance1 = await web3.eth.getBalance(accounts[0]);
//     preTxBalance2 = await web3.eth.getBalance(accounts[1]);

//     // Release Funds and check balances post TX
//     await ContractInstance.release(accounts[0], { from: accounts[0] });
//     await ContractInstance.release(accounts[1], { from: accounts[1] });

//     postTxBalance1 = await web3.eth.getBalance(accounts[0]);
//     postTxBalance2 = await web3.eth.getBalance(accounts[1]);
//     contractBalancePostRelease = await web3.eth.getBalance(
//       ContractInstance.address
//     );

//     assert.equal(contractBalancePostRelease, 0);
//   });
// });
