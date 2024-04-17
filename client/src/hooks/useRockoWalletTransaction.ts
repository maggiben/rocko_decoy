/* eslint-disable import/prefer-default-export */
import {
  useContractBatchWrite,
  usePrepareContractBatchWrite,
} from '@zerodev/wagmi';
import { ethers } from 'ethers';
import { useWaitForTransaction } from 'wagmi';
import { USDCContract, WETHContract, networkChainId } from '@/constants';
import { parseBalance } from '@/utility/utils';
import { useRockoAccount } from './useRockoAccount';

const WETHABI = require('../constants/weth.json');
const USDCABI = require('../constants/usdc.json');

export const useRockoWalletTransaction = ({
  destination,
  ethBalance,
  wethBalance,
  usdcBalance,
  setTxHash,
  setConfirmed,
}: any) => {
  const { address: wagmiAddress } = useRockoAccount();

  const { config } = usePrepareContractBatchWrite(
    wagmiAddress && ethers.utils.isAddress(destination)
      ? {
          calls: [
            {
              to: destination as `0x${string}`,
              data: '0x',
              value: ethBalance,
            },
            {
              address: WETHContract[networkChainId],
              abi: WETHABI,
              functionName: 'transfer',
              args: [destination, parseBalance(wethBalance)],
            },
            {
              address: USDCContract[networkChainId],
              abi: USDCABI,
              functionName: 'transfer',
              args: [destination, parseBalance(usdcBalance, 6)],
            },
          ],
          enabled: true,
        }
      : {
          calls: [],
          enabled: true,
        },
  );

  const { sendUserOperation: batchWithdraw, data: batchWithdrawData } =
    useContractBatchWrite(config);

  useWaitForTransaction({
    hash: batchWithdrawData?.hash,
    enabled: !!batchWithdrawData,
    onSuccess() {
      if (batchWithdrawData?.hash) {
        setTxHash(batchWithdrawData?.hash);
        setConfirmed(true);
      }
    },
  });

  return {
    batchWithdraw,
  };
};
