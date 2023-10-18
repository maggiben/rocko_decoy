locals {
  region      = data.aws_region.current.name
  account_id  = data.aws_caller_identity.current.account_id
  environment = "dev"
  domain      = "rocko.cloud"
  subdomain   = "dev.rocko.cloud"

  #  ecs_rocko_backend_image = "835780150279.dkr.ecr.us-east-1.amazonaws.com/rocko_backend:dev_latest"
}
