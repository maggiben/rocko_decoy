resource "aws_cloudwatch_event_rule" "lambda_every_5_minutes" {
  name                = "lambda-every-5-minutes"
  description         = "Fires every 5 minutes"
  schedule_expression = "rate(5 minutes)"
}
