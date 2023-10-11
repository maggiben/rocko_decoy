import { ZeroDevWeb3Auth } from '@zerodev/web3auth';

export const useZeroDev = () => {
    const zeroDevWeb3Auth = new ZeroDevWeb3Auth([process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || ""]);

    const getUserInfo = async () => {
        return await zeroDevWeb3Auth.getUserInfo();
    }

    return {
        getUserInfo
    }
}

