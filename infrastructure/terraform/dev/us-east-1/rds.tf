module "rocko-db01" {
  source = "../../modules/rocko-db"

  rds_instance_name = "rockodb01"
  rds_password      = "12345678"
  rds_instance_size = "db.t3.small"

  db_subnets             = ["subnet-0ac077bc04b2da14f", "subnet-0a20caa04d50523af", "subnet-00564f1ca7259a951", "subnet-0b3ae250c8f48e542", "subnet-0a7891544a8a6f954", "subnet-0285cdc7db8849186"]
  default_security_group = "sg-04a63b565a99740d9"
}

