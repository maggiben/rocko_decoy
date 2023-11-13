resource "aws_ecs_cluster" "rocko" {
  name = "${local.environment}-rocko"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name      = "rocko"
    ManagedBy = "terraform"
  }
}

resource "aws_security_group" "rocko-ecs" {
  name        = "${local.environment}-rocko-ecs-security-group"
  description = "Rocko ECS SG"
  vpc_id      = module.rocko-vpc-dev.infrastructure-vpc-id

  tags = {
    Name      = "${local.environment}-rocko_ecs"
    ManagedBy = "terraform"
  }
}

resource "aws_security_group_rule" "ecs_public_out" {
  type        = "egress"
  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = aws_security_group.rocko-ecs.id
}

resource "aws_security_group_rule" "ecs_internal_ecs" {
  type              = "ingress"
  from_port         = 5000
  to_port           = 5000
  protocol          = "tcp"
  cidr_blocks       = ["10.0.0.0/8"]
  security_group_id = aws_security_group.rocko-ecs.id
}

