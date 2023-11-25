from datetime import datetime
from modules import db
import os
import time

DB_CONFIG = {
    'host': os.environ.get('ROCKO_DB_HOST'),
    'user': os.environ.get('ROCKO_DB_USER'),
    'passwd': os.environ.get('ROCKO_DB_PASSWORD'),
    'database': os.environ.get('ROCKO_DB_DATABASE')
}

def get_user_email_from_loan_id(loan_id):
  # This method gets the user email from the loan id number
  # This shoudl be a user_id, not the email so fix when the table
  # structure is fixed.
  sql = "SELECT user FROM loans WHERE id=%s"
  row = db.get_query_data_single(DB_CONFIG, sql, [ loan_id ])

  if row:
    return row[0]
  else:
    return None

