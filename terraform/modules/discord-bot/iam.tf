resource "aws_iam_policy" "lambda_logging" {
  name        = "${var.project_name}-lambda-logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
  tags   = var.tags
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.discord_bot.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}


resource "aws_iam_role" "discord_bot" {
  name               = "${var.project_name}-discord-bot"
  assume_role_policy = data.aws_iam_policy_document.sts.json
  tags               = var.tags

}

data "aws_iam_policy_document" "sts" {

  statement {
    effect = "Allow"

    actions = [
      "sts:AssumeRole",
    ]

    principals {
      type = "Service"

      identifiers = [
        "lambda.amazonaws.com",
        "edgelambda.amazonaws.com",
        "apigateway.amazonaws.com",
      ]
    }
  }
}

resource "aws_iam_role_policy_attachment" "lambda_admin_role" { // TODO - Replace with more specific role 
  role       = aws_iam_role.discord_bot.name
  policy_arn = "arn:aws:iam::aws:policy/AWSLambda_FullAccess"
}

resource "aws_iam_role_policy_attachment" "lambda_dynamo_db" { // TODO - Replace with more specific role 
  role       = aws_iam_role.discord_bot.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_role_policy_attachment" "lambda_cloudwatch" { // TODO - Replace with more specific role 
  role       = aws_iam_role.discord_bot.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}