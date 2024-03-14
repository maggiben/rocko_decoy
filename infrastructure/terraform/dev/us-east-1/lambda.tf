resource "aws_cloudwatch_event_rule" "lambda_every_1_minute" {
  name                = "lambda-every-1-minute"
  description         = "Fires every 1 minute"
  schedule_expression = "rate(1 minute)"
}

resource "aws_cloudwatch_event_rule" "lambda_every_5_minutes" {
  name                = "lambda-every-5-minutes"
  description         = "Fires every 5 minutes"
  schedule_expression = "rate(5 minutes)"
}

resource "aws_cloudwatch_event_rule" "lambda_every_24_hours" {
  name                = "lambda-every-24-hours"
  description         = "Fires every 24 hours at midnight"
  schedule_expression = "cron(0 0 * * ? *)"
}
