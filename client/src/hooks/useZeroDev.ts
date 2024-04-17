import { ZeroDevWeb3Auth } from '@zerodev/web3auth';
import { Auth0WalletConnector } from '@zerodev/wagmi';
import * as blockchains from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useState, useEffect } from 'react';
import { configureChains, useConnect } from 'wagmi';
import { NETWORK, ZERODEV_PROJECT_ID } from '@/constants/env';
import setTokens from '@/utility/setTokens';
import { useRockoAccount } from './useRockoAccount';

// eslint-disable-next-line import/prefer-default-export
export const useZeroDev = () => {
  const { isConnected } = useRockoAccount();
  const net = (blockchains as { [key: string]: any })[NETWORK];
  const { isSuccess } = useConnect();
  const { chains } = configureChains([net], [publicProvider()]);
  const { connect } = useConnect();
  const [userInfo, setUserInfo] = useState<any>();
  const [zeroDevWeb3Auth] = useState(
    ZeroDevWeb3Auth.getInstance([ZERODEV_PROJECT_ID]),
  );

  const auth0Connector = new Auth0WalletConnector({
    chains,
    options: {
      projectId: ZERODEV_PROJECT_ID,
      shimDisconnect: true,
      // bundlerProvider: 'PIMLICO',
      // paymasterProvider: 'PIMLICO',
    },
  });

  const loginZerodev = async () => {
    connect({
      connector: auth0Connector,
    });
  };

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
  console.log({ loginZerodev, isSuccess });
  return { userInfo, setUserInfo, loginUser: loginZerodev, isSuccess };
};
