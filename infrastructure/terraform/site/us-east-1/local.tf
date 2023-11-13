locals {
  region      = data.aws_region.current.name
  environment = "site"
  domain      = "rocko.cloud"
  subdomain   = "site.rocko.cloud"

  ecs_rocko_backend_image = "835780150279.dkr.ecr.us-east-1.amazonaws.com/rocko_backend:dev_latest"

  backend_url = "https://backend.site.rocko.cloud"
  client_url  = "https://rocko.site"
}
