

### Notes 
Some requirements needed to be built on EC2. The Layer Zip files are included in this repo for convenience. If you need to rebuild the lambda-layer zip do it on an EC2 instance or via CodeBuild. 

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | n/a |
| <a name="provider_null"></a> [null](#provider\_null) | n/a |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_certificate_arn"></a> [certificate\_arn](#input\_certificate\_arn) | Certificate ARN for custom API Gateway Domain Name | `string` | `""` | no |
| <a name="input_custom_domain_name"></a> [custom\_domain\_name](#input\_custom\_domain\_name) | Custom Domain name for the API Gateway Domain | `string` | `""` | no |
| <a name="input_enable_db_backup"></a> [enable\_db\_backup](#input\_enable\_db\_backup) | Enable Nightly DynamoDB Backups | `bool` | `true` | no |
| <a name="input_lambda_execution_role"></a> [lambda\_execution\_role](#input\_lambda\_execution\_role) | The Execution Role for the Lambda | `string` | `"us-east-1"` | no |
| <a name="input_lambda_fn_concurrency"></a> [lambda\_fn\_concurrency](#input\_lambda\_fn\_concurrency) | The Lambda Function Concurency Settings | `string` | `"-1"` | no |
| <a name="input_lambda_fn_memory_size"></a> [lambda\_fn\_memory\_size](#input\_lambda\_fn\_memory\_size) | The Amount Of Member for the Lambda Function in MB | `number` | `128` | no |
| <a name="input_lambda_fn_timeout"></a> [lambda\_fn\_timeout](#input\_lambda\_fn\_timeout) | The Lambda Function Timeout in seconds | `number` | `300` | no |
| <a name="input_project_name"></a> [project\_name](#input\_project\_name) | Name of the project | `string` | n/a | yes |
| <a name="input_region"></a> [region](#input\_region) | AWS Region | `string` | `"us-east-1"` | no |
| <a name="input_tags"></a> [tags](#input\_tags) | n/a | `map(any)` | <pre>{<br>  "managed-by": "terraform"<br>}</pre> | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_api_gateway_execution_arn"></a> [api\_gateway\_execution\_arn](#output\_api\_gateway\_execution\_arn) | n/a |
| <a name="output_api_gateway_invocation_url"></a> [api\_gateway\_invocation\_url](#output\_api\_gateway\_invocation\_url) | n/a |
| <a name="output_discord_interactions_url"></a> [discord\_interactions\_url](#output\_discord\_interactions\_url) | n/a |