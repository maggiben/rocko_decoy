resource "aws_db_subnet_group" "subnet-group" {
  name       = "db-subnet-group"
  subnet_ids = var.db_subnets
}

resource "aws_db_instance" "rocko-database" {
  db_name             = var.rds_instance_name
  identifier          = var.rds_instance_name
  allocated_storage   = 20
  storage_type        = "gp2"
  engine              = "mysql"
  engine_version      = "8.0"
  publicly_accessible = true
  max_allocated_storage = 0
  deletion_protection = true
  iam_database_authentication_enabled = false

  instance_class         = var.rds_instance_size
  skip_final_snapshot    = true
  storage_encrypted      = true
  monitoring_interval    = 0
  username               = "admin"
  password               = var.rds_password
  vpc_security_group_ids = [var.default_security_group]
  db_subnet_group_name   = aws_db_subnet_group.subnet-group.id
  enabled_cloudwatch_logs_exports = [ "error" ]
  backup_retention_period     = 7
  multi_az = true
  apply_immediately = true

  tags = {
    Name      = "rocko"
    ManagedBy = "terraform"
  }

  lifecycle {
    ignore_changes = [password]
  }
}
