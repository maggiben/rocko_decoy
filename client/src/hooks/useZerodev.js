import { useState, useEffect, useCallback } from 'react'
import { ZeroDevWeb3Auth } from '@zerodevapp/web3auth';
import { useAccount } from 'wagmi';

export const useUserInfo = () => {
    const [ userInfo, setUserInfo ] = useState();
    const { isConnected, isConnecting, isDisconnected } = useAccount();

    useEffect(() => {
        const getInfo = async () => {
            if (isConnected) {
                const zeroDevWeb3Auth = new ZeroDevWeb3Auth([process.env.REACT_APP_ZERODEV_PROJECT_DEFAULT_ID || 'b5486fa4-e3d9-450b-8428-646e757c10f6'])
                const info = await zeroDevWeb3Auth.getUserInfo();
                setUserInfo(info);
            }
        };

        getInfo();
    }, [isConnected])

    return { userInfo };
}