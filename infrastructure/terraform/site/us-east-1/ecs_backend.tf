resource "aws_cloudwatch_log_group" "rocko_backend" {
  name              = "/ecs/${local.environment}-rocko_backend"
  retention_in_days = 30

  tags = {
    Name      = "${local.environment}-rocko"
    ManagedBy = "terraform"
  }
}

resource "aws_ecs_service" "rocko_backend" {
  name            = "${local.environment}-rocko_backend"
  cluster         = "${local.environment}-rocko"
  task_definition = aws_ecs_task_definition.rocko_backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.rocko-ecs.id]
    subnets          = data.aws_subnets.private-subnets.ids
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = module.rocko_lb_backend.target_group_id
    container_name   = "${local.environment}-rocko_backend"
    container_port   = 5000
  }

  tags = {
    Name      = "${local.environment}-rocko_backend"
    ManagedBy = "terraform"
  }
}

resource "aws_ecs_task_definition" "rocko_backend" {
  family                   = "${local.environment}-rocko_backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 512
  memory                   = 1024
  task_role_arn            = "arn:aws:iam::835780150279:role/ecs_instance_role"
  execution_role_arn       = "arn:aws:iam::835780150279:role/ecs_task_execution_role"

  container_definitions = <<EOF
[
  {
    "image": "${local.ecs_rocko_backend_image}",
    "cpu": 512,
    "memory": 1024,
    "name": "${local.environment}-rocko_backend",
    "essential": true,
    "networkMode": "awsvpc",
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "${local.region}",
        "awslogs-group": "/ecs/${local.environment}-rocko_backend",
        "awslogs-stream-prefix": "ecs"
      }
    },
    "environment": [
      {"name": "ROCKO_ENV", "value": "${local.environment}"},
      {"name": "COINBASE_CLIENT_SECRET", "value": "${jsondecode(data.aws_secretsmanager_secret_version.coinbase_creds.secret_string)["client_secret"]}"},
      {"name": "COINBASE_CLIENT_ID", "value": "${jsondecode(data.aws_secretsmanager_secret_version.coinbase_creds.secret_string)["client_id"]}"},
      {"name": "GEMINI_CLIENT_SECRET", "value": "${jsondecode(data.aws_secretsmanager_secret_version.gemini_creds.secret_string)["client_secret"]}"},
      {"name": "GEMINI_CLIENT_ID", "value": "${jsondecode(data.aws_secretsmanager_secret_version.gemini_creds.secret_string)["client_id"]}"},
      {"name": "BACKEND_URL", "value": "${local.backend_url}"},
      {"name": "CLIENT_URL", "value": "${local.client_url}"},
      {"name": "VPNAPI_KEY", "value": "${jsondecode(data.aws_secretsmanager_secret_version.vpnapi_key.secret_string)["api_key"]}"},
      {"name": "ROCKO_DB_HOST", "value": "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["host"]}"},
      {"name": "ROCKO_DB_USER", "value": "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["username"]}"},
      {"name": "ROCKO_DB_PASSWORD", "value": "${jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)["password"]}"},
      {"name": "ROCKO_DB_DATABASE", "value": "rocko_site"},
      {"name": "MAILCHIMP_API_KEY", "value": "${jsondecode(data.aws_secretsmanager_secret_version.mailchimp_key.secret_string)["api_key"]}"},
      {"name": "MAILCHIMP_LIST_ID", "value": "${jsondecode(data.aws_secretsmanager_secret_version.mailchimp_list.secret_string)["list_id"]}"},
      {"name": "TRM_API_KEY", "value": "${jsondecode(data.aws_secretsmanager_secret_version.trm_api_key.secret_string)["trm_api_key"]}"},
      {"name": "SLACK_WEBHOOK_URL", "value": "${jsondecode(data.aws_secretsmanager_secret_version.slack_webhook_url.secret_string)["webhook"]}"},
      {"name": "DYNAMIC_PROJECT_ID", "value": "${jsondecode(data.aws_secretsmanager_secret_version.dynamic_project_id.secret_string)["api_key"]}"}
    ],
    "portMappings": [
      {
        "containerPort": 5000,
        "hostPort": 5000
      }
    ]
  }
]
EOF

  tags = {
    Name      = "${local.environment}-rocko_backend"
    ManagedBy = "terraform"
  }

}

