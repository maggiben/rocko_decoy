import { useBalance } from 'wagmi';

// type FetchBalanceResult = {
//   decimals: number; // currency decimals, eg 6 or 18
//   formatted: string; // whole unit eg ETH or USDC
//   symbol: string; // ticker
//   value: bigint; // balance in smallest unit
// };

// eslint-disable-next-line import/prefer-default-export
export const useRockoBalance = ({
  address, // wallet address for eth balance
  token = undefined, // include token contract address for token balance
}: {
  address: `0x${string}`;
  token?: `0x${string}` | undefined;
}) => {
  const { data } = useBalance({ address, token });
  console.log('balance', { data });
  return {
    // todo error handling if data is undefined
    data: {
      decimals: data?.decimals,
      formatted: data?.formatted,
      symbol: data?.symbol,
      value: data?.value,
    },
  };
};
