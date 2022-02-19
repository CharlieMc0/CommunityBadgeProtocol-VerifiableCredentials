resource "aws_vpc_endpoint" "s3" {
  vpc_id       = aws_vpc.vpc.id
  service_name = "com.amazonaws.${data.aws_region.current.name}.s3"
}

resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id       = aws_vpc.vpc.id
  service_name = "com.amazonaws.${data.aws_region.current.name}.dynamodb"
}



#
# VPC Endpoint - private data subnet route associations
#

resource "aws_vpc_endpoint_route_table_association" "private_s3_data_cidrs" {
  for_each        = toset(var.availability_zones)
  vpc_endpoint_id = aws_vpc_endpoint.s3.id
  route_table_id  = aws_route_table.data[each.key].id
}

resource "aws_vpc_endpoint_route_table_association" "private_dynamodb_data_cidrs" {
  for_each        = toset(var.availability_zones)
  vpc_endpoint_id = aws_vpc_endpoint.dynamodb.id
  route_table_id  = aws_route_table.data[each.key].id
}



#
# VPC Endpoints - Private subnet route associations
#

resource "aws_vpc_endpoint_route_table_association" "private_s3_private_cidrs" {
  for_each        = toset(var.availability_zones)
  vpc_endpoint_id = aws_vpc_endpoint.s3.id
  route_table_id  = aws_route_table.private[each.key].id
}

resource "aws_vpc_endpoint_route_table_association" "private_dynamodb_private_cidrs" {
  for_each        = toset(var.availability_zones)
  vpc_endpoint_id = aws_vpc_endpoint.dynamodb.id
  route_table_id  = aws_route_table.private[each.key].id
}

#
# VPC Endpoints - Public route associations
#

resource "aws_vpc_endpoint_route_table_association" "private_s3_public_cidrs" {
  for_each        = toset(var.availability_zones)
  vpc_endpoint_id = aws_vpc_endpoint.s3.id
  route_table_id  = aws_route_table.public[each.key].id
}

resource "aws_vpc_endpoint_route_table_association" "private_dynamodb_public_cidrs" {
  for_each        = toset(var.availability_zones)
  vpc_endpoint_id = aws_vpc_endpoint.dynamodb.id
  route_table_id  = aws_route_table.public[each.key].id
}
