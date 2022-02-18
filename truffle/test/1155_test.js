const BadgesERC1155 = artifacts.require("BadgesERC1155");

contract("BadgesERC1155", accounts => {
    let catchRevert = require("./1155exceptions.js").catchRevert;
    let catchAll = require("./1155exceptions.js").catchAll;
    let catchBadge = require("./1155exceptions.js").catchBadge;
  
    
    it("Should create new badge types, mint tokens, and track balances", async() => {
        let badges = await BadgesERC1155.deployed();

        // Create New Badges
        await badges.createNewBadge(10, "Amazing Badge", "www.metadata.com/1.json");
        await badges.createNewBadge(20, "Super Badge", "www.metadata.com/2.json");
        await badges.createNewBadge(30, "Best Badge", "www.metadata.com/3.json");

        // Mint Tokens
        await badges.mint(accounts[1], 1, 1, [], {from: accounts[0]});
        await badges.mint(accounts[2], 2, 2, [], {from: accounts[0]});

        // Check Balances
        let token1Balance = await badges.balanceOf(accounts[1], 1);
        let token2Balance = await badges.balanceOf(accounts[2], 2);
        assert.equal(token1Balance, 1);
        assert.equal(token2Balance, 2);
    });

    it("Should retrive corret URI", async() => {
        let badges = await BadgesERC1155.deployed();

        // Create New Badges
        token1uri = await badges.uri(1);
        token2uri = await badges.uri(2);

        assert.equal(token1uri, "www.metadata.com/1.json");
        assert.equal(token2uri, "www.metadata.com/2.json");

    });

    // it("Should not allow tokens to be transferred", async() => {
    //     let badges = await BadgesERC1155.deployed();

    //     catchBadge( await badges.safeTransferFrom(accounts[1], accounts[2], 1, 1, [], { from: accounts[1] }));

    // });

    // // TODO - This should be a role that allows multiple authorized addrsses to mint
    // it("Only Badge Creators Can Mint", async() => {
    //     let badges = await BadgesERC1155.deployed();
    //     badges.mint(accounts[1], 1, 1, [], {from: accounts[0]});
    //     catchRevert( await badges.mint(accounts[1], 1, 1, [], { from: accounts[1] }));

    // });

});


