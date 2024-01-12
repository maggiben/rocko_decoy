data "aws_region" "current" {}

data "aws_secretsmanager_secret_version" "coinbase_creds" {
  secret_id = "dev/coinbase_oauth_creds"
}

data "aws_secretsmanager_secret_version" "gemini_creds" {
  secret_id = "dev/gemini_oauth_creds"
}

data "aws_secretsmanager_secret_version" "db_creds" {
  secret_id = "dev/db_creds"
}

data "aws_secretsmanager_secret_version" "contract_addresses" {
  secret_id = "prod/contract_addresses"
}

data "aws_secretsmanager_secret_version" "provider_url" {
  secret_id = "prod/provider_url"
}

data "aws_secretsmanager_secret_version" "cmc_api_key" {
  secret_id = "prod/cmc_key"
}

data "aws_secretsmanager_secret_version" "vpnapi_key" {
  secret_id = "prod/vpn_api_key"
}

data "aws_secretsmanager_secret_version" "mailchimp_key" {
  secret_id = "prod/mailchimp_key"
}

data "aws_secretsmanager_secret_version" "mailchimp_list" {
  secret_id = "prod/mailchimp_list"
}

data "aws_vpc" "dev-infrastructure-vpc" {
  filter {
    name   = "tag:Name"
    values = ["dev-infrastructure-vpc"]
  }
}

data "aws_subnets" "private-subnets" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.dev-infrastructure-vpc.id]
  }

  filter {
    name   = "tag:Name"
    values = ["dev-infrastructure-private-*"]
  }
}

data "aws_subnet" "public-subnet1" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.dev-infrastructure-vpc.id]
  }

  filter {
    name   = "tag:Name"
    values = ["dev-infrastructure-public-1"]
  }
}

data "aws_subnet" "public-subnet2" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.dev-infrastructure-vpc.id]
  }

  filter {
    name   = "tag:Name"
    values = ["dev-infrastructure-public-2"]
  }
}

