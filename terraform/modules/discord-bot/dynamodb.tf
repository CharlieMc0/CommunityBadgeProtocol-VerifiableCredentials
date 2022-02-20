resource "aws_dynamodb_table" "discord_server_config" {
  name         = "${var.project_name}-server-config"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "ServerId"
  # range_key = "WalletAddress"

  point_in_time_recovery {
    enabled = false
  }

  attribute {
    name = "ServerId"
    type = "S"
  }

  # attribute {
  #   name = "NominatingRoles"
  #   type = "S"
  # }

  # attribute {
  #   name = "VotingRoles"
  #   type = "S"
  # }

  # attribute {
  #   name = "EligibleRoles"
  #   type = "S"
  # }

  # global_secondary_index {
  #   name            = "WalletAddressIndex"
  #   hash_key        = "WalletAddress"
  #   projection_type = "KEYS_ONLY"
  # }

  tags = var.tags
}


resource "aws_dynamodb_table" "vote_table" {
  name         = "${var.project_name}-votes"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "ServerId"
  range_key = "NominationId"

  point_in_time_recovery {
    // Does this impact billing?
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

  # attribute {
  #   name = "WalletAddress"
  #   type = "S"
  # }

  # global_secondary_index {
  #   name            = "WalletAddressIndex"
  #   hash_key        = "WalletAddress"
  #   projection_type = "KEYS_ONLY"
  # }

  tags = var.tags
}