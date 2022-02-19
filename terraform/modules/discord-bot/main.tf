data "aws_region" "current" {}

data "aws_caller_identity" "current" {}


resource "aws_cloudwatch_log_group" "discord_bot" {
  name              = "/aws/api-gateway/wamc/${aws_api_gateway_rest_api.discord_bot.id}/discord-bot"
  retention_in_days = 7
}