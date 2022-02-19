
variable "region" {
  type        = string
  default     = "us-east-1"
  description = "AWS Region"
}

variable "project_name" {
  type        = string
  description = "Name of the project"
}

variable "common_tags" {
  type = map(any)
  default = {
    owner      = "charlie"
    managed-by = "terraform"
  }
}
