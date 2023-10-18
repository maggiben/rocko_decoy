variable "environment" {}
variable "region" {}
variable "hostname" {}
variable "vpc_id" {}
variable "subnet1_id" {}
variable "subnet2_id" {}
variable "zone_id" {}
variable "cert_arn" {}
variable "healthcheck_uri" { default = "/healthcheck" }
variable "idle_timeout" { default = 60 }
