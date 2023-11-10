#
# Lambda: get_compound_usdc_data
#
resource "aws_cloudwatch_log_group" "get_compound_usdc_data" {
  name              = "/aws/lambda/${local.environment}-get_compound_usdc_data"
  retention_in_days = 30

  tags = {
    Name      = "${local.environment}-get_compound_usdc_data"
    ManagedBy = "terraform"
  }
}

resource "aws_lambda_function" "get_compound_usdc_data" {
  package_type = "Image"
  image_uri    = "${aws_ecr_repository.get_compound_usdc_data.repository_url}:latest"

  function_name = "${local.environment}-get_compound_usdc_data"
  role          = "arn:aws:iam::835780150279:role/ecs_instance_role"
  timeout       = 600
  memory_size   = 512

  # TODO Update contract addresses to Sepolia

  environment {
    variables = {
      ROCKO_ENV           = local.environment
      PROVIDER            = "${jsondecode(data.aws_secretsmanager_secret_version.provider_url.secret_string)["url"]}"
      PROVIDER_MAIN       = "${jsondecode(data.aws_secretsmanager_secret_version.provider_url_prod.secret_string)["url"]}"
      NETWORK             = "goerli"
      COMET_CONTRACT      = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMET_CONTRACT"]}"
      COMET_CONTRACT_MAIN = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses_prod.secret_string)["COMET_CONTRACT"]}"
      COMP_CONTRACT       = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMP_CONTRACT"]}"
      USDC_CONTRACT       = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["USDC_CONTRACT"]}"
      DATABASE_HOST       = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["host"]}"
      DATABASE_USER       = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["username"]}"
      DATABASE_PASS       = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["password"]}"
      DATABASE_DB         = "rocko_develop"
    }
  }

  vpc_config {
    subnet_ids         = [module.rocko-vpc-dev.subnet-infrastructure-private-1-id, module.rocko-vpc-dev.subnet-infrastructure-private-2-id]
    security_group_ids = [module.rocko-vpc-dev.default_security_group_id]
  }

  depends_on = [
    aws_cloudwatch_log_group.get_compound_usdc_data,
  ]

  tags = {
    Name      = "${local.environment}-get_compound_usdc_data"
    ManagedBy = "terraform"
  }
}

resource "aws_cloudwatch_event_rule" "lambda_every_5_minutes" {
  name                = "lambda-every-5-minutes"
  description         = "Fires every 5 minutes"
  schedule_expression = "rate(5 minutes)"
}

resource "aws_cloudwatch_event_target" "trigger_lambda_on_schedule" {
  rule      = aws_cloudwatch_event_rule.lambda_every_5_minutes.name
  target_id = "${local.environment}-get_compound_usdc_data"
  arn       = aws_lambda_function.get_compound_usdc_data.arn
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_lambda" {
  statement_id  = "AllowEventBridgeToCallLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_compound_usdc_data.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.lambda_every_5_minutes.arn
}

