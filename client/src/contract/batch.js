import { useState, useCallback } from 'react';
import {
    useAccount,
    useContractRead,
    useNetwork,
} from "wagmi";
import { ethers } from 'ethers'
import { LoanContract, USDCContract, CometContract, CometRewardContract, WETHContract, testNetworkChainId } from "../constants";
import { parseBalance } from '../utils';
import { usePrepareContractBatchWrite, useContractBatchWrite, useWaitForAATransaction } from "@zerodevapp/wagmi";

const LOANABI = require('../constants/loan.json')
const WETHABI = require('../constants/weth.json')
const COMETABI = require('../constants/comet.json')
const USDCABI = require('../constants/usdc.json')
const REWARDABI = require('../constants/reward.json')
const uintMax =
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const useGetLoan = () => {
    const [collateral, setCollateral] = useState(0);
    const [loan, setLoan] = useState(0);

    const { config } = usePrepareContractBatchWrite({
        calls: [
            {
            address: WETHContract[testNetworkChainId],
            abi: WETHABI,
            functionName: "deposit",
            args: [],
            value: ethers.utils.parseEther("0.1")
            },
            {
            address: WETHContract[testNetworkChainId],
            abi: WETHABI,
            functionName: "approve",
            args: [CometContract[testNetworkChainId], uintMax],
            },
            {
            address: CometContract[testNetworkChainId],
            abi: COMETABI,
            functionName: "supply",
            args: [
                WETHContract[testNetworkChainId],
                parseBalance(collateral.toString())
            ]
            },
            {
            address: CometContract[testNetworkChainId],
            abi: COMETABI,
            functionName: "withdraw",
            args: [
                USDCContract[testNetworkChainId],
                parseBalance(loan.toString(), 6)
            ]
            }
        ],
        enabled: true
        },
    )

    const { write: batchGetLoan, data } = useContractBatchWrite(config);

    useWaitForAATransaction({
        wait: data?.wait,
        onSuccess() {
        console.log("Transaction was successful.")
        }
    });
  
    const executeBatchGetLoan = useCallback(
        (newCollateral, newLoan) => {
          console.log(newCollateral)
          console.log(newLoan)
          
          setCollateral(newCollateral);
          setLoan(newLoan);
          batchGetLoan();
    }, [batchGetLoan]);
    
    return { executeBatchGetLoan };
}