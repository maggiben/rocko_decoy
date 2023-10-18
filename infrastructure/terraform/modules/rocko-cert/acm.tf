#
# Rocko Cert
#
resource "aws_acm_certificate" "rocko_cert" {
  domain_name       = var.subdomain
  validation_method = "DNS"

  subject_alternative_names = [
    "*.${var.subdomain}"
  ]

  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Name      = "${var.environment}-rocko"
    ManagedBy = "terraform"
  }
}

resource "aws_route53_record" "rocko_cert_validation" {
  allow_overwrite = true

  for_each = {
    for dvo in aws_acm_certificate.rocko_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
    # Skips the domain if it doesn't contain a wildcard
    if length(regexall("\\*\\..+", dvo.domain_name)) > 0
  }

  name    = each.value.name
  records = [each.value.record]
  type    = each.value.type
  zone_id = var.zone_id
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert-validation" {
  certificate_arn         = aws_acm_certificate.rocko_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.rocko_cert_validation : record.fqdn]

}

