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
    metrics_date = current_time.strftime("%Y-%m-%d")  # 2024-02-20
    create_time = current_time.strftime("%Y-%m-%d %H:%M:%S")  # 2024-02-20 23:49:44

    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    try:
        # Fetch the count of unique active borrowers
        sql_active_borrowers = "SELECT COUNT(DISTINCT user_id) AS total_active_borrowers FROM loans WHERE loan_active = 1"
        cursor.execute(sql_active_borrowers)
        result = cursor.fetchone()
        total_active_borrowers = result[0] if result else 0

        # Fetch the total number of active loans
        sql_active_loans = "SELECT COUNT(*) AS total_active_loans FROM loans WHERE loan_active = 1"
        cursor.execute(sql_active_loans)
        result = cursor.fetchone()
        total_active_loans = result[0] if result else 0

        # Fetch the total outstanding balance for active loans
        sql_total_balance = "SELECT COALESCE(SUM(outstanding_balance), 0) AS total_outstanding_balance FROM loans WHERE loan_active = 1"
        cursor.execute(sql_total_balance)
        result = cursor.fetchone()
        total_outstanding_balance = result[0]

        # Put together the SQL statement to insert metrics
        sql_insert = "INSERT INTO daily_metrics (total_outstanding_balance, total_active_loans, total_active_borrowers, metrics_date, create_time) VALUES (%s, %s, %s, %s, %s)"
        values = (total_outstanding_balance, total_active_loans, total_active_borrowers, metrics_date, create_time)
        cursor.execute(sql_insert, values)
        conn.commit()

    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        raise

    finally:
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

