#!/usr/bin/env python3

# Required env variables
# PROVIDER:      quicknode url
# USDC_CONTRACT: USDC contract address for compound
# NETWORK:       Netowrk (goerli/mainnet)
# DATABASE_HOST: Database host
# DATABASE_USER: Database user
# DATABASE_PASS: Database password
# DATABASE_DB:   Database database

import logging
import mysql.connector
import os
import requests
import sys
import traceback
import web3

logging.debug("magic")
logger = logging.getLogger('log')
logger.setLevel(logging.INFO)

for v in ['PROVIDER', 'USDC_CONTRACT', 'NETWORK', 'DATABASE_HOST', 'DATABASE_USER', 'DATABASE_PASS', 'DATABASE_DB']:
  if not os.environ.get(v):
    logger.error(f"Error, environment variable {v} is required.")
    sys.exit(255)

DB_CONFIG = {
    'host': os.environ.get('DATABASE_HOST'),
    'user': os.environ.get('DATABASE_USER'),
    'passwd': os.environ.get('DATABASE_PASS'),
    'database': os.environ.get('DATABASE_DB')
}


def get_apr(rate):
   return rate / 1e18 * (60 * 60 * 24 * 365)


def handler_inner(event, context):
  # Create w3 object and get contract
  w3 = web3.Web3(web3.HTTPProvider(os.environ.get('PROVIDER')))
  abi = requests.get("https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json").text
  contract = w3.eth.contract(address=os.environ.get('USDC_CONTRACT'), abi=abi)

  # Get current utilization
  utilization = contract.functions.getUtilization().call()
  logger.debug(f"UTILIZATION: {utilization}")

  # Get supply rate
  supply_rate = contract.functions.getSupplyRate(utilization).call()
  logger.debug(f"SUPPLY RATE: {supply_rate}")

  # Get borrow rate
  borrow_rate = contract.functions.getBorrowRate(utilization).call()
  logger.debug(f"BORROW RATE: {borrow_rate}")

  # Calculate supply apr
  supply_apr = get_apr(supply_rate)
  logger.debug(f"SUPPLY APR: {supply_apr}")

  # Calculate borrow apr
  borrow_apr = get_apr(borrow_rate)
  logger.debug(f"BORROW APR: {borrow_apr}")

  # Get total supply
  total_supply = contract.functions.totalSupply().call() / 10
  logger.debug(f"TOTAL SUPPLY: {'{:.2f}'.format(total_supply)}")

  # Get total borrow
  total_borrow = contract.functions.totalBorrow().call() / 10
  logger.debug(f"TOTAL BORROW: {'{:.2f}'.format(total_borrow)}")

  # Calculate available to borrow
  total_available = total_supply - total_borrow
  logger.debug(f"AVAILABLE: {'{:.2f}'.format(total_available)}")

  # Put together SQL statement
  sql = "INSERT INTO asset_data (lending_protocol, protocol_version, network, loan_asset, total_supply, total_borrow, supply_rate, borrow_rate, utilization, supply_apr, borrow_apr) VALUES ("
  sql += f"'compound', '3', '{os.environ.get('NETWORK')}', 'USDC', {'{:.2f}'.format(total_supply)}, {'{:.2f}'.format(total_borrow)}, {supply_rate}, {borrow_rate}, {'{:.2f}'.format(utilization)}, {supply_apr}, {borrow_apr})"
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


