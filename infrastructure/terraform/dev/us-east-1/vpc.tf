module "rocko-vpc-dev" {
  source = "../../modules/rocko-vpc"

  domain      = "rocko.co"
  environment = "dev"
  subdomain   = "dev.rocko.co"
  region      = "us-east-1"

  vpc_cidr_block                 = "10.14.0.0/21"
  vpc_public_subnet1_cidr_block  = "10.14.1.0/24"
  vpc_public_subnet2_cidr_block  = "10.14.2.0/24"
  vpc_private_subnet1_cidr_block = "10.14.3.0/24"
  vpc_private_subnet2_cidr_block = "10.14.4.0/24"

  vpc_public_subnet1_az   = "us-east-1a"
  vpc_public_subnet2_az   = "us-east-1b"
  vpc_private_subnet1_az  = "us-east-1a"
  vpc_private_subnet2_az  = "us-east-1b"
  vpc_flow_logs_s3_bucket = "arn:aws:s3:::rocko-835780150279-logs-us-east-1"
}
