
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

}

resource "aws_lambda_function" "chain_functions" {
  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
  ]
  description = "Functions for interation with the chain"
  role        = aws_iam_role.discord_bot.arn
  runtime     = "nodejs14.x"

  filename         = "${path.module}/lambda-code/zips/chain-functions.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda-code/zips/chain-functions.zip") // TODO - Fix this so apply works even if the zip does not exist 

  function_name = "chain-functions-${var.project_name}"
  handler       = "index.handler"

  layers = [aws_lambda_layer_version.nodejs_layer.arn]

  timeout                        = var.lambda_fn_timeout
  memory_size                    = var.lambda_fn_memory_size
  reserved_concurrent_executions = var.lambda_fn_concurrency

  environment {
    variables = {
      "PROJECT_NAME"     = var.project_name
      "ETHWALLETPRIVKEY" = data.aws_ssm_parameter.eth_private_key.value
      "SKALEPRIVKEY"     = data.aws_ssm_parameter.skale_private_key.value
    }
  }

  tags = var.tags

}
