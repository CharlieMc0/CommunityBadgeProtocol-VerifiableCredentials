resource "aws_api_gateway_rest_api" "discord_bot" {
  name = "${var.project_name}-discord"
  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = var.tags

}


resource "aws_api_gateway_domain_name" "discord_boy" {
  count           = var.certificate_arn != "" ? 1 : 0
  certificate_arn = var.certificate_arn
  domain_name     = var.custom_domain_name
}


resource "aws_api_gateway_rest_api_policy" "discord_bot" {
  rest_api_id = aws_api_gateway_rest_api.discord_bot.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "execute-api:Invoke",
      "Resource": "${aws_api_gateway_rest_api.discord_bot.execution_arn}*"
    }
  ]
}
EOF
}

resource "aws_api_gateway_resource" "discord_bot" {
  parent_id   = aws_api_gateway_rest_api.discord_bot.root_resource_id
  path_part   = var.project_name
  rest_api_id = aws_api_gateway_rest_api.discord_bot.id
}

resource "aws_api_gateway_method" "discord_bot" {
  authorization = "NONE"
  http_method   = "POST"
  resource_id   = aws_api_gateway_resource.discord_bot.id
  rest_api_id   = aws_api_gateway_rest_api.discord_bot.id
}

resource "aws_api_gateway_integration" "discord_bot" {
  rest_api_id             = aws_api_gateway_rest_api.discord_bot.id
  resource_id             = aws_api_gateway_resource.discord_bot.id
  http_method             = aws_api_gateway_method.discord_bot.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.discord_bot.invoke_arn

  credentials = aws_iam_role.discord_bot.arn

}

resource "aws_api_gateway_method_response" "response_200" {
  rest_api_id = aws_api_gateway_rest_api.discord_bot.id
  resource_id = aws_api_gateway_resource.discord_bot.id
  http_method = aws_api_gateway_method.discord_bot.http_method
  status_code = "200"
}

resource "aws_api_gateway_method_response" "response_401" {
  rest_api_id = aws_api_gateway_rest_api.discord_bot.id
  resource_id = aws_api_gateway_resource.discord_bot.id
  http_method = aws_api_gateway_method.discord_bot.http_method
  status_code = "401"
}

resource "aws_api_gateway_method_settings" "all" {
  rest_api_id = aws_api_gateway_rest_api.discord_bot.id
  stage_name  = aws_api_gateway_stage.discord_bot.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled = true
    logging_level   = "INFO" # TODO - Switch to Error
  }
}

resource "aws_api_gateway_deployment" "discord_bot" {
  rest_api_id = aws_api_gateway_rest_api.discord_bot.id

  triggers = {
    # NOTE: The configuration below will satisfy ordering considerations,
    #       but not pick up all future REST API changes. More advanced patterns
    #       are possible, such as using the filesha1() function against the
    #       Terraform configuration file(s) or removing the .id references to
    #       calculate a hash against whole resources. Be aware that using whole
    #       resources will show a difference after the initial implementation.
    #       It will stabilize to only change when resources change afterwards.
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.discord_bot.id,
      aws_api_gateway_method.discord_bot.id,
      aws_api_gateway_integration.discord_bot.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "discord_bot" {
  deployment_id = aws_api_gateway_deployment.discord_bot.id
  rest_api_id   = aws_api_gateway_rest_api.discord_bot.id
  stage_name    = "${var.project_name}-discord"

}

