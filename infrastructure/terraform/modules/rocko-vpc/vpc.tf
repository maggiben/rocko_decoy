resource "aws_vpc" "infrastructure-vpc" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_hostnames = true

  tags = {
    Name      = "${var.environment}-infrastructure-vpc"
    ManagedBy = "terraform"
  }
}

resource "aws_flow_log" "infrastructure-vpc" {

  log_destination      = var.vpc_flow_logs_s3_bucket
  log_destination_type = "s3"
  traffic_type         = "ALL"
  vpc_id               = aws_vpc.infrastructure-vpc.id
}

resource "aws_default_route_table" "infrastructure-vpc" {
  default_route_table_id = aws_vpc.infrastructure-vpc.default_route_table_id

  tags = {
    Name      = "${var.environment}-infrastructure-vpc"
    ManagedBy = "terraform"
  }
}

resource "aws_default_security_group" "infrastructure-vpc" {
  vpc_id = aws_vpc.infrastructure-vpc.id

  tags = {
    Name      = "${var.environment}-infrastructure-vpc"
    ManagedBy = "terraform"
  }
}

resource "aws_security_group_rule" "infrastructure_public_out" {
  type        = "egress"
  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = aws_default_security_group.infrastructure-vpc.id
}

resource "aws_security_group_rule" "infrastructure_internal_mysql" {
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "tcp"
  cidr_blocks       = ["10.0.0.0/8"]
  security_group_id = aws_default_security_group.infrastructure-vpc.id
}

resource "aws_subnet" "infrastructure-public-1" {
  cidr_block                      = var.vpc_public_subnet1_cidr_block
  availability_zone               = var.vpc_public_subnet1_az
  vpc_id                          = aws_vpc.infrastructure-vpc.id
  map_public_ip_on_launch         = true
  assign_ipv6_address_on_creation = false

  tags = {
    Name      = "${var.environment}-infrastructure-public-1"
    ManagedBy = "terraform"
  }
}

resource "aws_subnet" "infrastructure-public-2" {

  cidr_block                      = var.vpc_public_subnet2_cidr_block
  availability_zone               = var.vpc_public_subnet2_az
  vpc_id                          = aws_vpc.infrastructure-vpc.id
  map_public_ip_on_launch         = true
  assign_ipv6_address_on_creation = false

  tags = {
    Name      = "${var.environment}-infrastructure-public-2"
    ManagedBy = "terraform"
  }
}

resource "aws_internet_gateway" "infrastructure-igw" {
  vpc_id = aws_vpc.infrastructure-vpc.id

  tags = {
    Name      = "${var.environment}-infrastructure-igw"
    ManagedBy = "terraform"
  }
}

# Primary IGW associations and routes
resource "aws_route" "infrastructure-internet-access" {
  route_table_id         = aws_vpc.infrastructure-vpc.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.infrastructure-igw.id
}

resource "aws_route_table_association" "infrastructure-public-1" {
  subnet_id      = aws_subnet.infrastructure-public-1.id
  route_table_id = aws_vpc.infrastructure-vpc.main_route_table_id
}

resource "aws_route_table_association" "infrastructure-public-2" {
  subnet_id      = aws_subnet.infrastructure-public-2.id
  route_table_id = aws_vpc.infrastructure-vpc.main_route_table_id
}

# Private NAT associations and routes
resource "aws_eip" "infrastructure-eip" {

  vpc        = true
  depends_on = [aws_internet_gateway.infrastructure-igw]

  tags = {
    Name      = "${var.environment}-infrastructure-vpc-eip"
    ManagedBy = "terraform"
  }
}

resource "aws_nat_gateway" "infrastructure-ngw" {

  subnet_id     = aws_subnet.infrastructure-public-1.id
  allocation_id = aws_eip.infrastructure-eip.id

  tags = {
    Name      = "${var.environment}-infrastructure-ngw"
    ManagedBy = "terraform"
  }
}

resource "aws_subnet" "infrastructure-private-1" {
  cidr_block                      = var.vpc_private_subnet1_cidr_block
  availability_zone               = var.vpc_private_subnet1_az
  vpc_id                          = aws_vpc.infrastructure-vpc.id
  map_public_ip_on_launch         = false
  assign_ipv6_address_on_creation = false

  tags = {
    Name      = "${var.environment}-infrastructure-private-1"
    ManagedBy = "terraform"
  }
}

resource "aws_subnet" "infrastructure-private-2" {
  cidr_block                      = var.vpc_private_subnet2_cidr_block
  availability_zone               = var.vpc_private_subnet2_az
  vpc_id                          = aws_vpc.infrastructure-vpc.id
  map_public_ip_on_launch         = false
  assign_ipv6_address_on_creation = false

  tags = {
    Name      = "${var.environment}-infrastructure-private-2"
    ManagedBy = "terraform"
  }
}

resource "aws_route_table" "infrastructure_private" {
  vpc_id = aws_vpc.infrastructure-vpc.id

  tags = {
    Name      = "${var.environment}-infrastructure-private"
    ManagedBy = "terraform"
  }
}

resource "aws_route" "infrastructure_private_default" {
  route_table_id         = aws_route_table.infrastructure_private.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.infrastructure-ngw.id
}

resource "aws_route_table_association" "infrastructure-private-1" {
  subnet_id      = aws_subnet.infrastructure-private-1.id
  route_table_id = aws_route_table.infrastructure_private.id
}

resource "aws_route_table_association" "infrastructure-private-2" {
  subnet_id      = aws_subnet.infrastructure-private-2.id
  route_table_id = aws_route_table.infrastructure_private.id
}

