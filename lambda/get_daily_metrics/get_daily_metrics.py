#!/usr/bin/env python3

# Required env variables
# DATABASE_HOST:       Database host
# DATABASE_USER:       Database user
# DATABASE_PASS:       Database password
# DATABASE_DB:         Database database

import logging
import mysql.connector
import os
import sys
import traceback
import datetime

logging.debug("magic")
logger = logging.getLogger('log')
logger.setLevel(logging.DEBUG)

for v in ['DATABASE_HOST', 'DATABASE_USER', 'DATABASE_PASS', 'DATABASE_DB']:
  if not os.environ.get(v):
    logger.error(f"Error, environment variable {v} is required.")
    sys.exit(255)

DB_CONFIG = {
    'host': os.environ.get('DATABASE_HOST'),
    'user': os.environ.get('DATABASE_USER'),
    'passwd': os.environ.get('DATABASE_PASS'),
    'database': os.environ.get('DATABASE_DB')
}

def handler_inner(event, context):
  current_time = datetime.datetime.now()

  total_outstanding_balance = 0
  total_active_loans = 0
  total_active_borrowers = 0
  metrics_date = current_time.strftime("%Y-%m-%d") # 2024-02-20
  create_time = current_time.strftime("%Y-%m-%d %H:%M:%S") # 2024-02-20 23:49:44

  # TODO fetch and calculate metrics

  # Put together SQL statement
  sql = "INSERT INTO daily_metrics (total_outstanding_balance, total_active_loans, total_active_borrowers, metrics_date, create_time) VALUES ("
  sql += f"{total_outstanding_balance}, {total_active_loans}, {total_active_borrowers}, {metrics_date}, {create_time})"

  logger.debug(sql)

  conn = mysql.connector.connect(**DB_CONFIG)
  cursor = conn.cursor()

  cursor.execute(sql)
  conn.commit()

  cursor.close()
  conn.close()

  return True

def lambda_handler(event, context):
    try:
        return handler_inner(event, context)
    except Exception:
        logger.error(
            f"Lambda failed with exception: {traceback.format_exc()}, event: {event}")
    return True

if __name__ == "__main__":
    lambda_handler(None, None)

