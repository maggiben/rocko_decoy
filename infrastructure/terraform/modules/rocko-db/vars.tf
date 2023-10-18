variable "rds_password" {}
variable "rds_instance_size" {}
variable "rds_instance_name" {}
variable "db_subnets" { type = list(string) }
variable "default_security_group" {}
