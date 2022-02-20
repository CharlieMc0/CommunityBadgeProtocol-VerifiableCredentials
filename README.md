# CBP:  Community Badge Protocol & TrustRep


A r

## /Terraform - 
Infrastructure is hosted in AWS using Serverless Lambda Functions. It is AWS hosted because it's my area of expertise but if this project were to continue we could migrate to more web3 friendly tools such as Ceramic or SKALE filesystem for hosting metadata and other data assets. 

## /Truffle - Community Badge Protocol (CBP)
Contains the ERC1155 contract used by the CBP. Currently the contract only allows the Badge (token) owner to mint but a future model would use role based access control allowing multiple authorized parties to mint on behalf of the badge owner. 

Contracts are deployed on a SKALE blockchain. SKALE provides a gasless environment with quick block times but the contracts can be used on any EVM compatible chain. 



## /App - TrustRep
Contains the web UI written in React. 


## /Misc

Has some mock data and a script to adding/removing commands to the Discord Bot

## /MagTag 
An idea that we didn't have enough time to purpose. Wanted to setup a wearble badge that could update automatically over the air when the owner is issued a new digital badge. 

[MagTag Example](https://learn.adafruit.com/adafruit-magtag-project-selector)

