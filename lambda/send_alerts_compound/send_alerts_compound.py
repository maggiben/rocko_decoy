#!/usr/bin/env python3

# Get all alerts that are turned on (active) and loop through
# and gauge which alerts should fire
# This script deals with compound alerts only

# Required env variables
# DATABASE_HOST:    Database host
# DATABASE_USER:    Database user
# DATABASE_PASS:    Database password
# DATABASE_DB:      Database database
# SENDGRID_API_KEY: Sendgrid API Key
# PROVIDER:         quicknode url
# COMET_CONTRACT:   Comet contract for COMP
# WETH_CONTRACT:    wETH contract for COMP

import json
import os
import sys
import traceback

from modules import alerts
from modules import common
from modules import db
from modules import logger
from modules import send_sms
from modules import send_email

LOGGER = logger.create_logger(level='INFO')

for v in ['DATABASE_HOST', 'DATABASE_USER', 'DATABASE_PASS', 'DATABASE_DB', 'SENDGRID_API_KEY', 'PROVIDER', 'COMET_CONTRACT', 'WETH_CONTRACT']:
  if not os.environ.get(v):
    LOGGER.error(f"Error, environment variable {v} is required.")
    sys.exit(255)

DB_CONFIG = {
    'host': os.environ.get('DATABASE_HOST'),
    'user': os.environ.get('DATABASE_USER'),
    'passwd': os.environ.get('DATABASE_PASS'),
    'database': os.environ.get('DATABASE_DB')
}

def process_alert(row):

  # Is alert triggered
  if  row[2].lower() == "apr":
    LOGGER.info(f"Processing APR alert for alert id {row[0]}, loan id {row[1]}")
    alert_template = "alert_apr"
    alert_message = "APR Alert: Threshold reached"
    alert_triggered = alerts.apr_alert_triggered(row[0], row[1], row[3], row[4], LOGGER)
    LOGGER.debug(f"Alert triggered: {alert_triggered}")
  elif row[2].lower() == "collateral":
    LOGGER.info(f"Processing Collateral alert for alert id {row[0]}, loan id {row[1]}")
    alert_template = "alert_collateral_buffer"
    alert_message = "Collateral Alert: Threshold reached"
    alert_triggered = alerts.collateral_alert_triggered(DB_CONFIG, row[0], row[1], row[3], row[4], LOGGER)
    LOGGER.debug(f"Alert triggered: {alert_triggered}")
  else:
    LOGGER.error(f"Error, unrecognized alert type {row[2]}")
    return False

  # Does the database think the alert is triggered?
  alert_db_triggered = alerts.check_database_for_trigger(row[0], LOGGER)

  # Let's go through states
  if alert_triggered and not alert_db_triggered:
    # Alert is triggered for the first time
    # Alert is triggered but we have not updated the database yet

    # Send alert
    common.send_alert(common.parse_email_template(alert_template, row[3], {'THRESHOLD': str(row[4])}, LOGGER), row[5], row[6], row[1], LOGGER)

    # Delete alert to if its set to only fire once
    if row[8]:
      sql = "DELETE FROM alerts WHERE id=%s"
      db.insert_query(DB_CONFIG, sql, [ row[0] ])

    # Update alerts that its triggered
    sql = "UPDATE alerts SET triggered=true, triggered_time=now() WHERE id=%s"
    db.insert_query(DB_CONFIG, sql, [ row[0] ])

    # Log to audit table
    sql = "INSERT INTO audit_log (message, metadata) VALUES (%s, %s)"
    db.insert_query(DB_CONFIG, sql, [ f"Alert state changed to triggered for alert {row[0]}",  json.dumps({ "program": "send_alerts_compound"})])


  elif alert_triggered and alert_db_triggered:
    # Alert is triggered and we're aware of it
    # We'll need to check to see if its time to re-alert

    # See if its time to re-fire the alert
    # If so, send the alert
    fire_alert = alerts.fire_notification(DB_CONFIG, row[0], row[7], LOGGER)
    LOGGER.debug(f"FIRE ALERT: {fire_alert}") 

    if fire_alert:
      # Retrigger an alert and log it
      common.send_alert(common.parse_email_template(alert_template, row[3], {'THRESHOLD': str(row[4])}, LOGGER), row[5], row[6], row[1], LOGGER)
      # Update alerts that its triggered
      sql = "UPDATE alerts SET triggered_time=now() WHERE id=%s"
      db.insert_query(DB_CONFIG, sql, [ row[0] ])

      # Log to audit table
      sql = "INSERT INTO audit_log (message, metadata) VALUES (%s, %s)"
      db.insert_query(DB_CONFIG, sql, [ f"Alert notifiation retry sent for alert {row[0]}",  json.dumps({ "program": "send_alerts_compound"})])

  elif not alert_triggered and alert_db_triggered:
    # Alert is not triggering but the db thinks it should be
    # Alert has cleared, we need to reset the db and send an all clear

    # Clear the db of the trigger
    LOGGER.info(f"Clearing alert {row[0]}")
    sql = "UPDATE alerts SET triggered=false, triggered_time=NULL WHERE id=%s"
    db.insert_query(DB_CONFIG, sql, [ row[0] ])

    # Send the user an all clear message if we want to

    # Log to audit table
    sql = "INSERT INTO audit_log (message, metadata) VALUES (%s, %s)"
    db.insert_query(DB_CONFIG, sql, [ f"Alert state changed to clear for alert {row[0]}",  json.dumps({ "program": "send_alerts_compound"})])


  elif not alert_triggered and not alert_db_triggered:
    # Alert is not triggered and the db thinks so
    # We dont need to do anything here
    return True


def handler_inner(event, context):
  # Get all alerts that are turned on (active) and loop through
  # and gauge which alerts should fire
  sql = "SELECT id, loan_id, alert_type, alert_metric, alert_threshold, alert_email, alert_phone, alert_repeat_secs, alert_once FROM alerts WHERE active=1 ORDER BY id desc"
  LOGGER.debug(sql)
  rows = db.get_query_data(DB_CONFIG, sql, [])

  for row in rows:
    LOGGER.info("")

    process_alert(row)


def lambda_handler(event, context):
    try:
        return handler_inner(event, context)
    except Exception:
        LOGGER.error(
            f"Lambda failed with exception: {traceback.format_exc()}, event: {event}")
    return True

if __name__ == "__main__":
    lambda_handler(None, None)

