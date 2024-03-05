import closeIcon from '@/assets/Close.svg';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import StatusSuccess from '@/assets/StatusSuccess.png';
import { etherscanLink, parseBalance } from '@/utility/utils';
import { useAccount, useDisconnect, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import {
  usePrepareContractBatchWrite,
  useContractBatchWrite,
} from '@zerodev/wagmi';
import { WETHContract, networkChainId, USDCContract } from '@/constants';
import logger from '@/utility/logger';
import transactionComp from '@/utility/transactionComp';
import addressValidator from '@/utility/addressValidator';
import ModalContent from '../ModalContent/ModalContent';

const WETHABI = require('../../../constants/weth.json');
const USDCABI = require('../../../constants/usdc.json');

function TransferFundModal({
  setOpenModalFor,
  ethBalance,
  wethBalance,
  usdcBalance,
}: {
  setOpenModalFor: Function;
  ethBalance: bigint | undefined;
  wethBalance: string | undefined;
  usdcBalance: string | undefined;
}) {
  const { address: wagmiAddress } = useAccount();
  const [destination, setDestination] = useState('');
  const { disconnect } = useDisconnect();

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

  const { sendUserOperation: batchWithdraw, data } =
    useContractBatchWrite(config);

  useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data,
    onSuccess() {
      if (data?.hash) {
        transactionComp({
          transactionHash: data?.hash,
          destinationAddress: destination,
        });
        toast(() => (
          <div className="flex items-center underline gap-2">
            <Image className="w-6 h-6" src={StatusSuccess} alt="success" />
            <Link
              className="hover:text-green-700"
              href={etherscanLink(data?.hash)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Withdraw successfully completed!
            </Link>
          </div>
        ));
      }

      setOpenModalFor('');
    },
  });

  const withdraw = async () => {
    // console.log('Withdrawal using token:', sessionStorage.getItem('token'));
    await addressValidator(destination, disconnect);
    try {
      if (batchWithdraw) batchWithdraw();
    } catch (e) {
      logger(JSON.stringify(e, null, 2), 'error');
    }

    setOpenModalFor('');
  };

  return (
    <ModalContent>
      <div className="flex items-start justify-between gap-2 ">
        <h4 className="text-2xl font-semibold font-inter">Transfer Funds</h4>
        {/* close button start */}
        <div>
          <button
            onClick={() => setOpenModalFor('')}
            className="w-8 h-8 rounded-full p-2 bg-[#EEE] block"
          >
            <Image
              src={closeIcon}
              alt=""
              width={16}
              height={16}
              className="w-full"
            />
          </button>
        </div>
        {/* close button end */}
      </div>
      {/* select option */}
      <div className="space-y-3">
        <p className="font-medium text-[#141414]">
          You are transferring all funds in your Rocko smart wallet to the
          address input below
        </p>
      </div>
      {/* input field with react form hook */}
      <div>
        <p className="text-sm mb-2 font-bold"> Enter Wallet Address </p>
        <input
          type="text"
          autoComplete="off"
          id="numberField"
          className="w-full p-4 focus:outline-none border-2 border-gray-200 rounded-lg bg-white number-input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="flex items-start gap-2 ">
        <button
          className={`py-[10px] px-6  rounded-full text-sm font-semibold  ${
            ethers.utils.isAddress(destination)
              ? 'bg-[#2C3B8D] text-white'
              : 'text-gray-100 bg-[#ABB1D1]'
          }`}
          disabled={!ethers.utils.isAddress(destination)}
          onClick={withdraw}
        >
          Confirm
        </button>
        <button
          className="py-[10px] px-6  rounded-full text-sm font-semibold bg-grayPrimary text-[#2C3B8D]"
          onClick={() => setOpenModalFor('')}
        >
          Cancel
        </button>
      </div>
    </ModalContent>
  );
}

export default TransferFundModal;
