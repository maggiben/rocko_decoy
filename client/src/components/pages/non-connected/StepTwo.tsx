'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { useAddress } from '@thirdweb-dev/react';
// import LoanComplete from '@/components/chips/LoanComplete/LoanComplete';
import CircleProgressBar from '@/components/chips/CircleProgressBar/CircleProgressBar';
// import ModalContainer from '@/components/chips/ModalContainer/ModalContainer';
import StatusSuccess from '@/assets/StatusSuccess.png';
import { useGetLoan } from '@/contract/batch';
import { useSingleLoan } from '@/contract/single';
import { BLOCKCHAIN } from '@/constants/env';
import { useLoanDB } from '@/db/loanDb';
import { useUserDB } from '@/db/userDb';
import { LoanData } from '@/types/type';
import { useZeroDev } from '@/hooks/useZeroDev';
import { etherscanLink } from '@/utility/utils';
import logger from '@/utility/logger';
import contentCopy from '@/assets/content_copy.svg';
import checkmark from '@/assets/correct.svg';

interface DoneTracker {
  step: string;
}

function StepTwo() {
  const router = useSearchParams(); //! use the hooks for getting the URL parameters
  const type = router.get('type') || '';

  const retrievedData = sessionStorage.getItem('loanData');
  const loanData: LoanData = JSON.parse(retrievedData || '{}');

  const anotherData = sessionStorage.getItem('borrowMoreData');
  const borrowMoreData = JSON.parse(anotherData || '{}');

  const borrowing =
    type === 'add' ? borrowMoreData?.payment_loan : loanData?.borrowing;
  const collateral =
    type === 'add'
      ? borrowMoreData?.payment_collateral
      : loanData?.collateralNeeded;

  const [isExistLoan, setIsExistLoan] = useState<boolean>(false);
  const [totalBorrowing, setTotalBorrowing] = useState<number>(borrowing);
  const [totalCollateral, setTotalCollateral] = useState<number>(collateral);

  const [activeDone, setActiveDone] = useState(false);
  const [startA, setStartA] = useState(false);
  const [startB, setStartB] = useState(false);

  const [counter, setCounter] = useState(3);
  const [progress, setProgress] = useState(0);
  const [progressTracker, setProgressTracker] = useState(0);
  const [doneTracker, setDoneTracker] = useState<DoneTracker[]>([]);
  // const [completeModal,  setCompleteModal] = useState(false);

  // get User info
  const { userInfo } = useZeroDev();
  // for Database
  const { finalizeLoan, getLoanData } = useLoanDB();
  const { getUserId } = useUserDB();
  // Thirdweb for EOA
  const address = useAddress();
  const { depositZerodevAccount } = useSingleLoan();
  // Wagmi for ZeroDev Smart wallet
  const { address: wagmiAddress } = useAccount();
  const { data } = useBalance({ address: address as `0x${string}` });

  const { chain } = useNetwork();
  const { executeBatchGetLoan, batchGetLoan, success, txHash, error } =
    useGetLoan(collateral || 0, borrowing || 0);

  const start = async () => {
    if (!wagmiAddress || !address || !(loanData || borrowMoreData)) return;
    if (chain && chain.name.toUpperCase() !== BLOCKCHAIN.toUpperCase()) {
      toast.error('Invalid Network!');
      return;
    }
    if (Number(data?.formatted) < collateral) {
      toast.error('Insufficient Collateral Balance!');
      return;
    }

    setStartA(true);

    const collateralReceived = await receiveCollateral();
    if (collateralReceived) {
      setADone();

      // batch transactions
      executeBatchGetLoan();
      setStartB(true);
    } else {
      setAError();
    }
  };

  const receiveCollateral = async (): Promise<any> => {
    if (!wagmiAddress || !(loanData || borrowMoreData)) return null;

    const depositResult = await depositZerodevAccount(
      wagmiAddress,
      collateral,
      'ETH',
    );
    return depositResult;
  };

  const setADone = () => {
    setStartA(false);
    setProgress(0);
    setDoneTracker([...doneTracker, { step: 'one' }]);
  };

  const setAError = () => {
    setStartA(false);
    setProgress(0);
    setCounter(3);
  };

  const setAllDone = async (txHash: string) => {
    const user_id = await getUserId(userInfo?.email);
    finalizeLoan(
      user_id,
      txHash,
      'compound',
      true,
      'ETH',
      totalBorrowing,
      totalCollateral,
      isExistLoan,
    );

    setDoneTracker([...doneTracker, { step: 'two' }]);
    setStartB(false);
    setActiveDone(true);
  };

  const setInitialParams = async () => {
    if (userInfo) {
      const user_id = await getUserId(userInfo?.email);

      getLoanData(user_id).then((result) => {
        if (result && result.length > 0) {
          // set isExistLoan
          const match_loan = result.filter(
            (loan: any) => loan.loan_active === 1,
          );
          if (match_loan && match_loan.length > 0) {
            setIsExistLoan(true);
            setTotalBorrowing(match_loan[0].outstanding_balance + borrowing);
            setTotalCollateral(match_loan[0].collateral + collateral);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (batchGetLoan !== undefined && userInfo !== undefined) {
      setInitialParams();
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchGetLoan, userInfo]);

  useEffect(() => {
    if (error) logger(JSON.stringify(error, null, 2));

    if (success) {
      toast(() => (
        <div className="flex items-center underline gap-2">
          <Image className="w-6 h-6" src={StatusSuccess} alt="success" />
          <a
            className="hover:text-green-700"
            target="_blank"
            href={etherscanLink(txHash)}
            rel="noopener noreferrer"
          >
            Loan successfully fulfilled!
          </a>
        </div>
      ));

      setAllDone(txHash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, txHash, error]);

  // for timer
  useEffect(() => {
    if (startA || startB) {
      const interval = setInterval(() => {
        if (counter === 0) {
          clearInterval(interval);
        } else {
          setCounter(counter - 1);
        }
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [startA, startB, counter]);
  // for progressbar interface
  useEffect(() => {
    if (startA) {
      setProgressTracker(0);

      const interval = setInterval(() => {
        if (progress === 80) {
          clearInterval(interval);
        } else {
          setProgress((prevProg) => prevProg + 20);
        }
      }, 7000);

      return () => clearInterval(interval);
    }
    if (startB) {
      setProgressTracker(1);

      const interval = setInterval(() => {
        if (progress === 80) {
          clearInterval(interval);
        } else {
          setProgress((prevProg) => prevProg + 20);
        }
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [startA, startB, progress]);

  //
  return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
      <h1 className="text-2xl lg:text-3xl text-blackPrimary lg:text-start text-center">
        {activeDone
          ? 'Fulfilling Loan'
          : startA
            ? 'Waiting for Collateral'
            : 'Depositing Collateral'}
      </h1>
      {/* <p className="text-blackPrimary text-[14px] mt-1">
        Please do not close your browser until all of the steps below are
        completed.
      </p> */}
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <p className="text-blackPrimary">Estimated time remaining</p>
          <h1 className="text-2xl font-semibold text-blackPrimary mb-4">
            {' '}
            {`${activeDone ? 'Complete!' : `${counter} minutes`}`}{' '}
          </h1>
          <div className="px-4 py-6 rounded-[16px] bg-[#F9F9F9] flex justify-between items-center mb-3">
            <p
              className={`${
                progressTracker === 0 || doneTracker[0]?.step === 'one'
                  ? 'text-blackPrimary'
                  : 'text-[#757575]'
              }`}
            >
              Collateral Received
            </p>
            {doneTracker[0]?.step === 'one' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.3327 10.0003C18.3327 14.6027 14.6017 18.3337 9.99935 18.3337C5.39698 18.3337 1.66602 14.6027 1.66602 10.0003C1.66602 5.39795 5.39698 1.66699 9.99935 1.66699C14.6017 1.66699 18.3327 5.39795 18.3327 10.0003Z"
                  fill="#05944F"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.7566 8.08964L8.75071 14.0956L4.82812 10.173L6.00664 8.99447L8.75071 11.7385L13.5781 6.91113L14.7566 8.08964Z"
                  fill="white"
                />
              </svg>
            )}
            {progressTracker === 0 && !(doneTracker[0]?.step === 'one') && (
              <CircleProgressBar
                circleWidth={18}
                radius={7}
                percentage={progress}
                strokeWidth={2}
              />
            )}
          </div>
          <div className="px-4 py-6 rounded-[16px] bg-[#F9F9F9] flex justify-between items-center mb-3">
            <p
              className={`${
                progressTracker === 1 || doneTracker[1]?.step === 'two'
                  ? 'text-blackPrimary'
                  : 'text-[#757575]'
              }`}
            >
              Collateral Deposited in Lending Protocol
            </p>
            {doneTracker[1]?.step === 'two' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.3327 10.0003C18.3327 14.6027 14.6017 18.3337 9.99935 18.3337C5.39698 18.3337 1.66602 14.6027 1.66602 10.0003C1.66602 5.39795 5.39698 1.66699 9.99935 1.66699C14.6017 1.66699 18.3327 5.39795 18.3327 10.0003Z"
                  fill="#05944F"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.7566 8.08964L8.75071 14.0956L4.82812 10.173L6.00664 8.99447L8.75071 11.7385L13.5781 6.91113L14.7566 8.08964Z"
                  fill="white"
                />
              </svg>
            )}

            {progressTracker === 1 && !(doneTracker[1]?.step === 'two') && (
              <CircleProgressBar
                circleWidth={18}
                radius={7}
                percentage={progress}
                strokeWidth={2}
              />
            )}
          </div>
          <div className="px-4 py-6 rounded-[16px] bg-[#F9F9F9] flex justify-between items-center mb-3">
            <p
              className={`${
                progressTracker === 1 || doneTracker[1]?.step === 'two'
                  ? // progressTracker === 2 || doneTracker[2]?.step === "three"
                    'text-blackPrimary'
                  : 'text-[#757575]'
              }`}
            >
              Loan Delivered to Your Account
            </p>
            {/* {doneTracker[2]?.step === "three" && ( */}
            {doneTracker[1]?.step === 'two' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.3327 10.0003C18.3327 14.6027 14.6017 18.3337 9.99935 18.3337C5.39698 18.3337 1.66602 14.6027 1.66602 10.0003C1.66602 5.39795 5.39698 1.66699 9.99935 1.66699C14.6017 1.66699 18.3327 5.39795 18.3327 10.0003Z"
                  fill="#05944F"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.7566 8.08964L8.75071 14.0956L4.82812 10.173L6.00664 8.99447L8.75071 11.7385L13.5781 6.91113L14.7566 8.08964Z"
                  fill="white"
                />
              </svg>
            )}
            {/* {progressTracker === 2 && !(doneTracker[2]?.step === "three") && ( */}
            {progressTracker === 1 && !(doneTracker[1]?.step === 'two') && (
              <CircleProgressBar
                circleWidth={18}
                radius={7}
                percentage={progress}
                strokeWidth={2}
              />
            )}
          </div>
        </div>
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6 mt-[16px] md:mt-[24px]">
          <h4 className="text-blackPrimary font-medium	text-[20px]">
            Collateral Instructions
          </h4>
          <p className="text-blackPrimary font-normal mt-[8px]	text-[14px]">
            Please send the Amount Required to your Rocko wallet. Your loan will
            not be fulfilled until this amount is received.
          </p>
          <div className="border-b-2 py-[16px] flex justify-between items-center">
            <div>
              <p className="font-normal	text-blackSecondary text-[14px]">
                Amount Received
              </p>
              <p className="font-normal	text-blackPrimary text-[16px]">0 ETH</p>
            </div>
            <div className="flex items-center gap-x-[4px] bg-[#E6F2ED] rounded-[5px] py-[3px] ps-[4px] pe-[8px] cursor-pointer">
              <Image
                src={checkmark}
                alt="contentCopy"
                className="cursor-pointer"
              />
              <p className="text-[#05944F] text-[12px] font-medium leading-4">
                Amount Received
              </p>
            </div>
          </div>
          <div className="border-b-2 py-[16px] flex justify-between items-center">
            <p className="font-normal	text-blackSecondary text-[14px]">
              Amount Required
              <p className="font-normal	text-blackPrimary text-[16px]">
                14.7341 ETH
              </p>
            </p>
          </div>
          <div className="flex justify-between items-center pt-[16px]">
            <div>
              <p className="font-normal	text-blackSecondary text-[14px]">
                Rocko Wallet Address
              </p>
              <p className="font-normal	text-blackPrimary text-[16px]">
                0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
              </p>
            </div>
            <Image
              src={contentCopy}
              alt="contentCopy"
              className="cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* footer */}
      <div className="h-20 w-full" />
      <div className=" mt-24 fixed bottom-0 left-0 w-full bg-white ">
        <div className="bg-[#F7F7F7] h-1 w-full relative">
          <div
            /*  style={{
              width: `${(100 / loanSteps.length) * (currentStep + 1)}%`,
            }} */
            className="duration-500 bg-blue h-full absolute left-0 top-0 w-full"
          />
        </div>
        <div className="container mx-auto">
          <div className="p-4 flex items-center justify-between  ">
            <p className="text-blackPrimary text-xs md:text-sm font-medium">
              {/* //todo remove it later */}
              {/* {stepsName[currentStep]}: {currentStep + 1}/ {loanSteps.length} 
              
            {loanData?.activeNextButton?.valueOf()} */}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                // onClick={() => setCompleteModal(true)}
                className={`font-semibold  text-xs md:text-sm ${
                  !activeDone ? 'bg-blue/40' : 'bg-blue'
                } py-[10px] px-6 rounded-full text-white`}
                disabled={!activeDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default StepTwo;
