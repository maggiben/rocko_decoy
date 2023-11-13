resource "aws_route53_zone" "rocko_cloud" {
  name          = "rocko.cloud"
  comment       = "Managed by Terraform"
  force_destroy = false
  tags = {
    Name      = "rocko.cloud"
    ManagedBy = "terraform"
  }
}

resource "aws_route53_record" "rocko_dev_ns" {
  zone_id = aws_route53_zone.rocko_cloud.id
  type    = "NS"
  ttl     = "60"
  name    = "dev.rocko.cloud"
  records = [
    "ns-1069.awsdns-05.org.",
    "ns-278.awsdns-34.com.",
    "ns-805.awsdns-36.net.",
    "ns-1597.awsdns-07.co.uk."
  ]
}

resource "aws_route53_record" "rocko_site_ns" {
  zone_id = aws_route53_zone.rocko_cloud.id
  type    = "NS"
  ttl     = "60"
  name    = "site.rocko.cloud"
  records = [
    "ns-1872.awsdns-42.co.uk.",
    "ns-339.awsdns-42.com.",
    "ns-760.awsdns-31.net.",
    "ns-1326.awsdns-37.org."
  ]
}
