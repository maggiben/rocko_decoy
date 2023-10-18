locals {
  region      = data.aws_region.current.name
  environment = "dev"
  domain      = "rocko.cloud"
  subdomain   = "dev.rocko.cloud"

  ecs_rocko_backend_image = "835780150279.dkr.ecr.us-east-1.amazonaws.com/rocko_backend:dev_latest"

  backend_url = "https://backend.dev.rocko.cloud"
  client_url  = "https://app.rocko.co"
}
