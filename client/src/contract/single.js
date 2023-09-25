import { useEffect, useLayoutEffect, useRef } from 'react'
import { ethers } from 'ethers'
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { USDCContract, CometContract, CometRewardContract, WETHContract, ChainlinkEthPriceFeed, networkChainId } from "../constants";
import { parseBalance } from '../utils';
import { NETWORK } from "../constants/env";
const WETHABI = require('../constants/weth.json')
const COMETABI = require('../constants/comet.json')
const USDCABI = require('../constants/usdc.json')
const REWARDABI = require('../constants/reward.json')
const ASSET_ID = 2

const ProviderNetwork = NETWORK === 'mainnet' ? 'ethereum' : NETWORK;

export const useLoan = () => {
  const address = useAddress()
  const signer = useSigner();

  const getETHPrice = async () => {
<<<<<<< HEAD
    const sdk = new ThirdwebSDK(NETWORK);
  
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)
    const price = await contract.call( 
      "getPrice",
      [
        ChainlinkEthPriceFeed[networkChainId]
      ] )

    const formattedValue = ethers.utils.formatEther( price ) * 10 ** 10
    return formattedValue
=======
    try {
      const sdk = new ThirdwebSDK(ProviderNetwork);
  
      const contract = await sdk.getContract(LoanContract[networkChainId], LOANABI)
      const price = await contract.call( "getETHPrice" )
  
      const formattedValue = ethers.utils.formatEther( price ) * 10 ** 10
      return formattedValue
    } catch (e) {
      console.log({e}, 'cant fetch eth price')
      return null;
    }
    
>>>>>>> 473890a6 (debug mainnet)
  }

  const getBorrowAPR = async () => {
    const sdk = new ThirdwebSDK(ProviderNetwork);
  
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)
    const utilization = await contract.call( "getUtilization" )
    const borrowRate = await contract.call( "getBorrowRate",
    [
      utilization
    ] )

    const formattedRate = ethers.utils.formatEther( borrowRate )
    const borrowAPR = formattedRate * 60 * 60 * 24 * 365 * 100
    return borrowAPR
  }

  const getLTV = async () => {
    const sdk = new ThirdwebSDK(ProviderNetwork);
  
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)
    const assetInfo = await contract.call( "getAssetInfo",
    [
      ASSET_ID
    ] )
    const LTV = assetInfo.liquidationFactor

    const formattedValue = ethers.utils.formatEther( LTV )
    return formattedValue
  }

  const getThreshold = async () => {
    const sdk = new ThirdwebSDK(ProviderNetwork);
  
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)
    const assetInfo = await contract.call( "getAssetInfo",
    [
      ASSET_ID
    ] )
    const threshold = assetInfo.liquidateCollateralFactor

    const formattedValue = ethers.utils.formatEther( threshold )
    return formattedValue
  }

  const getPenalty = async () => {
    const sdk = new ThirdwebSDK(ProviderNetwork);
  
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)
    const assetInfo = await contract.call( "getAssetInfo",
    [
      ASSET_ID
    ] )
    const penalty = assetInfo.liquidationFactor

    const formattedValue = 1 - ethers.utils.formatEther( penalty )
    return formattedValue
  }

  const getCollateralBalanceOf = async () => {
    const sdk = new ThirdwebSDK(ProviderNetwork);
  
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)
    const value = await contract.call( 
      "collateralBalanceOf",
      [
        address,
        WETHContract[networkChainId]
      ] )

    const formattedValue = ethers.utils.formatEther( value )
    return formattedValue
  }

  const getRewardRate = async() => {
    const sdk = new ThirdwebSDK(ProviderNetwork);
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)
    const value = await contract.call( 
      "baseTrackingBorrowSpeed"
    )

    const formattedValue = ethers.utils.formatEther( value ) * 365 * 60 * 60 * 24;
    return formattedValue
  }

  const getRewardAmount = async() => {
    if (!address) return;

    const sdk = new ThirdwebSDK(ProviderNetwork);
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)
    const value = await contract.call( 
      "userBasic",
      [
        address
      ]
    )

    const formattedValue = ethers.utils.formatEther( value[2] ) * 10 ** 12
    return formattedValue
  }

  const approveWETH = async () => {
    const sdk = ThirdwebSDK.fromSigner(signer);
    const uintMax =
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

    const contract = await sdk.getContract(WETHContract[networkChainId], WETHABI)
    try {
      const tx = await contract.call(
        "approve",
        [
          CometContract[networkChainId],
          uintMax
        ]
      )
      return tx;
    } catch {
      return null;
    }
  }

  const approveUSDC = async () => {
    const sdk = ThirdwebSDK.fromSigner(signer);
    const uintMax =
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

    const contract = await sdk.getContract(USDCContract[networkChainId], USDCABI)
    try {
      const tx = await contract.call(
        "approve",
        [
          CometContract[networkChainId],
          uintMax
        ]
      )
      return tx;
    } catch(e) {
      console.log(e)
      return null;
    }
  }

  const deposit = async ( amount ) => {
    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(WETHContract[networkChainId], WETHABI)

    try {
      const tx = await contract.call(
        "deposit",
        [],
        {
          value: ethers.utils.parseEther(amount.toString()),
        }
      );
      return tx;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  const wethToETH = async ( amount ) => {
    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(WETHContract[networkChainId], WETHABI)

    try {
      const tx = await contract.call(
        "withdraw",
        [
          ethers.utils.parseEther(amount.toString())
        ]
      );
      return tx;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  const addCollateral = async ( amount ) => {
    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)

    try {
      const tx = await contract.call(
        "supply",
        [
          WETHContract[networkChainId],
          parseBalance(amount.toString())
        ]
      );
      return tx;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  const addLoan = async ( amount ) => {
    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)

    try {
      const tx = await contract.call(
        "supply",
        [
          USDCContract[networkChainId],
          parseBalance(amount.toString(), 6)
        ]
      );
      return tx;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  const borrowLoan = async ( amount ) => {
    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)

    try {
      const tx = await contract.call(
        "withdraw",
        [
          USDCContract[networkChainId],
          parseBalance(amount.toString(), 6)
        ]
      );
      return tx;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  const borrowCollateral = async ( amount ) => {
    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(CometContract[networkChainId], COMETABI)

    try {
      const tx = await contract.call(
        "withdraw",
        [
          WETHContract[networkChainId],
          parseBalance(amount.toString())
        ]
      );
      return tx;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  const claimReward = async() => {
    if (!address) return;
    
    const sdk = ThirdwebSDK.fromSigner(signer);
    const contract = await sdk.getContract(CometRewardContract[networkChainId], REWARDABI)

    try {
      const tx = await contract.call(
        "claim",
        [
          CometContract[networkChainId],
          address,
          true
        ]
      );
      return tx;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  return {
      approveWETH,
      approveUSDC,
      deposit,
      wethToETH,
      addCollateral,
      addLoan,
      borrowLoan,
      borrowCollateral,
      getETHPrice,
      getBorrowAPR,
      getLTV,
      getThreshold,
      getPenalty,
      getCollateralBalanceOf,
      getRewardAmount,
      getRewardRate,
      claimReward
  }
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}
