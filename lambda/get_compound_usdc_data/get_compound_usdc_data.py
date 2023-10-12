#!/usr/bin/env python3

# Required env variables
# PROVIDER:       quicknode url
# PROVIDER_MAIN: quicknode url for pricing
# COMET_CONTRACT: Comet contract for COMP
# COMET_CONTRACT_MAIN: Comet contract for pricing
# USDC_CONTRACT:  USDC contract address for compound
# COMP_CONTRACT:  COMP contract address
# NETWORK:        Network (goerli/mainnet)
# DATABASE_HOST:  Database host
# DATABASE_USER:  Database user
# DATABASE_PASS:  Database password
# DATABASE_DB:    Database database

import logging
import mysql.connector
import os
import requests
import sys
import time
import traceback
import web3

logging.debug("magic")
logger = logging.getLogger('log')
logger.setLevel(logging.DEBUG)

for v in ['PROVIDER', 'PROVIDER_MAIN', 'COMET_CONTRACT', 'COMET_CONTRACT_MAIN', 'USDC_CONTRACT', 'COMP_CONTRACT', 'NETWORK', 'DATABASE_HOST', 'DATABASE_USER', 'DATABASE_PASS', 'DATABASE_DB']:
  if not os.environ.get(v):
    logger.error(f"Error, environment variable {v} is required.")
    sys.exit(255)

DB_CONFIG = {
    'host': os.environ.get('DATABASE_HOST'),
    'user': os.environ.get('DATABASE_USER'),
    'passwd': os.environ.get('DATABASE_PASS'),
    'database': os.environ.get('DATABASE_DB')
}

COMET_ABI = requests.get("https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json").text

def get_apr(rate, scale):
   return rate / scale * (60 * 60 * 24 * 365)


def get_pricing_data(contract):
  w3 = web3.Web3(web3.HTTPProvider(os.environ.get('PROVIDER_MAIN')))
  comet_contract = w3.eth.contract(address=os.environ.get('COMET_CONTRACT_MAIN'), abi=COMET_ABI)  
  price = comet_contract.functions.getPrice(contract).call()
  return price


def handler_inner(event, context):
  w3 = web3.Web3(web3.HTTPProvider(os.environ.get('PROVIDER')))

  # Use network provider for comet contract
  comet_contract = w3.eth.contract(address=os.environ.get('COMET_CONTRACT'), abi=COMET_ABI)

  #
  # Scales
  #

  # Get base index scale
  # Should be 1e15
  base_index_scale = comet_contract.functions.baseIndexScale().call()
  logger.debug(f"BASE INDEX SCALE: {base_index_scale}")

  # Get base accrual scale
  # Should be 1e6
  base_accrual_scale = comet_contract.functions.baseAccrualScale().call()
  logger.debug(f"BASE ACCRUAL SCALE: {base_accrual_scale}")

  # Get factor scale
  # Should be 1e18
  factor_scale = comet_contract.functions.factorScale().call()
  logger.debug(f"FACTOR SCALE: {factor_scale}")

  # Get price scale
  # Should be 1e8
  price_scale = comet_contract.functions.priceScale().call()
  logger.debug(f"PRICE SCALE: {price_scale}")

  #
  # Pricing Specifics
  #
  time.sleep(1)
  logger.debug("")

  # Get COMP price
  comp_price = get_pricing_data(os.environ.get('COMP_CONTRACT')) / price_scale
  logger.debug(f"COMP PRICE: {comp_price}")

  # Get USDC price
  usdc_price = get_pricing_data(os.environ.get('USDC_CONTRACT')) / price_scale
  logger.debug(f"USDC PRICE: {usdc_price}")

  # Get current utilization
  utilization = comet_contract.functions.getUtilization().call()
  logger.debug(f"UTILIZATION: {utilization}")

  # Supply
  time.sleep(1)
  logger.debug("")

