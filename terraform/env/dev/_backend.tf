
terraform {
  backend "s3" {
    bucket         = "terraform-542292791691"
    dynamodb_table = "terraform-lock"
    key     = "ethdenver-hackathon.tfstate"
    region  = "us-east-1"
    encrypt = "true"
    profile = "nfty-dev"
  }
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.region
}

# # AWS Region for Cloudfront (ACM certs only supports us-east-1)
# provider "aws" {
#   region = "us-east-1"
#   alias  = "cloudfront"
# }