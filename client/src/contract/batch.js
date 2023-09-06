import { useState, useCallback } from 'react';
import {
    useAccount,
    useContractRead,
    useNetwork,
} from "wagmi";
import { ethers } from 'ethers'
import { LoanContract, USDCContract, CometContract, CometRewardContract, WETHContract, networkChainId } from "../constants";
import { parseBalance } from '../utils';
import { usePrepareContractBatchWrite, useContractBatchWrite, useWaitForAATransaction } from "@zerodevapp/wagmi";
import { parse } from 'url';

const LOANABI = require('../constants/loan.json')
const WETHABI = require('../constants/weth.json')
const COMETABI = require('../constants/comet.json')
const USDCABI = require('../constants/usdc.json')
const REWARDABI = require('../constants/reward.json')
const uintMax =
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const useGetLoan = () => {
    const { address, isConnected } = useAccount();
    const { chain, chains } = useNetwork();

    const [collateral, setCollateral] = useState(0);
    const [loan, setLoan] = useState(0);

    const { config } = usePrepareContractBatchWrite({
        calls: [
            {
                address: WETHContract[networkChainId],
                abi: WETHABI,
                functionName: "deposit",
                args: [],
                value: ethers.utils.parseEther(collateral)
            },
            {
                address: WETHContract[networkChainId],
                abi: WETHABI,
                functionName: "approve",
                args: [CometContract[networkChainId], uintMax],
            },
            {
                address: CometContract[networkChainId],
                abi: COMETABI,
                functionName: "supply",
                args: [
                    WETHContract[networkChainId],
                    parseBalance(collateral.toString())
                ]
            },
            {
                address: CometContract[networkChainId],
                abi: COMETABI,
                functionName: "withdraw",
                args: [
                    USDCContract[networkChainId],
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
          setCollateral(newCollateral);
          setLoan(newLoan);
          batchGetLoan();
    }, [batchGetLoan]);
    
    return { executeBatchGetLoan };
}

export const useRepay = () => {
    const { address, isConnected } = useAccount();
    const { chain, chains } = useNetwork();

    const [loan, setLoan] = useState(0);
    const [collateral, setCollateral] = useState(0);

    const { config } = usePrepareContractBatchWrite({
        calls: [
            {
                address: USDCContract[networkChainId],
                abi: USDCABI,
                functionName: "approve",
                args: [
                    CometContract[networkChainId],
                    uintMax
                ],
            },
            {
                address: CometContract[networkChainId],
                abi: COMETABI,
                functionName: "supply",
                args: [
                    USDCContract[networkChainId], 
                    parseBalance(loan.toString(), 6)
                ],
            },
            {
                address: CometContract[networkChainId],
                abi: COMETABI,
                functionName: "withdraw",
                args: [
                    WETHContract[networkChainId],
                    parseBalance(collateral.toString())
                ]
            },
            {
                address: CometRewardContract[networkChainId],
                abi: REWARDABI,
                functionName: "claim",
                args: [
                    CometContract[networkChainId],
                    address,
                    true
                ]
            }
        ],
        enabled: true
        },
    )

    const { write: batchRepay, data } = useContractBatchWrite(config);

    useWaitForAATransaction({
        wait: data?.wait,
        onSuccess() {
        console.log("Transaction was successful.")
        }
    });
  
    const executeBatchRepay = useCallback(
        (newCollateral, newLoan) => {
          setCollateral(newCollateral);
          setLoan(newLoan);
          batchRepay();
    }, [batchRepay]);
    
    return { executeBatchRepay };
}

export const useAddCollateral = () => {
    const { address, isConnected } = useAccount();

    const [loan, setLoan] = useState(0);
    const [collateral, setCollateral] = useState(0);

    const { config } = usePrepareContractBatchWrite({
        calls: [
            {
                address: WETHContract[networkChainId],
                abi: WETHABI,
                functionName: "deposit",
                args: [],
                value: ethers.utils.parseEther(collateral)
            },
            {
                address: WETHContract[networkChainId],
                abi: WETHABI,
                functionName: "approve",
                args: [CometContract[networkChainId], uintMax],
            },
            {
                address: CometContract[networkChainId],
                abi: COMETABI,
                functionName: "supply",
                args: [
                    WETHContract[networkChainId],
                    parseBalance(collateral.toString())
                ]
            }
        ],
        enabled: true
        },
    )

    const { write: batchAddCollateral, data } = useContractBatchWrite(config);

    useWaitForAATransaction({
        wait: data?.wait,
        onSuccess() {
        console.log("Transaction was successful.")
        }
    });
  
    const executeBatchAddCollateral = useCallback(
        (newCollateral, newLoan) => {
          setCollateral(newCollateral);
          setLoan(newLoan);
          batchAddCollateral();
    }, [batchAddCollateral]);
    
    return { executeBatchAddCollateral };
}

export const useBorrowCollateral = () => {
    const [collateral, setCollateral] = useState(0);

    const { config } = usePrepareContractBatchWrite({
        calls: [
            {
                address: CometContract[networkChainId],
                abi: COMETABI,
                functionName: "withdraw",
                args: [
                    WETHContract[networkChainId],
                    parseBalance(collateral.toString())
                ]
            },
            {
                address: WETHContract[networkChainId],
                abi: WETHABI,
                functionName: "withdraw",
                args: [
                    ethers.utils.parseEther(collateral.toString())
                ]
            }
        ],
        enabled: true
        },
    )

    const { write: batchBorrowCollateral, data } = useContractBatchWrite(config);

    useWaitForAATransaction({
        wait: data?.wait,
        onSuccess() {
        console.log("Transaction was successful.")
        }
    });
  
    const executeBatchBorrowCollateral = useCallback(
        ( newCollateral ) => {
          setCollateral(newCollateral);
          batchBorrowCollateral();
    }, [batchBorrowCollateral]);
    
    return { executeBatchBorrowCollateral };
}