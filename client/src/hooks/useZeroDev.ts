import { ZeroDevWeb3Auth } from '@zerodev/web3auth';
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';

export const useZeroDev = () => {
    const { isConnected } = useAccount();

    const [ userInfo, setUserInfo ] = useState<any>();

    useEffect(() => {
        if (isConnected) {
            const zeroDevWeb3Auth = ZeroDevWeb3Auth.getInstance([process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || "b5486fa4-e3d9-450b-8428-646e757c10f6"]);
            zeroDevWeb3Auth.getUserInfo().then((res) => {
                console.log(res)
                setUserInfo(res)
            });
        }
    })

    return { userInfo }
}