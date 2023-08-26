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
                address: WETHContract[testNetworkChainId],
                abi: WETHABI,
                functionName: "deposit",
                args: [],
                value: ethers.utils.parseEther(collateral)
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
                address: USDCContract[testNetworkChainId],
                abi: USDCABI,
                functionName: "approve",
                args: [
                    CometContract[testNetworkChainId],
                    uintMax
                ],
            },
            {
                address: CometContract[testNetworkChainId],
                abi: COMETABI,
                functionName: "supply",
                args: [
                    USDCContract[testNetworkChainId], 
                    parseBalance(loan.toString(), 6)
                ],
            },
            {
                address: CometContract[testNetworkChainId],
                abi: COMETABI,
                functionName: "withdraw",
                args: [
                    WETHContract[testNetworkChainId],
                    parseBalance(collateral.toString())
                ]
            },
            {
                address: CometRewardContract[testNetworkChainId],
                abi: REWARDABI,
                functionName: "claim",
                args: [
                    CometContract[testNetworkChainId],
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
                address: WETHContract[testNetworkChainId],
                abi: WETHABI,
                functionName: "deposit",
                args: [],
                value: ethers.utils.parseEther(collateral)
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
                address: CometContract[testNetworkChainId],
                abi: COMETABI,
                functionName: "withdraw",
                args: [
                    WETHContract[testNetworkChainId],
                    parseBalance(collateral.toString())
                ]
            },
            {
                address: WETHContract[testNetworkChainId],
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