resource "aws_iam_user" "vince" {
  name = "vince"
  path = "/"
}

resource "aws_iam_user" "scalr_deploy" {
  name = "scalr_deploy"
  path = "/"
}

resource "aws_iam_access_key" "scalr_deploy" {
  user = aws_iam_user.scalr_deploy.name
}

