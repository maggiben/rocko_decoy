import { ZeroDevWeb3Auth } from '@zerodev/web3auth';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ZERODEV_PROJECT_ID } from '@/constants/env';

// eslint-disable-next-line import/prefer-default-export
export const useZeroDev = () => {
  const { isConnected } = useAccount();

  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    if (isConnected) {
      const zeroDevWeb3Auth = ZeroDevWeb3Auth.getInstance([ZERODEV_PROJECT_ID]);
      zeroDevWeb3Auth.getUserInfo().then((res): void => {
        // Set token in session storage for use with backend authentication
        sessionStorage.setItem('token', res?.idToken || '');
        setUserInfo(res);
      });
    }
  });

  return { userInfo };
};
