from datetime import datetime
from modules import db
import os
import time

DB_CONFIG = {
    'host': os.environ.get('DATABASE_HOST'),
    'user': os.environ.get('DATABASE_USER'),
    'passwd': os.environ.get('DATABASE_PASS'),
    'database': 'rocko_develop'
}

DB_CONFIG_MAIN = {
    'host': os.environ.get('DATABASE_HOST'),
    'user': os.environ.get('DATABASE_USER'),
    'passwd': os.environ.get('DATABASE_PASS'),
    'database': 'rocko_main'
}

def get_eth_price():
  # This method gets the eth price from the pricing_data table from production
  sql = "SELECT usd_price FROM pricing_data WHERE symbol=%s ORDER BY id desc LIMIT 1"
  row = db.get_query_data_single(DB_CONFIG_MAIN, sql, [ 'ETH' ])

  if row:
    return row[0]
  else:
    return None

def get_collateral_factor():
  # This method gets the eth price from the pricing_data table from production
  sql = "SELECT borrow_collateral_factor FROM asset_data WHERE lending_protocol='compound' AND protocol_version=3 ORDER BY id desc LIMIT 1"
  row = db.get_query_data_single(DB_CONFIG, sql, [])

  if row:
    return row[0]
  else:
    return None


