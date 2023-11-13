terraform {
  backend "remote" {
    hostname     = "rocko.scalr.io"
    organization = "env-v0o37uj8gft0ltib3"
    workspaces {
      name = "Site-us-east-1"
    }
  }
}

