import { useState, useEffect, useCallback } from 'react'
import { ZeroDevWeb3Auth } from '@zerodev/web3auth';
import { useAccount } from 'wagmi';

export const useUserInfo = () => {
    const [ userInfo, setUserInfo ] = useState<any>();
    const { isConnected } = useAccount();

    useEffect(() => {
        const getInfo = async () => {
            if (isConnected) {
                const zeroDevWeb3Auth = new ZeroDevWeb3Auth([process.env.REACT_APP_ZERODEV_PROJECT_ID || "86d9c9d6-93cc-4301-a625-667f44c7410a"])
                const info = await zeroDevWeb3Auth.getUserInfo();
                setUserInfo(info);
            }
        };

        getInfo();
    }, [isConnected])

    return { userInfo };
}