data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

module "discord_bot" {
  source                    = "../../modules/discord-bot" 
  project_name              = var.project_name
  enable_db_backup          = false
  tags                      = var.common_tags
  custom_domain_name        = ""
  certificate_arn           = ""
  lambda_fn_concurrency     = "-1"
  # whitelist_capacity        = "1"
  # discord_whitelist_role_id = "935704301236523048" // THE REAL ONE"923942750838198322"
  # discord_server_id         = ""

}
output "discord_interactions_url" {
  value = module.discord_bot.discord_interactions_url
}