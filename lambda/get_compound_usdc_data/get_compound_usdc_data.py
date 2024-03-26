#!/usr/bin/env python3

# Required env variables
# PROVIDER:            quicknode url
# PROVIDER_MAIN:       quicknode url for pricing
# COMET_CONTRACT:      Comet contract for COMP
# COMET_CONTRACT_MAIN: Comet contract for pricing
# USDC_CONTRACT:       USDC contract address for compound
# COMP_CONTRACT:       COMP contract address
# NETWORK:             Network (sepolia/mainnet/base)
# DATABASE_HOST:       Database host
# DATABASE_USER:       Database user
# DATABASE_PASS:       Database password
# DATABASE_DB:         Database database

import logging
import mysql.connector
import os
import sys
import time
import traceback
import web3

logging.debug("magic")
logger = logging.getLogger('log')
logger.setLevel(logging.DEBUG)

required_vars = [
    # Provider for current network (sepolia/mainnet)
    'PROVIDER',
    # Provider mainnet
    'PROVIDER_MAIN',
    # Provider base
    'PROVIDER_BASE',
    # Coment contract for current network (sepolia/mainnet)
    'COMET_CONTRACT',
    # Comet contract mainnet
    'COMET_CONTRACT_MAIN',
    # Comet contract base
    'COMET_CONTRACT_BASE',
    # Chainlink Price Feed USDC/USD
    'USDC_CONTRACT',
    # Chainlink Price Feed COMP/USD
    'COMP_CONTRACT',
    
    # Network (current and base)
    'NETWORK',
    'NETWORK_BASE',
    
    # DB Creds
    'DATABASE_HOST',
    'DATABASE_USER',
    'DATABASE_PASS',
    'DATABASE_DB'
]

try:
    missing_vars = [v for v in required_vars if not os.environ.get(v)]
    if missing_vars:
        raise ValueError(f"The following environment variables are required: {', '.join(missing_vars)}")
except ValueError as e:
    logger.error(str(e))
    sys.exit(255)

DB_CONFIG = {
    'host': os.environ.get('DATABASE_HOST'),
    'user': os.environ.get('DATABASE_USER'),
    'passwd': os.environ.get('DATABASE_PASS'),
    'database': os.environ.get('DATABASE_DB')
}

COMET_ABI = open('comet-abi.json').read()
DRY_RUN = 0

def get_apr(rate, scale):
   return rate / scale * (60 * 60 * 24 * 365)


def get_pricing_data(contract, provider_main, comet_contract_main):
  w3 = web3.Web3(web3.HTTPProvider(provider_main))
  comet_contract = w3.eth.contract(address=comet_contract_main, abi=COMET_ABI)  
  price = comet_contract.functions.getPrice(contract).call()
  return price

def get_compound_usdc_data(
    provider, 
    provider_main, 
    comet_contract, 
    comet_contract_main, 
    usdc_contract, 
    comp_contract, 
    network
  ):
    w3 = web3.Web3(web3.HTTPProvider(provider))

    # Use network provider for comet contract
    comet_contract = w3.eth.contract(address=comet_contract, abi=COMET_ABI)

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

    logger.debug(f"NETWORK: {network}")
    # Get COMP price
    comp_price = get_pricing_data(
      comp_contract, 
      provider_main,
      comet_contract_main
      ) / price_scale
    logger.debug(f"COMP PRICE: {comp_price}")

    # Get USDC price
    usdc_price = get_pricing_data(
      usdc_contract, 
      provider_main,
      comet_contract_main
      ) / price_scale
    logger.debug(f"USDC PRICE: {usdc_price}")

    # Get current utilization
    utilization = comet_contract.functions.getUtilization().call()
    logger.debug(f"UTILIZATION: {utilization}")

    # Get utilization percentage
    utilization_percent = utilization / factor_scale
    logger.debug(f"UTILIZATION PERCENT: {utilization_percent}")

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

    # COMP to suppliers per day
    comp_to_suppliers_per_day = supply_speed / base_index_scale * 86400
    logger.debug(f"SUPPLIERS PER DAY {comp_to_suppliers_per_day}")

    # Supply Comp Reward Rate
    supply_reward_rate = (comp_price * comp_to_suppliers_per_day / (supply_total  * usdc_price)) * 365
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

    # Borrow collateral factor
    #  asset_info = comet_contract.functions.AssetInfo0i

    borrow_collateral_factor = comet_contract.functions.getAssetInfo(2).call()[4] / factor_scale
    logger.debug(f"BORROW COLLATERAL FACTOR: {borrow_collateral_factor}")

    # COMP to borrowers per day
    comp_to_borrowers_per_day = borrow_speed / base_index_scale * 86400
    logger.debug(f"BORROWERS PER DAY {comp_to_borrowers_per_day}")

    # Borrow Comp Reward Rate
    borrow_reward_rate = (comp_price * comp_to_borrowers_per_day / (borrow_total  * usdc_price)) * 365
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
    table_name = "asset_data"

    sql = f"INSERT INTO {table_name} (lending_protocol, protocol_version, network, loan_asset, base_price, comp_price, utilization, utilization_percent, available, supply_rate, supply_apr, supply_total, comp_to_suppliers_per_day, supply_reward_rate, supply_net_rate, borrow_rate, borrow_apr, borrow_total, borrow_collateral_factor, comp_to_borrowers_per_day, borrow_reward_rate, borrow_net_rate, borrow_min, borrow_reward_min) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

    params = (
        'compound',
        '3',
        network,
        'USDC',
        usdc_price,
        comp_price,
        utilization,
        utilization_percent,
        total_available,
        supply_rate,
        supply_apr,
        supply_total,
        comp_to_suppliers_per_day,
        supply_reward_rate,
        supply_net_rate,
        borrow_rate,
        borrow_apr,
        borrow_total,
        borrow_collateral_factor,
        comp_to_borrowers_per_day,
        borrow_reward_rate,
        borrow_net_rate,
        borrow_min,
        borrow_reward_min
    )

    logger.debug(sql)
    logger.debug(params)

    if not DRY_RUN:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        cursor.execute(sql, params)
        conn.commit()
        cursor.close()
        conn.close()
        return True

def handler_inner(event, context):
  # Get current netork data (mainnet/sepolia)
  get_compound_usdc_data(
      network=os.environ.get('NETWORK'),
      provider=os.environ.get('PROVIDER'),
      provider_main=os.environ.get('PROVIDER_MAIN'), 
      comet_contract=os.environ.get('COMET_CONTRACT'),
      comet_contract_main=os.environ.get('COMET_CONTRACT_MAIN'), 
      usdc_contract=os.environ.get('USDC_CONTRACT'), 
      comp_contract=os.environ.get('COMP_CONTRACT'), 
  )
  
  get_compound_usdc_data(
    network=os.environ.get('NETWORK_BASE'),
    provider=os.environ.get('PROVIDER_BASE'),
    provider_main=os.environ.get('PROVIDER_MAIN'), 
    comet_contract=os.environ.get('COMET_CONTRACT_BASE'),
    comet_contract_main=os.environ.get('COMET_CONTRACT_MAIN'), 
    usdc_contract=os.environ.get('USDC_CONTRACT'), 
    comp_contract=os.environ.get('COMP_CONTRACT'), 
  )

def lambda_handler(event, context):
    try:
        return handler_inner(event, context)
    except Exception:
        logger.error(
            f"Lambda failed with exception: {traceback.format_exc()}, event: {event}")
    return True

if __name__ == "__main__":
    lambda_handler(None, None)

