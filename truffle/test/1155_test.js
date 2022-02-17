const AwardsERC1155 = artifacts.require("AwardsERC1155");



contract("AwardsERC1155", accounts => {
    let catchRevert = require("./1155exceptions.js").catchRevert;
    let catchAll = require("./1155exceptions.js").catchAll;
    let catchAward = require("./1155exceptions.js").catchAward;
  
    
    it("Should create new award types, mint tokens, and track balances", async() => {
        let awards = await AwardsERC1155.deployed();

        // Create New Awards
        await awards.createNewAward(10, "Amazing Award", "www.metadata.com/1.json");
        await awards.createNewAward(20, "Super Award", "www.metadata.com/2.json");
        await awards.createNewAward(30, "Best Award", "www.metadata.com/3.json");

        // Mint Tokens
        await awards.mint(accounts[1], 1, 1, [], {from: accounts[0]});
        await awards.mint(accounts[2], 2, 2, [], {from: accounts[0]});

        // Check Balances
        let token1Balance = await awards.balanceOf(accounts[1], 1);
        let token2Balance = await awards.balanceOf(accounts[2], 2);
        assert.equal(token1Balance, 1);
        assert.equal(token2Balance, 2);

    });

    // it("Should not allow tokens to be transferred", async() => {
    //     let awards = await AwardsERC1155.deployed();

    //     catchAward( await awards.safeTransferFrom(accounts[1], accounts[2], 1, 1, [], { from: accounts[1] }));

    // });

    // // TODO - This should be a role that allows multiple authorized addrsses to mint
    // it("Only Award Creators Can Mint", async() => {
    //     let awards = await AwardsERC1155.deployed();
    //     awards.mint(accounts[1], 1, 1, [], {from: accounts[0]});
    //     catchRevert( await awards.mint(accounts[1], 1, 1, [], { from: accounts[1] }));

    // });

});


