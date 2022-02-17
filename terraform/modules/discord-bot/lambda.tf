

data "aws_ssm_parameter" "access_token" {
  name = "/${var.project_name}/discord/bot_token"
}
resource "aws_lambda_layer_version" "min_layer" {
  description = "Contains discord and boto3 tmp"
  filename    = "${path.module}/lambda-code/zips/lambda-layer.zip"
  layer_name  = "min-layer"

  compatible_runtimes = ["python3.7"]
  # source_code_hash = filebase64("${path.module}/lambda-code/zips/lambda-layer.zip")
  
  # lifecycle { // TODO - Fix so it only rebuild when the lambda code changes
  #   ignore_changes = all
  # }
}

resource "null_resource" "discord_bot_zip" {

  provisioner "local-exec" {
    command = <<EOT
      # cd ${path.root}
      cd ${path.module}/lambda-code/discord-bot
      zip -r "../zips/discord-bot.zip" .
    EOT
  }

  triggers = {
    uuid = uuid()
  }

  # lifecycle { // TODO - Fix so it only rebuild when the lambda code changes
  #   ignore_changes = all
  # }
}

resource "aws_lambda_function" "discord_bot" {
  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
  ]
  description = "Discord Bot "
  role        = aws_iam_role.discord_bot.arn
  runtime     = "python3.7"

  filename         = "${path.module}/lambda-code/zips/discord-bot.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda-code/zips/discord-bot.zip")

  function_name = "discord-bot-${var.project_name}"
  handler       = "main.lambda_handler"

  layers = [aws_lambda_layer_version.min_layer.arn]

  timeout     = var.lambda_fn_timeout
  memory_size = var.lambda_fn_memory_size
  reserved_concurrent_executions = var.lambda_fn_concurrency

  environment {
    variables = {
      "ACCESS_TOKEN" = data.aws_ssm_parameter.access_token.value
      "PROJECT_NAME" = var.project_name
      # "DYNAMODB_TABLE_NAME" = aws_dynamodb_table.discord_server_config.name //"${var.project_name}-server-config"
      "SERVER_CONFIG_TABLE" = aws_dynamodb_table.discord_server_config.name //"${var.project_name}-server-config"
      "VOTE_TABLE" = aws_dynamodb_table.vote_table.name


    }
  }

  tags = var.tags

}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.discord_bot.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "${aws_api_gateway_rest_api.discord_bot.execution_arn}/*/*/${var.project_name}-discord"

}
