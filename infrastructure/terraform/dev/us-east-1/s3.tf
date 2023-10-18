module "s3_remote_bucket" {
  source = "../../modules/s3_private_bucket"
  name   = "rocko-835780150279-terraform-state-us-east-1"
}

module "s3_logs_bucket" {
  source = "../../modules/s3_private_bucket"
  name   = "rocko-835780150279-logs-us-east-1"
}


