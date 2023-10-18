resource "aws_iam_user" "jcamp" {
  name = "jcamp"
  path = "/"
}

resource "aws_iam_access_key" "jcamp" {
  user = aws_iam_user.jcamp.name
}

resource "aws_iam_user" "vince" {
  name = "vince"
  path = "/"
}

resource "aws_iam_access_key" "vince" {
  user = aws_iam_user.vince.name
}

resource "aws_iam_user" "scalr_deploy" {
  name = "scalr_deploy"
  path = "/"
}

resource "aws_iam_access_key" "scalr_deploy" {
  user = aws_iam_user.scalr_deploy.name
}

