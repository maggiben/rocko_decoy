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

data "aws_secretsmanager_secret_version" "messagebird_api_key" {
  secret_id = "prod/messagebird_key"
}

data "aws_secretsmanager_secret_version" "mailchimp_key" {
  secret_id = "prod/mailchimp_key"
}

data "aws_secretsmanager_secret_version" "mailchimp_list" {
  secret_id = "prod/mailchimp_list"
}

data "aws_secretsmanager_secret_version" "trm_api_key" {
  secret_id = "dev/trm_api_key"
}

data "aws_secretsmanager_secret_version" "slack_webhook_url" {
  secret_id = "dev/slack_webhook_url"
}