# Get supply rate
  supply_rate = comet_contract.functions.getSupplyRate(utilization).call()
  logger.debug(f"SUPPLY RATE: {supply_rate}")

  # Calculate supply apr
  supply_apr = get_apr(supply_rate, factor_scale)
  logger.debug(f"SUPPLY APR: {supply_apr}")

  # Get total supply
  supply_total = comet_contract.functions.totalSupply().call() / base_accrual_scale
  logger.debug(f"SUPPLY TOTAL: {'{:.2f}'.format(supply_total)}")

  # Get supply speed
  supply_speed = comet_contract.functions.baseTrackingSupplySpeed().call()
  logger.debug(f"SUPPLY SPEED: {supply_speed}")

  # Suppliers per day
  suppliers_per_day = supply_speed / base_index_scale * 86400
  logger.debug(f"SUPPLIERS PER DAY {suppliers_per_day}")

  # Supply Comp Reward Rate
  supply_reward_rate = (comp_price * suppliers_per_day / (supply_total  * usdc_price)) * 365
  logger.debug(f"SUPPLY REWARD RATE {supply_reward_rate}")

  # Supply net rate
  supply_net_rate = supply_apr - supply_reward_rate
  logger.debug(f"SUPPLY NET RATE {supply_net_rate}")

  # Borrow
  logger.debug("")
  time.sleep(1)

  # Get borrow rate
  borrow_rate = comet_contract.functions.getBorrowRate(utilization).call()
  logger.debug(f"BORROW RATE: {borrow_rate}")

  # Calculate borrow apr
  borrow_apr = get_apr(borrow_rate, factor_scale)
  logger.debug(f"BORROW APR: {borrow_apr}")

  # Get total borrow
  borrow_total = comet_contract.functions.totalBorrow().call() / base_accrual_scale
  logger.debug(f"BORROW TOTAL: {'{:.2f}'.format(borrow_total)}")

  # Get borrow speed
  borrow_speed = comet_contract.functions.baseTrackingBorrowSpeed().call()
  logger.debug(f"BORROW SPEED: {borrow_speed}")

  # Borrowers per day
  borrowers_per_day = borrow_speed / base_index_scale * 86400
  logger.debug(f"BORROWERS PER DAY {borrowers_per_day}")

  # Borrow Comp Reward Rate
  borrow_reward_rate = (comp_price * borrowers_per_day / (borrow_total  * usdc_price)) * 365
  logger.debug(f"BORROW REWARD RATE {borrow_reward_rate}")

  # Supply net rate
  borrow_net_rate = borrow_apr - borrow_reward_rate
  logger.debug(f"BORROW NET RATE {borrow_net_rate}")

  # Get minimum borrow balance
  # This should be 100
  borrow_min = comet_contract.functions.baseBorrowMin().call() / base_accrual_scale
  logger.debug(f"BORROW MIN: {'{:.2f}'.format(borrow_min)}")

  # Get rewards borrow minimum
  # This is the minimum to calculate rewards
  borrow_reward_min = comet_contract.functions.baseMinForRewards().call() / base_accrual_scale
  logger.debug(f"BORROW MIN REWARDS: {'{:.2f}'.format(borrow_reward_min)}")


  # Other
  # Calculate available to borrow
  logger.debug("")
  time.sleep(1)

  total_available = supply_total - borrow_total
  logger.debug(f"AVAILABLE: {'{:.2f}'.format(total_available)}")

  logger.debug("")

  # Put together SQL statement
  sql = "INSERT INTO asset_data (lending_protocol, protocol_version, network, loan_asset, base_price, comp_price, utilization, available, supply_rate, supply_apr, supply_total, suppliers_per_day, supply_reward_rate, supply_net_rate, borrow_rate, borrow_apr, borrow_total, borrowers_per_day, borrow_reward_rate, borrow_net_rate, borrow_min, borrow_reward_min) VALUES ("
  sql += f"'compound', '3', '{os.environ.get('NETWORK')}', 'USDC', {usdc_price}, {comp_price}, {utilization}, {total_available}, {supply_rate}, {supply_apr}, {supply_total}, {suppliers_per_day}, {supply_reward_rate}, {supply_net_rate}, {borrow_rate}, {borrow_apr}, {borrow_total}, {borrowers_per_day}, {borrow_reward_rate}, {borrow_net_rate}, {borrow_min}, {borrow_reward_min})"

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

