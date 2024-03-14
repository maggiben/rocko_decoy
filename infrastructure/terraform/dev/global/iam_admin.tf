resource "aws_iam_group" "admin" {
  name = "admin"
  path = "/"
}

resource "aws_iam_group_policy_attachment" "admin-attach" {
  group      = aws_iam_group.admin.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_group_membership" "admin-membership" {
  name = "admin-membership"

  users = [
    aws_iam_user.vince.name,
    aws_iam_user.scalr_deploy.name,
  ]

  group = aws_iam_group.admin.name
}

