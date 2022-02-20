data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

module "discord_bot" {
  source                = "../../modules/lambda-functions"
  project_name          = var.project_name
  enable_db_backup      = false
  tags                  = var.common_tags
  custom_domain_name    = ""
  certificate_arn       = ""
  lambda_fn_concurrency = "-1"
}
output "discord_interactions_url" {
  value = module.discord_bot.discord_interactions_url
}

module "s3_asset_bucket" { // TODO - Assets should be stored on chain, IPFS, SKALE FS, Ceramic, or other Web3 data storage 
  source                  = "../../modules/s3"
  name                    = "${var.project_name}-asset-bucket-${data.aws_caller_identity.current.account_id}"
  block_all_public_access = false
}
