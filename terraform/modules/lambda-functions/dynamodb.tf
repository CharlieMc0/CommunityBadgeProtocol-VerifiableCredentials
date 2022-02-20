resource "aws_dynamodb_table" "discord_server_config" {
  name         = "${var.project_name}-server-config"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "ServerId"

  point_in_time_recovery {
    enabled = false
  }

  attribute {
    name = "ServerId"
    type = "S"
  }

  tags = var.tags
}


resource "aws_dynamodb_table" "vote_table" {
  name         = "${var.project_name}-votes"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "ServerId"
  range_key    = "NominationId"

  point_in_time_recovery {
    enabled = false
  }

  attribute {
    name = "ServerId"
    type = "S"
  }

  attribute {
    name = "NominationId"
    type = "S"
  }

  tags = var.tags
}