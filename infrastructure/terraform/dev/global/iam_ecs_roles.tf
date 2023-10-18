#
# ECS execution role
#

#
# Role
#
resource "aws_iam_role" "ecs_instance_role" {
  name               = "ecs_instance_role"
  assume_role_policy = data.aws_iam_policy_document.ecs_instance_role_assume_role.json
}

#
# Policy Data
#
data "aws_iam_policy" "ecs_instance_service_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

data "aws_iam_policy" "ec2_instance_service_policy" {
  arn = "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
}

data "aws_iam_policy_document" "ecs_instance_role_assume_role" {
  statement {
    sid     = "VisualEditor0"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com", "ecs-tasks.amazonaws.com", "ecs.amazonaws.com", "lambda.amazonaws.com", "states.amazonaws.com"]
    }

    effect = "Allow"
  }
}

# This policy defines the runtime policy
data "aws_iam_policy_document" "ecs_instance_policy" {
  statement {
    sid    = "VisualEditor0"
    effect = "Allow"

    actions = [
      "ssm:DescribeParameters",
      "ec2:DescribeVpcs",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:BatchGetItem",
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage"

    ]

    resources = [
      "*"
    ]
  }

  statement {
    sid    = "VisualEditor1"
    effect = "Allow"

    actions = [

      "flogs:CreateLogStream",
      "logs:PutLogEvents"

    ]

    resources = [
      "arn:aws:logs:${local.region}:${local.account_id}:log-group:/aws/lambda/*"
    ]
  }

  statement {
    sid    = "VisualEditor2"
    effect = "Allow"

    actions = [
      "secretsmanager:GetSecretValue",
      "ssm:GetParametersByPath",
      "ssm:GetParameters",
      "ssm:GetParameter"
    ]

    resources = [
      "arn:aws:secretsmanager:${local.region}:${local.account_id}:secret:rocko*",
      "arn:aws:ssm:${local.region}:${local.account_id}:parameter/rocko*"
    ]
  }

  statement {
    sid    = "VisualEditor3"
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup"
    ]

    resources = [
      "arn:aws:logs:${local.region}:${local.account_id}:*"
    ]
  }

  statement {
    sid    = "VisualEditor4"
    effect = "Allow"

    actions = [
      "ec2:CreateNetworkInterface",
      "ec2:DescribeNetworkInterfaces",
      "ec2:DeleteNetworkInterface",
      "iam:PassRole",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:UpdateItem",
      "route53:ChangeResourceRecordSets",
      "ses:SendEmail"
    ]

    resources = [
      "*"
    ]
  }

  statement {
    sid    = "StepFunctionsAndLambdaExecute"
    effect = "Allow"

    actions = [
      "states:StartExecution",
      "states:SendTaskSuccess",
      "lambda:InvokeFunction"
    ]

    resources = [
      "*"
    ]
  }

}

#
# Policies
#
resource "aws_iam_policy" "ecs_instance_policy" {
  name   = "ecs_instance_policy"
  policy = data.aws_iam_policy_document.ecs_instance_policy.json
}

#
# Policy Attachments
#

resource "aws_iam_role_policy_attachment" "ecs_instance_role" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = data.aws_iam_policy.ecs_instance_service_policy.arn
}

resource "aws_iam_role_policy_attachment" "ecs_instance_role2" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = aws_iam_policy.ecs_instance_policy.arn
}

resource "aws_iam_role_policy_attachment" "ecs_instance_role3" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = data.aws_iam_policy.ec2_instance_service_policy.arn
}
resource "aws_iam_role_policy_attachment" "ecs_instance_role4" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

#
# Instance Profiles
#
resource "aws_iam_instance_profile" "ecs_instance_role" {
  name = "ecs_instance_role-profile"
  role = aws_iam_role.ecs_instance_role.name
}
