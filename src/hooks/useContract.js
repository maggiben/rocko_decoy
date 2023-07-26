import { useEffect, useState } from "react";
import { useAddress, useSigner, useChainId } from "@thirdweb-dev/react";
import { Goerli } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/react";

import LOANABI from '../constants/loan.json';
import USDCABI from '../constants/usdc.json';

import { LoanContract, USDCContract, testNetworkChainId } from "../constants";

// returns null on errors
export function useContract(contractAddress, ABI) {
    const [contract, setContract] = useState(null);
    const address = useAddress();
    const signer = useSigner();
    const chainId = useChainId();

    useEffect(() => {
        if (chainId == testNetworkChainId) {
            const fetchContract = async () => {
                const sdk = ThirdwebSDK.fromSigner(signer);
                const contract = await sdk.getContract(contractAddress, ABI);
                setContract(contract);
            };
            fetchContract();
        }
    }, [address, signer]);

    return contract;
}

export function usdLoanContract() {
    return useContract(LoanContract[testNetworkChainId], LOANABI);
}

export function useUSDCContract() {
    return useContract(USDCContract[testNetworkChainId], USDCABI);
}