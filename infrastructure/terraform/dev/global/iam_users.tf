resource "aws_iam_user" "vince" {
  name = "vince"
  path = "/"
}

resource "aws_iam_access_key" "vince" {
  user = aws_iam_user.vince.name
}

resource "aws_iam_user" "thomas" {
  name = "thomas"
  path = "/"
}

resource "aws_iam_access_key" "thomas" {
  user = aws_iam_user.thomas.name
}

resource "aws_iam_user" "scalr_deploy" {
  name = "scalr_deploy"
  path = "/"
}

resource "aws_iam_access_key" "scalr_deploy" {
  user = aws_iam_user.scalr_deploy.name
}

