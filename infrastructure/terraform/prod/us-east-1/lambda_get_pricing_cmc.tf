#
# Lambda: get_pricing_cmc
#
resource "aws_cloudwatch_log_group" "get_pricing_cmc" {
  name              = "/aws/lambda/${local.environment}-get_pricing_cmc"
  retention_in_days = 30

  tags = {
    Name      = "${local.environment}-get_pricing_cmc"
    ManagedBy = "terraform"
  }
}

resource "aws_lambda_function" "get_pricing_cmc" {
  package_type = "Image"
  image_uri    = "835780150279.dkr.ecr.us-east-1.amazonaws.com/get_pricing_cmc:latest"

  function_name = "${local.environment}-get_pricing_cmc"
  role          = "arn:aws:iam::835780150279:role/ecs_instance_role"
  timeout       = 600
  memory_size   = 512

  environment {
    variables = {
      ROCKO_ENV     = local.environment
      CMC_API_KEY   = "${jsondecode(data.aws_secretsmanager_secret_version.cmc_api_key.secret_string)["apikey"]}"
      SYMBOLS       = "BTC,ETH,COMP,WBTC,UNI"
      DATABASE_HOST = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["host"]}"
      DATABASE_USER = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["username"]}"
      DATABASE_PASS = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["password"]}"
      DATABASE_DB   = "rocko_main"
    }
  }

  vpc_config {
    subnet_ids         = ["subnet-0671714005d71577c", "subnet-0d4c38de51f4d3458"]
    security_group_ids = ["sg-031413c4ed6fdd50a"]
  }

  depends_on = [
    aws_cloudwatch_log_group.get_pricing_cmc,
  ]

  tags = {
    Name      = "${local.environment}-get_pricing_cmc"
    ManagedBy = "terraform"
  }
}

resource "aws_cloudwatch_event_target" "get_cmc_pricing_event_target" {
  rule      = aws_cloudwatch_event_rule.lambda_every_5_minutes.name
  target_id = "${local.environment}-get_pricing_cmc"
  arn       = aws_lambda_function.get_pricing_cmc.arn
}

resource "aws_lambda_permission" "get_cmc_pricing_allow" {
  statement_id  = "AllowEventBridgeToCallLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_pricing_cmc.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.lambda_every_5_minutes.arn
}

