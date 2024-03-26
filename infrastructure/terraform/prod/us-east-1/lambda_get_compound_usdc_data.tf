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
  image_uri    = "835780150279.dkr.ecr.us-east-1.amazonaws.com/get_compound_usdc_data:latest"

  function_name = "${local.environment}-get_compound_usdc_data"
  role          = "arn:aws:iam::835780150279:role/ecs_instance_role"
  timeout       = 600
  memory_size   = 512

  # TODO Update contract addresses to mainnet
  
  environment {
    variables = {
      ROCKO_ENV           = local.environment
      
      PROVIDER            = "${jsondecode(data.aws_secretsmanager_secret_version.provider_url.secret_string)["url"]}"
      PROVIDER_MAIN       = "${jsondecode(data.aws_secretsmanager_secret_version.provider_url.secret_string)["url"]}"
      NETWORK             = "mainnet"
      COMET_CONTRACT      = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMET_CONTRACT"]}"
      COMET_CONTRACT_MAIN = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMET_CONTRACT"]}"
      COMP_CONTRACT       = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMP_CONTRACT"]}"
      USDC_CONTRACT       = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["USDC_CONTRACT"]}"
      
      NETWORK_BASE        = "base"
      PROVIDER_BASE       = "${jsondecode(data.aws_secretsmanager_secret_version.provider_url.secret_string)["url_base"]}"
      COMET_CONTRACT_BASE = "${jsondecode(data.aws_secretsmanager_secret_version.contract_addresses.secret_string)["COMET_CONTRACT_BASE"]}"
      
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
    aws_cloudwatch_log_group.get_compound_usdc_data,
  ]

  tags = {
    Name      = "${local.environment}-get_compound_usdc_data"
    ManagedBy = "terraform"
  }
}

resource "aws_cloudwatch_event_target" "get_compound_usdc_data_event_target" {
  rule      = aws_cloudwatch_event_rule.lambda_every_5_minutes.name
  target_id = "${local.environment}-get_compound_usdc_data"
  arn       = aws_lambda_function.get_compound_usdc_data.arn
}

resource "aws_lambda_permission" "get_compound_usdc_data_allow" {
  statement_id  = "AllowEventBridgeToCallLambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get_compound_usdc_data.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.lambda_every_5_minutes.arn
}

