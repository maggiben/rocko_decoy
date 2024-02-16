/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { writeContract, waitForTransaction, fetchBalance } from 'wagmi/actions';
import { useAddress } from '@thirdweb-dev/react';
import LoanComplete from '@/components/chips/LoanComplete/LoanComplete';
import CircleProgressBar from '@/components/chips/CircleProgressBar/CircleProgressBar';
import ModalContainer from '@/components/chips/ModalContainer/ModalContainer';
import StatusSuccess from '@/assets/StatusSuccess.png';
import { BLOCKCHAIN, PAYMENT_BUFFER } from '@/constants/env';
import { useSingleLoan } from '@/contract/single';
import { useLoanDB } from '@/db/loanDb';
import { useUserDB } from '@/db/userDb';
import { useRepayFull, useRepaySome } from '@/contract/batch';
import { USDCContract, networkChainId } from '@/constants';
import { useZeroDev } from '@/hooks/useZeroDev';
import { etherscanLink, parseBalance } from '@/utility/utils';

const USDCABI = require('../../../../../constants/usdc.json');

interface DoneTracker {
  step: string;
}

function Processing() {
  const { single: loanIndex } = useParams(); //! by using this hook get the URL parameter
  const router = useSearchParams(); //! use the hooks for getting the URL parameters
  const payment = parseFloat(router.get('payment') || '0'); //! get the URL parameter payment value
  let currentBalance = parseFloat(router.get('balance') || '0');
  currentBalance +=
    payment - currentBalance === Number(PAYMENT_BUFFER)
      ? Number(PAYMENT_BUFFER)
      : 0;

  // DB for getting loanBalance and collateral
  const { getLoanData, updateLoan } = useLoanDB();
  const [loanData, setLoanData] = useState<any>();
  const [collateral, setCollateral] = useState<number>(0);
  const [outStandingBalance, setOutStandingBalance] = useState<number>(0);
  const [originalborrowBalance, setOriginalBorrowBalance] = useState<number>(0);

  // Thirdweb for EOA
  const address = useAddress();
  const { depositZerodevAccount, getBorrowBalanceOf, getCollateralBalanceOf } =
    useSingleLoan();
  const { data } = useBalance({
    address: address as `0x${string}`,
    token: USDCContract[networkChainId] as `0x${string}`,
  });
  // Wagmi for ZeroDev Smart wallet
  const { address: zerodevAccount } = useAccount();
  const { userInfo } = useZeroDev();
  const { getUserId } = useUserDB();
  const { chain } = useNetwork();
  const { executeBatchRepaySome, batchRepaySome, success, txHash } =
    useRepaySome(payment);
  const {
    executeBatchRepayFull,
    batchRepayFull,
    success: fullySuccess,
    txHash: fullyTxHash,
  } = useRepayFull(collateral);

  const [activeDoing, setActiveDoing] = useState(false); //! done btn will active and counter coverts to "Completed" when all loader completed.
  const [activeDone, setActiveDone] = useState(false); //! done btn will active and counter coverts to "Completed" when all loader completed.
  const [startA, setStartA] = useState(false); // true when depositLoan to zerodevAccount
  const [startB, setStartB] = useState(false); // true when start batchTransactions

  const [counter, setCounter] = useState(3); //! countdown
  const [progress, setProgress] = useState(0); //! showing the loader progress
  const [progressTracker, setProgressTracker] = useState(0); //! when progress will hit 100 then progressTracker is incremented by 1
  const [doneTracker, setDoneTracker] = useState<DoneTracker[]>([]); //! when progress will hit 100 and progressTracker is incremented by 1 then doneTracker is incremented by 1
  const [completeModal, setCompleteModal] = useState(false); //! after clicking done btn completeModal popup shows

  const initialize = async () => {
    if (userInfo) {
      const borrowBalance = await getBorrowBalanceOf();
      if (originalborrowBalance === 0) {
        setOriginalBorrowBalance(borrowBalance);
      }

      const collateralBalance = await getCollateralBalanceOf();
      setCollateral(collateralBalance);

      const user_id = await getUserId(userInfo?.email);
      const result = await getLoanData(user_id);
      if (result) {
        const active_loans = result.filter(
          (loan: any) => loan.loan_active === 1,
        );
        if (active_loans.length > 0) {
          setLoanData(active_loans[0]);
          setOutStandingBalance(active_loans[0]?.outstanding_balance);
        }
      }
    }
  };

  const start = async () => {
    if (!zerodevAccount || !address) return; // !zerodevAccount - logout, !address - no EOA
    if (chain && chain.name.toUpperCase() !== BLOCKCHAIN.toUpperCase()) {
      toast.error('Invalid Network!');
      return;
    }
    if (Number(data?.formatted) < payment) {
      toast.error('Insufficient loan Balance!');
      return;
    }

    setStartA(true);
    const loanReceived = await receiveLoan();
    if (loanReceived) {
      setADone();

      // batch transactions
      currentBalance === payment
        ? executeBatchRepayFull()
        : executeBatchRepaySome();

      setStartB(true);
    } else {
      setAError();
    }
  };

  const receiveLoan = async () => {
    if (!zerodevAccount) return;
    const depositResult = await depositZerodevAccount(
      zerodevAccount,
      payment,
      'USDC',
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
    updateLoan(
      'repay',
      loanData?.id,
      outStandingBalance - payment < 0 ? 0 : outStandingBalance - payment,
      currentBalance !== payment,
      collateral,
      originalborrowBalance - outStandingBalance,
      txHash,
    );

    setDoneTracker([...doneTracker, { step: 'two' }]);
    setStartB(false);
    setActiveDone(true);
    setCompleteModal(true);
  };

  const withdrawUSDC = async () => {
    const balance = await fetchBalance({
      address: zerodevAccount as `0x${string}`,
      token: USDCContract[networkChainId] as `0x${string}`,
    });

    const { hash } = await writeContract({
      address: USDCContract[networkChainId] as `0x${string}`,
      abi: USDCABI,
      functionName: 'transfer',
      args: [address, parseBalance(balance?.formatted, 6)],
    });

    await waitForTransaction({ hash });

    toast(() => (
      <div className="flex items-center underline gap-2">
        <Image className="w-6 h-6" src={StatusSuccess} alt="success" />
        <Link
          className="hover:text-green-700"
          href={etherscanLink(fullyTxHash)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Loan successfully repaid!
        </Link>
      </div>
    ));

    setAllDone(fullyTxHash);
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    if (
      !activeDoing &&
      userInfo !== undefined &&
      loanData &&
      batchRepayFull !== undefined &&
      batchRepaySome !== undefined
    ) {
      start();
      setActiveDoing(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, loanData, batchRepayFull, batchRepaySome]);

  useEffect(() => {
    if (fullySuccess) {
      withdrawUSDC();
    }

    if (success) {
      toast(() => (
        <div className="flex items-center underline gap-2">
          <Image className="w-6 h-6" src={StatusSuccess} alt="success" />
          <Link
            className="hover:text-green-700"
            href={etherscanLink(txHash)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Loan successfully repaid!
          </Link>
        </div>
      ));

      setAllDone(txHash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullySuccess, success, fullyTxHash, txHash]);

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

  return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
      <h1 className="text-[28px] lg:text-3xl font-medium text-center lg:text-left">
        {startB
          ? 'Processing Payment'
          : activeDone
            ? 'Payment Complete'
            : 'Waiting for Payment'}
      </h1>
      <p className="text-black mt-1">
        Please do not close your browser until all of the steps below are
        completed.
      </p>
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <p className="text-black">Estimated time remaining</p>
          <h1 className="text-2xl font-semibold mb-4">
            {' '}
            {`${activeDone ? 'Complete!' : `${counter} minutes`}`}{' '}
          </h1>
          <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
            <div
              className={`${
                progressTracker === 0 || doneTracker[0]?.step === 'one'
                  ? 'text-black'
                  : 'text-gray-400'
              } text-sm font-medium flex items-center gap-2`}
            >
              <p className="">Payment Received</p>
            </div>
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
          <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
            <div
              className={`${
                progressTracker === 1 || doneTracker[1]?.step === 'two'
                  ? 'text-black'
                  : 'text-gray-400'
              } text-sm font-medium flex items-center gap-2`}
            >
              <p className="">Payment Made to Lending Protocol</p>
            </div>
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

          {payment === currentBalance && (
            <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
              <p
                className={`${
                  progressTracker === 1 || doneTracker[1]?.step === 'two'
                    ? 'text-black'
                    : 'text-gray-400'
                }  text-sm font-medium`}
              >
                Collateral Withdrawn to Your Account
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
          )}
        </div>
      </section>
      {completeModal ? (
        <ModalContainer>
          {payment === currentBalance ? (
            <LoanComplete
              title="Payment Complete"
              details="You have successfully repaid your loan. Your collateral and any earned rewards have been withdrawn to your account or wallet. "
              id={0}
            />
          ) : (
            <LoanComplete
              title="Payment Complete"
              details="You have successfully made a payment"
              id={Number(loanIndex)}
            />
          )}
        </ModalContainer>
      ) : null}

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
          <div className="p-4">
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setCompleteModal(true); //! after clicking done btn completeModal popup shows
                }}
                className={`font-semibold  text-xs md:text-sm ${
                  activeDone ? 'bg-blue' : 'bg-blue/40'
                } py-[10px]  px-6 rounded-full text-white `}
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

export default Processing;
