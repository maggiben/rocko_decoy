import os
import yaml

from modules import db
from modules import send_email

DB_CONFIG = {
    'host': os.environ.get('DATABASE_HOST'),
    'user': os.environ.get('DATABASE_USER'),
    'passwd': os.environ.get('DATABASE_PASS'),
    'database': 'rocko_develop'
}

def send_alert(email_message, send_to_email, send_to_phone, loan_id, logger):

  if send_to_email:
    alert_email_address = get_user_email_from_loan_id(loan_id)
    logger.debug(f"Sending alert to {alert_email_address}")
    send_email.send_email_alert(alert_email_address, email_message, logger)

  elif send_phone:
    logger.error("Sending to phone is currently not supported!")
  else:
    logger.error("Invalid message alert type")

  return True


def parse_email_template(template_file, threshold, vars_to_replace, LOGGER):
  with open(f"templates/{template_file}_{threshold.lower()}.yaml", 'r') as file:
    email_config = yaml.safe_load(file)

  # Accessing the email template details
  subject = email_config['email_template']['subject']
  sender = email_config['email_template']['from']
  body = email_config['email_template']['body']

  for v in vars_to_replace:
    subject = subject.replace(f"[[{v}]]", vars_to_replace[v])
    body = body.replace(f"[[{v}]]", vars_to_replace[v])

  return (sender, subject, body)


def get_user_email_from_loan_id(loan_id):
  # This method gets the user email from the loan id number
  # This shoudl be a user_id, not the email so fix when the table
  # structure is fixed.
  sql = "SELECT user FROM loans WHERE id=%s"
  loan_row = db.get_query_data_single(DB_CONFIG, sql, [ loan_id ])

  if loan_row:
    sql = "SELECT email FROM users WHERE id=%s"
    user_row = db.get_query_data_single(DB_CONFIG, sql, [ loan_row[0] ])

    return user_row[0]

  else:
    return None
