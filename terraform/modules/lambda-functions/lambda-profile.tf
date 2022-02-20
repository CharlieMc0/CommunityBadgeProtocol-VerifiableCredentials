resource "null_resource" "create_profile_zip" {

  provisioner "local-exec" {
    command = <<EOT
      # cd ${path.root}
      cd ${path.module}/lambda-code/create-profile
      zip -r "../zips/create-profile.zip" .
    EOT
  }

  triggers = {
    uuid = uuid()
  }

}

resource "aws_lambda_function" "create_profile" {
  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
  ]
  description = "Discord Bot "
  role        = aws_iam_role.discord_bot.arn
  runtime     = "python3.7"

  filename = "${path.module}/lambda-code/zips/create-profile.zip"
  # source_code_hash = filebase64sha256("${path.module}/lambda-code/zips/create-profile.zip") // TODO - Fix this so apply works even if the zip does not exist 

  function_name = "create-profile-${var.project_name}"
  handler       = "main.lambda_handler"

  layers = [aws_lambda_layer_version.min_layer.arn]

  timeout                        = var.lambda_fn_timeout
  memory_size                    = var.lambda_fn_memory_size
  reserved_concurrent_executions = var.lambda_fn_concurrency

  environment {
    variables = {
      "PROJECT_NAME" = var.project_name
      "SERVER_CONFIG_TABLE" = aws_dynamodb_table.discord_server_config.name //"${var.project_name}-server-config"
      "VOTE_TABLE"          = aws_dynamodb_table.vote_table.name
    }
  }

  tags = var.tags

}
