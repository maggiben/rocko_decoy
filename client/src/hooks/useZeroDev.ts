import { ZeroDevWeb3Auth } from '@zerodev/web3auth';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ZERODEV_PROJECT_ID } from '@/constants/env';
import setTokens from '@/utility/setTokens';

// eslint-disable-next-line import/prefer-default-export
export const useZeroDev = () => {
  const { isConnected } = useAccount();

  const [userInfo, setUserInfo] = useState<any>();
  const [zeroDevWeb3Auth] = useState(
    ZeroDevWeb3Auth.getInstance([ZERODEV_PROJECT_ID]),
  );

  useEffect(() => {
    if (isConnected) {
      zeroDevWeb3Auth.getUserInfo().then((res): void => {
        // Set token in session storage for use with backend authentication
        setTokens(res?.idToken || '');
        setUserInfo(res);
      });
    } else {
      // todo other areas of the app may not be actually removing the token from session storage
      sessionStorage.removeItem('token');
      setUserInfo(null);
    }
  });

  return { userInfo, setUserInfo };
};
