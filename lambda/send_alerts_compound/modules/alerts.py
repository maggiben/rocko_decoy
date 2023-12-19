from datetime import datetime

from modules import db
from modules import eth
from modules import send_email
from modules import send_sms

import os
import time

DB_CONFIG = {
    'host': os.environ.get('DATABASE_HOST'),
    'user': os.environ.get('DATABASE_USER'),
    'passwd': os.environ.get('DATABASE_PASS'),
    'database': os.environ.get('DATABASE_DB')
}

def get_current_compound_apr():
  # This method gets the current APR from our APR table
  sql = "SELECT borrow_apr, fetch_time FROM asset_data WHERE lending_protocol = 'compound' and protocol_version=3 ORDER BY fetch_time desc LIMIT 1"
  row = db.get_query_data_single(DB_CONFIG, sql, [])
  # Make sure data is not over 5 hours old
  current_apr = row[0] * 100
  fetch_time = row[1]

  # Make sure data is not over 5 hours old
  current_time_unix = int(time.strftime("%s", time.gmtime(int(time.time()))))
  alert_time_unix = int(fetch_time.timestamp())

  if (current_time_unix - alert_time_unix) > (3600 * 5):
    return None

  return current_apr


def apr_alert_triggered(alert_id, loan_id, metric, threshold, logger):
  # Check to see if alert is firing

  # Get the current apr
  current_apr = get_current_compound_apr()
  if not current_apr:
    logger.error("Error getting compound APR from database")
    return False

  logger.debug(f"Metric      : {metric}")
  logger.debug(f"Current APR : {current_apr}")
  logger.debug(f"Threshold   : {threshold}")

  # See if we're within threshold of the alert
  if metric.lower() == "below":
    if float(threshold) > float(current_apr):
      return True
  elif metric.lower() == "above":
    if float(threshold) < float(current_apr):
      return True
  else:
    logger.error("Error, metric is not expected value")

  return False


def collateral_alert_triggered(db_config, alert_id, loan_id, metric, threshold, logger):
  # Get the current loan information
  sql = "SELECT user_id, lending_protocol, collateral, outstanding_balance FROM loans WHERE id=%s"
  logger.debug(f"{sql} - [ {loan_id} ]")
  row = db.get_query_data_single(db_config, sql, [ loan_id ])

  if row[1].lower() == "compound":
    # Get the users wallet address
    sql = "SELECT wallet_address FROM users WHERE id=%s"
    row2 = db.get_query_data_single(db_config, sql, [ row[0] ])
    user_wallet = row2[0]

    # Get the current ETH price
    eth_price = eth.get_eth_price()
    borrow_collateral_factor = eth.get_collateral_factor()
    collateral = eth.get_collateral_from_transaction(user_wallet)

    # Get the loan amount in USD
    usd_loan_amount = row[3]

    if not usd_loan_amount:
      # There is nothing owed on this loan
      return False

    # Calculate the collateral buffer percentage
    min_collateral = float(usd_loan_amount) / borrow_collateral_factor / eth_price
    collateral_buffer_percentage = (collateral - min_collateral) / min_collateral * 100

    logger.debug(f"Metric     : {metric}")
    logger.debug(f"ETH Price  : {eth_price}")
    logger.debug(f"ETH Amount : {collateral}")
    logger.debug(f"ETH Total  : {eth_price * collateral}")
    logger.debug(f"USDC Total : {usd_loan_amount}")
    logger.debug(f"Min Collateral : {min_collateral}")
    logger.debug(f"Collateral Percentage : {collateral_buffer_percentage}")
    logger.debug(f"Threshold: {threshold}")

    # See if we're within threshold of the alert
    if metric.lower() == "below":
      if float(threshold) > float(collateral_buffer_percentage):
        return True
    elif metric.lower() == "above":
      if float(threshold) < float(collateral_buffer_percentage):
        return True
    else:
      logger.error("Error, metric is not expected value")

  return False


def fire_notification(db_config, alert_id, repeat_secs, logger):
  # Check the interval table to see if we need to alert on this alert
  # If nothing exists, we have not fired the alert yet
  current_time_unix = int(time.time())
 
  # See if this alert is in the active_alerts table
  sql = "SELECT triggered_time FROM alerts WHERE id=%s"
  logger.debug(f"{sql} - [{alert_id}]")
  row = db.get_query_data_single(db_config, sql, [ alert_id ])

  # We need to calculate whether we're over the repeat time
  current_time = int(time.strftime("%s", time.gmtime(int(time.time()))))
  trigger_time = int(row[0].strftime('%s'))

  logger.debug(f"Repeat secs: {repeat_secs} - difference: {current_time - trigger_time}")
  if current_time - trigger_time > repeat_secs:
    logger.info("Repeat time has passed, return true")
    return True

  return False
 

def check_database_for_trigger(alert_id, logger):
  sql = "SELECT triggered, triggered_time FROM alerts WHERE id=%s"
  logger.debug(f"{sql} - [{alert_id}]")
  row = db.get_query_data_single(DB_CONFIG, sql, [ alert_id ])

  if row[0] == True:
    return True

  return False

