/* global BigInt */
import { useCallback } from 'react';
import {
    useAccount,
    useNetwork,
    useWaitForTransaction
} from "wagmi";
import { ethers } from 'ethers'
import { USDCContract, CometContract, CometRewardContract, WETHContract, networkChainId } from "../constants";
import { parseBalance } from '../utils';
import { usePrepareContractBatchWrite, useContractBatchWrite } from "@zerodev/wagmi";

const WETHABI = require('../constants/weth.json')
const COMETABI = require('../constants/comet.json')
const USDCABI = require('../constants/usdc.json')
const REWARDABI = require('../constants/reward.json')
const uintMax =
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const useGetLoan = (collateral, loan) => {
    const { address, isConnected } = useAccount();
    const { chain, chains } = useNetwork();

    const { config } = usePrepareContractBatchWrite({
        calls: [
            {
                address: WETHContract[networkChainId],
                abi: WETHABI,
                functionName: "deposit",
                args: [],
                value: BigInt(ethers.utils.parseEther(collateral.toString()))
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

    const { sendUserOperation: batchGetLoan, data } = useContractBatchWrite(config);

    useWaitForTransaction({
        hash: data?.hash,
        enabled: !!data,
        onSuccess() {
        console.log("Transaction was successful.")
        }
    });

    const executeBatchGetLoan = useCallback(() => {
        batchGetLoan();
    }, [batchGetLoan]);
    
    return { executeBatchGetLoan };
}

export const useRepay = (collateral, loan) => {
    const { address, isConnected } = useAccount();

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

    const { sendUserOperation: batchRepay, data } = useContractBatchWrite(config);

    useWaitForTransaction({
        hash: data?.hash,
        enabled: !!data,
        onSuccess() {
        console.log("Transaction was successful.")
        }
    });
  
    const executeBatchRepay = useCallback(() => {
          batchRepay();
    }, [batchRepay]);
    
    return { executeBatchRepay };
}

export const useAddCollateral = (collateral, loan) => {
    const { address, isConnected } = useAccount();

    const { config } = usePrepareContractBatchWrite({
        calls: [
            {
                address: WETHContract[networkChainId],
                abi: WETHABI,
                functionName: "deposit",
                args: [],
                value: BigInt(ethers.utils.parseEther(collateral.toString()))
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

    const { sendUserOperation: batchAddCollateral, data } = useContractBatchWrite(config);

    useWaitForTransaction({
        hash: data?.hash,
        enabled: !!data,
        onSuccess() {
        console.log("Transaction was successful.")
        }
    });
  
    const executeBatchAddCollateral = useCallback(() => {
          batchAddCollateral();
    }, [batchAddCollateral]);
    
    return { executeBatchAddCollateral };
}

export const useBorrowCollateral = (collateral) => {
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

    const { sendUserOperation: batchBorrowCollateral, data } = useContractBatchWrite(config);

    useWaitForTransaction({
        hash: data?.hash,
        enabled: !!data,
        onSuccess() {
        console.log("Transaction was successful.")
        }
    });
  
    const executeBatchBorrowCollateral = useCallback(() => {
          batchBorrowCollateral();
    }, [batchBorrowCollateral]);
    
    return { executeBatchBorrowCollateral };
}