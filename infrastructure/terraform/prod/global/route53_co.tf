resource "aws_route53_zone" "rocko_co" {
  name          = "rocko.co"
  comment       = "Managed by Terraform"
  force_destroy = false
  tags = {
    Name      = "rocko.co"
    ManagedBy = "terraform"
  }
}

resource "aws_route53_record" "rocko_co_root" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = ""
  type    = "A"
  ttl     = 60
  records = ["75.2.60.5"]
}

resource "aws_route53_record" "rocko_co_www" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = "www"
  type    = "CNAME"
  ttl     = 60
  records = ["rocko.co."]
}

resource "aws_route53_record" "rocko_co_app" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = "app"
  type    = "CNAME"
  ttl     = 60
  records = ["get-rocko-0x7f3f368defb751b7401b5f6d8.netlify.app."]
}

resource "aws_route53_record" "rocko_co_mx" {
  zone_id = aws_route53_zone.rocko_co.zone_id
  name = ""
  type = "MX"
  ttl = 60

  records = [
    "1 aspmx.l.google.com.",
    "5 alt1.aspmx.l.google.com.",
    "5 alt2.aspmx.l.google.com.",
    "10 alt3.aspmx.l.google.com.",
    "10 alt4.aspmx.l.google.com."
  ]
}

resource "aws_route53_record" "rocko_co_root_spf" {
  zone_id = aws_route53_zone.rocko_co.zone_id
  name = ""
  type = "TXT"
  ttl = 60
  records = [ "v=spf1 include:dc-aa8e722993._spfm.rocko.co ~all"]
}

resource "aws_route53_record" "rocko_co_dc-aa8e722993_spf" {
  zone_id = aws_route53_zone.rocko_co.zone_id
  name = "dc-aa8e722993._spfm"
  type = "TXT"
  ttl = 60
  records = [ "v=spf1 include:_spf.google.com ~all"]
}

resource "aws_route53_record" "rocko_co_google_verify" {
  zone_id = aws_route53_zone.rocko_co.zone_id
  name = "rocko.co."
  type = "TXT"
  ttl = 60
  records = [ "google-site-verification=wJ0Bk589kUCjm10h74e1gK-jSObBotuBxDJAtS_Fyew"]
}

resource "aws_route53_record" "rocko_co_test_app" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = "*.test.app"
  type    = "CNAME"
  ttl     = 60
  records = ["get-rocko-0x7f3f368defb751b7401b5f6d8.netlify.app"]
}

resource "aws_route53_record" "rocko_co_testnet" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = "*.testnet"
  type    = "CNAME"
  ttl     = 60
  records = ["get-rocko-0x7f3f368defb751b7401b5f6d8.netlify.app."]
}

#
# Sendgrid configuration
#
resource "aws_route53_record" "rocko_co_url3269" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = "url3269"
  type    = "CNAME"
  ttl     = 60
  records = ["sendgrid.net"]
}

resource "aws_route53_record" "rocko_co_39066360" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = "39066360"
  type    = "CNAME"
  ttl     = 60
  records = ["sendgrid.net"]
}

resource "aws_route53_record" "rocko_co_em3975" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = "em3975"
  type    = "CNAME"
  ttl     = 60
  records = ["u39066360.wl111.sendgrid.net"]
}

resource "aws_route53_record" "rocko_co_s1_domainkey" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = "s1._domainkey"
  type    = "CNAME"
  ttl     = 60
  records = ["s1.domainkey.u39066360.wl111.sendgrid.net"]
}

resource "aws_route53_record" "rocko_co_s2_domainkey" {
  zone_id = aws_route53_zone.rocko_co.id
  name    = "s2._domainkey"
  type    = "CNAME"
  ttl     = 60
  records = ["s2.domainkey.u39066360.wl111.sendgrid.net"]
}

