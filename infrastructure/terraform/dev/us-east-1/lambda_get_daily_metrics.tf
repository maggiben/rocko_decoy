#
# Lambda: get_daily_metrics
#
resource "aws_cloudwatch_log_group" "get_daily_metrics" {
  name              = "/aws/lambda/${local.environment}-get_daily_metrics"
  retention_in_days = 30

  tags = {
    Name      = "${local.environment}-get_daily_metrics"
    ManagedBy = "terraform"
  }
}

resource "aws_lambda_function" "get_daily_metrics" {
  package_type = "Image"
  image_uri    = "${aws_ecr_repository.get_daily_metrics.repository_url}:latest"

  function_name = "${local.environment}-get_daily_metrics"
  role          = "arn:aws:iam::835780150279:role/ecs_instance_role"
  timeout       = 600
  memory_size   = 512

  environment {
    variables = {
      ROCKO_ENV           = local.environment
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
    aws_cloudwatch_log_group.get_daily_metrics,
  ]

  tags = {
    Name      = "${local.environment}-get_daily_metrics"
    ManagedBy = "terraform"
  }
}

resource "aws_cloudwatch_event_target" "trigger_lambda_on_schedule" {
  rule      = aws_cloudwatch_event_rule.lambda_every_24_hours.name
  target_id = "${local.environment}-get_daily_metrics"
  arn       = aws_lambda_function.get_daily_metrics.arn
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_lambda" {
  statement_id  = "AllowEventBridgeToCallLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_daily_metrics.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.lambda_every_5_minutes.arn
}

