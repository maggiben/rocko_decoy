data "aws_iam_policy_document" "aws_billing_policy" {
  statement {
    sid     = "VisualEditor0"

    actions = [
        "aws-portal:ViewBilling",
        "aws-portal:ViewUsage",
        "aws-portal:ViewPaymentMethods",
        "aws-portal:ViewAccount"
    ]

    resources = [
      "*"
    ]

   effect = "Allow"
  }
}

resource "aws_iam_policy" "aws_billing_policy" {
  name        = "aws_billing_policy"
  path        = "/"

  policy = data.aws_iam_policy_document.aws_billing_policy.json
}

resource "aws_iam_group_policy_attachment" "aws_billing_policy_attachment" {
  group      = aws_iam_group.admin.name
  policy_arn = aws_iam_policy.aws_billing_policy.arn
}

