locals {
  region      = data.aws_region.current.name
  environment = "prod"
  domain      = "rocko.cloud"
  subdomain   = "prod.rocko.cloud"
}
