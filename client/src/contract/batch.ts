/* global BigInt */
import { useCallback, useState } from 'react';
import {
    useAccount,
    useWaitForTransaction
} from "wagmi";
import { ethers } from 'ethers'
import { USDCContract, CometContract, CometRewardContract, WETHContract, networkChainId } from "../constants";
import { parseBalance } from '@/utility/utils';
import { usePrepareContractBatchWrite, useContractBatchWrite } from "@zerodev/wagmi";
import { useAddress } from "@thirdweb-dev/react";

const WETHABI = require('../constants/weth.json')
const COMETABI = require('../constants/comet.json')
const USDCABI = require('../constants/usdc.json')
const REWARDABI = require('../constants/reward.json')
const uintMax =
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const useGetLoan = (collateral: any, loan: any) => {
    const { address : wagmiAddress } = useAccount();
    const address = useAddress();

    const [txHash, setTxHash] = useState("");
    const [success, setSuccess] = useState(false);

    const { config } = usePrepareContractBatchWrite(
        wagmiAddress ?
        {
            calls: [
                {
                    address: WETHContract[networkChainId],
                    abi: WETHABI,
                    functionName: "deposit",
                    args: [],
                    value: BigInt(Number(ethers.utils.parseEther(collateral.toString())))
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
                    functionName: "withdrawTo",
                    args: [
                        address ? address : wagmiAddress,
                        USDCContract[networkChainId],
                        parseBalance(loan.toString(), 6)
                    ]
                }
            ],
            enabled: true
        } : {
            calls: [],
            enabled: true
        },
    )

    const { sendUserOperation: batchGetLoan, data, error } = useContractBatchWrite(config);

    useWaitForTransaction({
        hash: data?.hash,
        enabled: !!data,
        onSuccess() {
            console.log("Transaction was successful.")
            setSuccess(true);
            if (data?.hash) 
                setTxHash(data?.hash);
        }
    });

    const executeBatchGetLoan = () => {
        console.log(batchGetLoan)
        if (batchGetLoan)
            batchGetLoan();
    }
    
    return { executeBatchGetLoan, batchGetLoan, success, txHash, error };
}

export const useRepaySome = (loan: any) => {
    const [txHash, setTxHash] = useState("");
    const [success, setSuccess] = useState(false);

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
            }
        ],
        enabled: true
        },
    )

    const { sendUserOperation: batchRepaySome, data, error } = useContractBatchWrite(config);

    useWaitForTransaction({
        hash: data?.hash,
        enabled: !!data,
        onSuccess() {
            console.log("Transaction was successful.")
            setSuccess(true);
            if (data?.hash)
                setTxHash(data?.hash);
        }
    });

    const executeBatchRepaySome = () => {
        console.log(batchRepaySome)
        if (batchRepaySome)
            batchRepaySome();
    };
    
    return { executeBatchRepaySome, batchRepaySome, success, txHash, error };
}

export const useRepayFull = (collateral: any, loan: any) => {
    const { address : wagmiAddress } = useAccount();
    const address = useAddress();

    const [txHash, setTxHash] = useState("");
    const [success, setSuccess] = useState(false);


    const { config } = usePrepareContractBatchWrite(
        wagmiAddress ? {
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
                functionName: "withdrawTo",
                args: [
                    address ? address : wagmiAddress,
                    WETHContract[networkChainId],
                    parseBalance(collateral.toString())
                ]
            },
            {
                address: CometRewardContract[networkChainId],
                abi: REWARDABI,
                functionName: "claimTo",
                args: [
                    CometContract[networkChainId],
                    wagmiAddress,
                    address,
                    true
                ]
            }
        ],
        enabled: true
        } : {
            calls: [],
            enabled: true
        },
    )

    const { sendUserOperation: batchRepayFull, data, error } = useContractBatchWrite(config);

    useWaitForTransaction({
        hash: data?.hash,
        enabled: !!data,
        onSuccess() {
            console.log("Transaction was successful.")
            setSuccess(true);
            if (data?.hash)
                setTxHash(data?.hash);
        }
    });

    const executeBatchRepayFull = () => {
        console.log(batchRepayFull)
        if (batchRepayFull) batchRepayFull();
    };
    
    return { executeBatchRepayFull, batchRepayFull, success, txHash, error };
}

export const useAddCollateral = (collateral: any, loan: any) => {
    const { address, isConnected } = useAccount();

    const { config } = usePrepareContractBatchWrite({
        calls: [
            {
                address: WETHContract[networkChainId],
                abi: WETHABI,
                functionName: "deposit",
                args: [],
                value: BigInt(Number(ethers.utils.parseEther(collateral.toString())))
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
        if (batchAddCollateral) batchAddCollateral();
    }, [batchAddCollateral]);
    
    return { executeBatchAddCollateral };
}

export const useBorrowCollateral = (collateral: any) => {
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
        if (batchBorrowCollateral) batchBorrowCollateral();
    }, [batchBorrowCollateral]);
    
    return { executeBatchBorrowCollateral };
}