import { useDisconnect } from 'wagmi';

// eslint-disable-next-line import/prefer-default-export
export const useRockoDisconnect = () => {
  console.log({ useDisconnect: useDisconnect() });
  const { disconnect } = useDisconnect();

  // const disconnect = () => {
  //   // logout user and clear session data
  // }

  return { disconnect };
};
