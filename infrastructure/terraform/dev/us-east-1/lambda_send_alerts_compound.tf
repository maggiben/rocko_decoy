#
# Lambda: send_alerts_compound
#
resource "aws_cloudwatch_log_group" "send_alerts_compound" {
  name              = "/aws/lambda/${local.environment}-send_alerts_compound"
  retention_in_days = 30

  tags = {
    Name      = "${local.environment}-send_alerts_compound"
    ManagedBy = "terraform"
  }
}

resource "aws_lambda_function" "send_alerts_compound" {
  package_type = "Image"
  image_uri    = "${aws_ecr_repository.send_alerts_compound.repository_url}:latest"

  function_name = "${local.environment}-send_alerts_compound"
  role          = "arn:aws:iam::835780150279:role/ecs_instance_role"
  timeout       = 600
  memory_size   = 512

  environment {
    variables = {
      ROCKO_ENV        = local.environment
      DATABASE_HOST    = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["host"]}"
      DATABASE_USER    = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["username"]}"
      DATABASE_PASS    = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["password"]}"
      DATABASE_DB      = "rocko_develop",
      SENDGRID_API_KEY = "${jsondecode(data.aws_secretsmanager_secret_version.sendgrid_api_key.secret_string)["auth_token"]}"
      PROVIDER         = "${jsondecode(data.aws_secretsmanager_secret_version.provider_url.secret_string)["url"]}"
      COMET_CONTRACT   = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMET_CONTRACT"]}"
      WETH_CONTRACT    = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["WETH_CONTRACT"]}"
    }
  }

  vpc_config {
    subnet_ids         = [module.rocko-vpc-dev.subnet-infrastructure-private-1-id, module.rocko-vpc-dev.subnet-infrastructure-private-2-id]
    security_group_ids = [module.rocko-vpc-dev.default_security_group_id]
  }

  depends_on = [
    aws_cloudwatch_log_group.send_alerts_compound,
  ]

  tags = {
    Name      = "${local.environment}-send_alerts_compound"
    ManagedBy = "terraform"
  }
}

resource "aws_cloudwatch_event_target" "send_alerts_compound_event_target" {
  rule      = aws_cloudwatch_event_rule.lambda_every_1_minute.name
  target_id = "${local.environment}-send_alerts_compound"
  arn       = aws_lambda_function.send_alerts_compound.arn
}

resource "aws_lambda_permission" "send_alerts_compound_allow" {
  statement_id  = "AllowEventBridgeToCallLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.send_alerts_compound.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.lambda_every_1_minute.arn
}

