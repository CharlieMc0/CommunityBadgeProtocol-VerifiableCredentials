# CBP: Community Badge Protocol & TrustRep

## Overview

The Community Badge Protocol is an essential building block that enables entities to acknowledge, reward, and discover others. Anyone can create a new badge and we've provided some infrastructure and tools to make it easy for them.

We focused on providing a discord bot and tools for this MVP because it's how most DAOs are operating. These tools could grow to support multiple groups and individuals no matter what services they use.

## Potential Use Cases

#### DAOS

DAO's can reward members with badges for their contributions with badges. Badges from reputable DAOs will be valuable because they allow the owner to show verifiable proof of their previous contributions and use it to build their 'Web3 Resume'.

#### External Awards & Recognition

Groups can use CBP to recognize and award entities even if those entities are not part of the group itself. For example, a DAO dedicated to reviewing films could mint badges for best indie films of the year. People who trust the film review DAO can follow their address using the TrustRep app to keep up to date with their latest recommendations.

#### Education, and many other potential use cases

This can be used anywhere you need credentialing or badging. Another great example is online education. CryptoZombies is a very popular Web3 tutorial and an automated tool could be created to assess the contracts deployed by learners and issue a badge if their contract passes 90% of the tests.

## Folder Structure
```
.
├── app
│   ├── node_modules
│   ├── public
│   └── src
├── magtag
│   ├── fonts
│   └── lib
├── misc
│   └── mock-data
├── terraform
│   ├── env
│   └── modules
└── truffle
    ├── contracts
    ├── migrations
    └── test
```
### Terraform - Serverless, NoSQL, Discord Bot

Infrastructure is hosted in AWS because it's my area of web2 expertise but if this project were to continue we would migrate to more web3 friendly tools such as Ceramic or SKALE filesystem for hosting metadata and other data assets.

Within AWS, it uses serverless Lambda functions, NoSQL DynamoDB, and some S3 hosted assets. These functions operate the discord bot including the badge creation and minting process.

### Truffle - Community Badge Protocol (CBP)

Contains the ERC1155 contract used by the CBP. Currently the contract only allows the Badge (token) owner to mint but a future model would use role based access control allowing multiple authorized parties to mint on behalf of the badge owner.

Contracts are deployed on a SKALE blockchain for the purposes of this hackathon. SKALE provides a gasless environment with fast block times but the contracts can be used on any EVM compatible chain. A set of basic automated tests have been provided.

Metadata will be stored on an immutable platform such as IPFS, SKALE's IPFS alternative, or Ceramic.

The deployed contract can be viewed here on the [SKALE Block Explorer](https://glamorous-tania-australis.hack-explorer-0.skalenodes.com/address/0x5F3feb74f82C5c7033Cf9135eb44672DB84D48f6/transactions). I was having issues getting the contract 'verified' through their UI so it isn't as clear as I would like it to be. It may not be fixed before judging begins.

### App - TrustRep

Contains the web UI written in React. This only begins to illustrate the potential a platform based on the CBP has.

The admin of a discord server can connect to the web UI and configure their community. Once they have set up their consensus mechanism they can add out Discord Bot to the channel.

### Misc

Has some mock data and a script to adding/removing commands to the Discord Bot

### MagTag

An idea that we didn't have enough time to purpose. Wanted to set up a wearable badge that could update automatically over the air when the owner is issued a new digital badge.

[MagTag Example](https://learn.adafruit.com/adafruit-magtag-project-selector)

## Secrets & Security

We were careful not to commit any secrets to code and I've scanned the repo with truffleHog but if you do discover any issues with our code please inform us responsibly. Reach out via GitHub or you can DM me on Twitter @CharlieeMcCowan.

Thank you
