# Terraform 

Contains the code for all the AWS infrastructure.

## TODO 

* Break up the Lambda-Functions module - Lambda Functions and API Gateway should all be separate modules 
* Move Lambda code out of module


## File Trees
.
├── env
│   └── dev
│       ├── _backend.tf
│       ├── main.tf
│       ├── outputs.tf
│       ├── terraform.tfvars
│       └── variables.tf
├── modules
│   ├── lambda-functions
│   │   ├── api-gateway.tf
│   │   ├── dynamodb.tf
│   │   ├── iam.tf
│   │   ├── lambda-chain-functions.tf
│   │   ├── lambda-code
│   │   │   ├── chain-functions
│   │   │   ├── create-profile
│   │   │   ├── discord-bot
│   │   │   └── zips
│   │   ├── lambda-discord.tf
│   │   ├── lambda-profile.tf
│   │   ├── main.tf
│   │   ├── outputs.tf
│   │   ├── readme.md
│   │   └── variables.tf
│   └── s3
│       ├── main.tf
│       ├── outputs.tf
│       ├── readme.md
│       └── varia