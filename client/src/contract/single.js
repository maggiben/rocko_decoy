import { useEffect, useLayoutEffect, useRef } from 'react'
import { ethers } from 'ethers'
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { LoanContract, USDCContract, CometContract, CometRewardContract, WETHContract, testNetworkChainId } from "../constants";
import { parseBalance } from '../utils';

const LOANABI = require('../constants/loan.json')
const WETHABI = require('../constants/weth.json')
const COMETABI = require('../constants/comet.json')
const USDCABI = require('../constants/usdc.json')
const REWARDABI = require('../constants/reward.json')

export const useLoan = () => {
  const address = useAddress()
  const signer = useSigner();

  const getETHPrice = async () => {
    const sdk = new ThirdwebSDK('goerli');
  
    const contract = await sdk.getContract(LoanContract[testNetworkChainId], LOANABI)
    const price = await contract.call( "getETHPrice" )

    const formattedValue = ethers.utils.formatEther( price ) * 10 ** 10
    return formattedValue
  }

  const getBorrowAPR = async () => {
    const sdk = new ThirdwebSDK('goerli');
  
    const contract = await sdk.getContract(LoanContract[testNetworkChainId], LOANABI)
    const APR = await contract.call( "getAPR" )

    const formattedValue = ethers.utils.formatEther( APR )
    return formattedValue
  }

  const getLTV = async () => {
    const sdk = new ThirdwebSDK('goerli');
  
    const contract = await sdk.getContract(LoanContract[testNetworkChainId], LOANABI)
    const LTV = await contract.call( "getLoanToValue" )

    const formattedValue = ethers.utils.formatEther( LTV )
    return formattedValue
  }

  const getThreshold = async () => {
    const sdk = new ThirdwebSDK('goerli');
  
    const contract = await sdk.getContract(LoanContract[testNetworkChainId], LOANABI)
    const threshold = await contract.call( "getLiquidationThreshold" )

    const formattedValue = ethers.utils.formatEther( threshold )
    return formattedValue
  }

  const getPenalty = async () => {
    const sdk = new ThirdwebSDK('goerli');
  
    const contract = await sdk.getContract(LoanContract[testNetworkChainId], LOANABI)
    const penalty = await contract.call( "getLiquidationPenalty" )

    const formattedValue = 1 - ethers.utils.formatEther( penalty )
    return formattedValue
  }

  const getCollateralBalanceOf = async () => {
    const sdk = new ThirdwebSDK('goerli');
  
    const contract = await sdk.getContract(LoanContract[testNetworkChainId], LOANABI)
    const value = await contract.call( 
      "collateralBalanceOf",
      [
        address
      ] )

    const formattedValue = ethers.utils.formatEther( value )
    return formattedValue
  }

  const getRewardRate = async() => {
    if (!address) return;

    const sdk = new ThirdwebSDK('goerli');
    const contract = await sdk.getContract(CometContract[testNetworkChainId], COMETABI)
    const value = await contract.call( 
      "baseTrackingBorrowSpeed"
    )

    const formattedValue = ethers.utils.formatEther( value ) * 365 * 60 * 60 * 24;
    return formattedValue
  }

  const getRewardAmount = async() => {
    if (!address) return;

    const sdk = new ThirdwebSDK('goerli');
    const contract = await sdk.getContract(CometContract[testNetworkChainId], COMETABI)
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

    const contract = await sdk.getContract(WETHContract[testNetworkChainId], WETHABI)
    try {
      const tx = await contract.call(
        "approve",
        [
          CometContract[testNetworkChainId],
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

    const contract = await sdk.getContract(USDCContract[testNetworkChainId], USDCABI)
    try {
      const tx = await contract.call(
        "approve",
        [
          CometContract[testNetworkChainId],
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
    const contract = await sdk.getContract(WETHContract[testNetworkChainId], WETHABI)

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
    const contract = await sdk.getContract(WETHContract[testNetworkChainId], WETHABI)

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
    const contract = await sdk.getContract(CometContract[testNetworkChainId], COMETABI)

    try {
      const tx = await contract.call(
        "supply",
        [
          WETHContract[testNetworkChainId],
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
    const contract = await sdk.getContract(CometContract[testNetworkChainId], COMETABI)

    try {
      const tx = await contract.call(
        "supply",
        [
          USDCContract[testNetworkChainId],
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
    const contract = await sdk.getContract(CometContract[testNetworkChainId], COMETABI)

    try {
      const tx = await contract.call(
        "withdraw",
        [
          USDCContract[testNetworkChainId],
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
    const contract = await sdk.getContract(CometContract[testNetworkChainId], COMETABI)

    try {
      const tx = await contract.call(
        "withdraw",
        [
          WETHContract[testNetworkChainId],
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
    const contract = await sdk.getContract(CometRewardContract[testNetworkChainId], REWARDABI)

    try {
      const tx = await contract.call(
        "claim",
        [
          CometContract[testNetworkChainId],
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
