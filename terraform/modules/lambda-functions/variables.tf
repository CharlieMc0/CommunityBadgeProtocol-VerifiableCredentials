variable "region" {
  type        = string
  default     = "us-east-1"
  description = "AWS Region"
}

variable "enable_db_backup" {
  type        = bool
  description = "Enable Nightly DynamoDB Backups"
  default     = true
}

variable "project_name" {
  type        = string
  description = "Name of the project"
}

variable "certificate_arn" {
  type        = string
  description = "Certificate ARN for custom API Gateway Domain Name"
  default     = ""
}

variable "custom_domain_name" {
  type        = string
  description = "Custom Domain name for the API Gateway Domain"
  default     = ""
}

variable "tags" {
  type = map(any)
  default = {
    managed-by = "terraform"
  }
}

variable "lambda_execution_role" {
  type        = string
  default     = "us-east-1"
  description = "The Execution Role for the Lambda"
}

variable "lambda_fn_timeout" {
  type        = number
  default     = 300
  description = "The Lambda Function Timeout in seconds"
}

variable "lambda_fn_concurrency" {
  type        = string
  default     = "-1"
  description = "The Lambda Function Concurency Settings"
}

variable "lambda_fn_memory_size" {
  type        = number
  default     = 128
  description = "The Amount Of Member for the Lambda Function in MB"
}
