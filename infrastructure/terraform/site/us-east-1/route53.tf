resource "aws_route53_zone" "rocko_cloud" {
  name          = local.subdomain
  comment       = "Managed by Terraform"
  force_destroy = false
  tags = {
    Name      = local.subdomain
    ManagedBy = "terraform"
  }
}
