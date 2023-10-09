#!/usr/bin/env python3

# This script will get pricing from Coinmarketcap
# And store it in the database

# Required env variables
# CMC_API_KEY:   Coinmarketcap API key
# SYMBOLS:       Comma delimited list of symbols to collect
# DATABASE_HOST: Database host
# DATABASE_USER: Database user
# DATABASE_PASS: Database password
# DATABASE_DB:   Database database

import logging
import json
import mysql.connector
import os
from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import traceback

logging.debug("magic")
logger = logging.getLogger('log')
logger.setLevel(logging.DEBUG)

for v in ['CMC_API_KEY', 'SYMBOLS', 'DATABASE_HOST', 'DATABASE_USER', 'DATABASE_PASS', 'DATABASE_DB']:
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
  url = f"https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol={os.environ.get('SYMBOLS')}"
  parameters = {
    'convert':'USD'
  }
  headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': os.environ.get('CMC_API_KEY'),
  }

  session = Session()
  session.headers.update(headers)

  try:
    response = session.get(url, params=parameters)
    data = json.loads(response.text)

    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    for d in data['data']:
      logger.debug(d)
      logger.debug(data['data'][d]['quote']['USD']['price'])

      sql = "INSERT INTO pricing_data(symbol, usd_price, total_supply, volume_24h) VALUES ("
      sql += f"'{d}', {data['data'][d]['quote']['USD']['price']}, {data['data'][d]['total_supply']}, {data['data'][d]['quote']['USD']['volume_24h']})"

      logger.debug(sql)
      cursor.execute(sql)
      conn.commit()

    cursor.close()
    conn.close()

  except (ConnectionError, Timeout, TooManyRedirects) as e:
    print(e)

  return True

def lambda_handler(event, context):
    try:
        return handler_inner(event, context)
    except Exception:
        logger.error(
            f"Lambda failed with exception: {traceback.format_exc()}, event: {event}")
    return True
