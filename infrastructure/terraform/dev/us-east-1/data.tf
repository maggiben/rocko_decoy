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
  secret_id = "dev/contract_addresses"
}

data "aws_secretsmanager_secret_version" "contract_addresses_prod" {
  secret_id = "prod/contract_addresses"
}

data "aws_secretsmanager_secret_version" "provider_url" {
  secret_id = "dev/provider_url"
}

data "aws_secretsmanager_secret_version" "provider_url_prod" {
  secret_id = "prod/provider_url"
}

data "aws_secretsmanager_secret_version" "vpnapi_key" {
  secret_id = "prod/vpn_api_key"
}

data "aws_secretsmanager_secret_version" "sendgrid_api_key" {
  secret_id = "prod/sendgrid_key"
}
