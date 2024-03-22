#
# Lambda: get_compound_usdc_data_base
#
resource "aws_cloudwatch_log_group" "get_compound_usdc_data_base" {
  name              = "/aws/lambda/${local.environment}-get_compound_usdc_data_base"
  retention_in_days = 30

  tags = {
    Name      = "${local.environment}-get_compound_usdc_data_base"
    ManagedBy = "terraform"
  }
}

resource "aws_lambda_function" "get_compound_usdc_data_base" {
  package_type = "Image"
  image_uri    = "835780150279.dkr.ecr.us-east-1.amazonaws.com/get_compound_usdc_data:latest"

  function_name = "${local.environment}-get_compound_usdc_data"
  role          = "arn:aws:iam::835780150279:role/ecs_instance_role"
  timeout       = 600
  memory_size   = 512

  # TODO Update contract addresses to mainnet
  
  environment {
    variables = {
      ROCKO_ENV           = local.environment
      PROVIDER            = "${jsondecode(data.aws_secretsmanager_secret_version.provider_url.secret_string)["url_base"]}"
      PROVIDER_BASE       = "${jsondecode(data.aws_secretsmanager_secret_version.provider_url.secret_string)["url_base"]}"
      NETWORK             = "base"
      COMET_CONTRACT_BASE = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMET_CONTRACT_BASE"]}"
      COMET_CONTRACT_MAIN = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMET_CONTRACT_BASE"]}"
      COMP_CONTRACT_BASE  = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMP_CONTRACT_BASE"]}"
      USDC_CONTRACT_BASE  = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["USDC_CONTRACT_BASE"]}"
      DATABASE_HOST       = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["host"]}"
      DATABASE_USER       = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["username"]}"
      DATABASE_PASS       = "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["password"]}"
      DATABASE_DB         = "rocko_main"
    }
  }

  vpc_config {
    subnet_ids         = ["subnet-0671714005d71577c", "subnet-0d4c38de51f4d3458"]
    security_group_ids = ["sg-031413c4ed6fdd50a"]
  }

  depends_on = [
    aws_cloudwatch_log_group.get_compound_usdc_data_base,
  ]

  tags = {
    Name      = "${local.environment}-get_compound_usdc_data_base"
    ManagedBy = "terraform"
  }
}

resource "aws_cloudwatch_event_target" "get_compound_usdc_data_base_event_target" {
  rule      = aws_cloudwatch_event_rule.lambda_every_5_minutes.name
  target_id = "${local.environment}-get_compound_usdc_data_base"
  arn       = aws_lambda_function.get_compound_usdc_data_base.arn
}

resource "aws_lambda_permission" "get_compound_usdc_data_base_allow" {
  statement_id  = "AllowEventBridgeToCallLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_compound_usdc_data_base.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.lambda_every_5_minutes.arn
}

