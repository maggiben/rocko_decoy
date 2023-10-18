data "aws_region" "current" {}

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
