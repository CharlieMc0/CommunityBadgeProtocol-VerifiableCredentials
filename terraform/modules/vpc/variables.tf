variable "availability_zones" {
  description = "List of subnet availability zones."
  type        = list(string)
}

variable "expand_ephemeral_port_range" {
  description = "TCP and UDP ephemeral range will be adjusted to 1024-65535 in private subnets.  Required for Lambda, EKS, etc.  https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-ephemeral-ports"
  default     = false
  type        = bool
}

variable "flowlog_retention" {
  description = "Flowlog retention in days for CloudWatch log group."
  default     = 7
  type        = number
}

variable "domain_name" {
  description = "Domain name for DNS lookups inside associated VPCs."
  default     = "ec2.internal"
  type        = string
}

variable "domain_name_servers" {
  description = "List of the DNS servers"
  default     = ["AmazonProvidedDNS"]
  type        = list(string)
}

variable "flowlog_traffic_type" {
  description = "Type of flowlog traffic to capture.  Valid values - ACCEPT, REJECT, ALL."
  default     = "ALL"
  type        = string
}

variable "settings" {
  description = "Map of desired VPC settings.  Example in readme.md."
  type        = map
}

variable "single_nat_gateway" {
  description = "Single NAT Gateway for all AZs.  Provides cost savings in development environments."
  default     = false
  type        = bool
}

variable "tags" {
  description = "Tags to apply to all VPC resources."
  default     = {}
  type        = map
}
