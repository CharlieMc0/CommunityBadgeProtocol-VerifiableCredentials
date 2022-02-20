# Notes

Anyone can mint but not everyone is trusted 

Platform manages trust relationships and entity status 
DAO Managed Group Trust

Entity statuses: unregistered, registered, ???? , ????

Platform displays 
* Social Profiles (web2/3)
* Contract Addresses
* Customizable Web3 CV
* POAPS
* POEAPS

Platform Allows
* Filtering by POAEP status 
* Enabling trusted entities 
* Hiding untrusted entities 
* Search by entities, values, POAEPs, POAPS, trusted individuals 
* Ranking based on personal, group, or transferable trust 

## Metadata

{
	title:
	description:
    link: 
    type:1
    ~ minted_by ~
	issued_by: {
		group: d-12345
		user: d-12435
		}
	issued to: {
		group: d-12345
		user: d-12435
		}
    consensus: {
        for: []
        against: []
    }
} 


ERC1155 - Each Token type is a Type of Award 
Award ID - Title Of Award 
Description Of Award 
Group ID
User ID 




## Token Issuing Workflows

### Discord 
* Server Admin - Registers on platform 
* Server Admin - Adds bBt 
* Server Admin - Configures Bot 
    * Set Roles allowed to nominate 
    * Set Roles allowed to vote 
    * Set Roles allowed to be nominated 
    * Set Nomination Time 
* Community Nominates a a Discord User 
* Community Votes
* If it passes - The nominated user receives a link via DM to collect their POEAP


### Twitter
* Community Nominates a Twitter User 
* Community Votes
* If it passes - The nominated user receives a link via DM to collect their POEAP


## Entity Registration Workflow


## Entity Trust Workflows 

### Personal 
* User logs into platform 
* User finds a trusted Entitiy
* User marks the entity as a personally trusted connection  

### Group 
* 



## Questions 
* Should all voters be included on chain 

	


## Work that needs to be done for hackathon 

### Building a Discord Bot Interactions



### Building Minter

### UI Mock Ups 




### Write up how trusted relationships can be stored on a chain 


## Work that needs to be done later  

* Build UI 
* Integrate Discord into Platform 
* Integrate Twitter into Platform 
* Twitter Bot 
---------

Discord Build Notes 

* Deploy infra
* setup discord commands
* setup mock responses 



## 

Update Lambda One Liner 

cd discord-bot &&  zip -r "../zips/discord-bot.zip" . && cd ..  && aws lambda  update-function-code --function-name discord-bot-ethdenver-hackathon --zip-file fileb://zips/discord-bot.zip