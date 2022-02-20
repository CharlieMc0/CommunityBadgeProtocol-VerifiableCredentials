output "api_gateway_invocation_url" {
  value = aws_api_gateway_deployment.discord_bot.invoke_url
}

output "api_gateway_execution_arn" {
  value = aws_api_gateway_rest_api.discord_bot.execution_arn
}

output "discord_interactions_url" {
  value = "${aws_api_gateway_deployment.discord_bot.invoke_url}${var.project_name}/"
}