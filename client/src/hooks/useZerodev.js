import { useState, useEffect, useCallback } from 'react'
import { ZeroDevWeb3Auth } from '@zerodev/web3auth';
import { useAccount } from 'wagmi';

export const useUserInfo = () => {
    const [ userInfo, setUserInfo ] = useState();
    const { isConnected } = useAccount();

    useEffect(() => {
        const getInfo = async () => {
            if (isConnected) {
                const zeroDevWeb3Auth = new ZeroDevWeb3Auth([process.env.REACT_APP_ZERODEV_PROJECT_ID])
                const info = await zeroDevWeb3Auth.getUserInfo();
                setUserInfo(info);
            }
        };

        getInfo();
    }, [isConnected])

    return { userInfo };
}