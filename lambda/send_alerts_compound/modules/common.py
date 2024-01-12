import os
import yaml

from modules import db
from modules import send_email
from modules import send_sms

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
    send_email.send_email_alert(alert_email_address, email_message)

  elif send_to_phone:
    alert_phone_number = get_user_phone_from_loan_id(loan_id)
    logger.debug(f"Sending alert to {alert_phone_number}")
    send_sms.send_sms_alert(alert_phone_number, "Test SMS Alert from Rocko")
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
  sql = "SELECT user_id FROM loans WHERE id=%s"
  loan_row = db.get_query_data_single(DB_CONFIG, sql, [ loan_id ])

  if loan_row:
    sql = "SELECT email FROM users WHERE id=%s"
    user_row = db.get_query_data_single(DB_CONFIG, sql, [ loan_row[0] ])

    return user_row[0]

  else:
    return None
  
def get_user_phone_from_loan_id(loan_id):
  # This method gets the user phone from the loan id number
  sql = "SELECT user_id FROM loans WHERE id=%s"
  loan_row = db.get_query_data_single(DB_CONFIG, sql, [ loan_id ])

  if loan_row:
    sql = "SELECT phone FROM users WHERE id=%s"
    user_row = db.get_query_data_single(DB_CONFIG, sql, [ loan_row[0] ])

    return user_row[0]

  else:
    return None
