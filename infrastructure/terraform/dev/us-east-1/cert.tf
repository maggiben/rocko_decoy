module "rocko-cert" {
  source = "../../modules/rocko-cert"

  zone_id     = aws_route53_zone.rocko_cloud.id
  environment = local.environment
  domain      = local.domain
  subdomain   = local.subdomain
}
