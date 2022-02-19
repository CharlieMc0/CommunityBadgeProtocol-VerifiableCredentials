
data "aws_ssm_parameter" "eth_private_key" { 
  // TODO - Get rid of this and pull from SSM in the function
  name = "/${var.project_name}/eth_wallet_private_key"
}

data "aws_ssm_parameter" "skale_private_key" { 
  // TODO - Get rid of this and pull from SSM in the function
  name = "/${var.project_name}/skale_wallet_private_key"

}
resource "aws_lambda_layer_version" "nodejs_layer" {
  description = "Contains web3"
  filename    = "${path.module}/lambda-code/zips/nodejs-layer.zip"
  layer_name  = "nodejs-layer"

  compatible_runtimes = ["nodejs14.x"]
  # source_code_hash = filebase64("${path.module}/lambda-code/zips/chain-functions.zip")
  
  # lifecycle { // TODO - Fix so it only rebuild when the lambda code changes
  #   ignore_changes = all
  # }
}

resource "null_resource" "chain_functions_zip" {

  provisioner "local-exec" {
    command = <<EOT
      # cd ${path.root}
      cd ${path.module}/lambda-code/chain-functions
      zip -r "../zips/chain-functions.zip" .
    EOT
  }

  triggers = {
    uuid = uuid()
  }

  # lifecycle { // TODO - Fix so it only rebuild when the lambda code changes
  #   ignore_changes = all
  # }
}

resource "aws_lambda_function" "chain_functions" {
  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
  ]
  description = "Functions for interation with the chain"
  role        = aws_iam_role.discord_bot.arn
  runtime     = "nodejs14.x"
  # architectures  = ["arm64"]

  filename         = "${path.module}/lambda-code/zips/chain-functions.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda-code/zips/chain-functions.zip") // TODO - Fix this so apply works even if the zip does not exist 

  function_name = "chain-functions-${var.project_name}"
  handler       = "index.handler"

  layers = [aws_lambda_layer_version.nodejs_layer.arn]

  timeout     = var.lambda_fn_timeout
  memory_size = var.lambda_fn_memory_size
  reserved_concurrent_executions = var.lambda_fn_concurrency

  environment {
    variables = {
      "PROJECT_NAME" = var.project_name
      "ETHWALLETPRIVKEY" = data.aws_ssm_parameter.eth_private_key.value
      "SKALEPRIVKEY" = data.aws_ssm_parameter.skale_private_key.value
    }
  }

  tags = var.tags

}

# resource "aws_lambda_permission" "api" {
#   statement_id  = "AllowExecutionFromAPIGateway"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.chain_functions.function_name
#   principal     = "apigateway.amazonaws.com"

#   # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
#   source_arn = "${aws_api_gateway_rest_api.chain_functions.execution_arn}/*/*/${var.project_name}-chain-functions"

# }
