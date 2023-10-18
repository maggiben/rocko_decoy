resource "aws_route53_record" "rocko_lb" {
  zone_id = var.zone_id
  name    = var.hostname
  type    = "CNAME"
  ttl     = "5"
  records = [aws_lb.rocko_lb.dns_name]
}

