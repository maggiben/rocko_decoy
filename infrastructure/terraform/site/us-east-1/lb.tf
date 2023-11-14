module "rocko_lb_backend" {
  source = "../../modules/rocko-lb"

  hostname     = "backend"
  environment  = local.environment
  region       = local.region
  vpc_id       = data.aws_vpc.dev-infrastructure-vpc.id
  subnet1_id   = data.aws_subnet.public-subnet1.id
  subnet2_id   = data.aws_subnet.public-subnet2.id
  zone_id      = aws_route53_zone.rocko_cloud.id
  cert_arn     = module.rocko-cert.cert_arn
  idle_timeout = 600
}
