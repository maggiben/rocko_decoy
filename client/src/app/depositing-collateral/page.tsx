'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAddress } from '@thirdweb-dev/react';
import Image from 'next/image';
import LoanComplete from '@/components/chips/LoanComplete/LoanComplete';
import CircleProgressBar from '@/components/chips/CircleProgressBar/CircleProgressBar';
import { useLoanDB } from '@/db/loanDb';
import { useUserDB } from '@/db/userDb';
import { LoanData } from '@/types/type';
import { useUserInfo } from '@/hooks/useUserInfo';
import logger from '@/utility/logger';
import TransferCollateral from '@/components/chips/TransferCollateral/TransferCollateral';
import transactionComp from '@/utility/transactionComp';
import { CometContract, networkChainId } from '@/constants';
import { useSingleLoan } from '@/contract/single';
import { useGetLoan } from '@/protocols/compound/util/batch';
import { useRockoAccount } from '@/hooks/useRockoAccount';
import { useRockoBalance } from '@/hooks/useRockoBalance';
import FinishLoanTransaction from '@/components/chips/FinishLoan/FinishLoan';
import financial from '@/utility/currencyFormate';
import contentCopy from '@/assets/content_copy.svg';
import CancelLoanModal from '@/components/chips/CancelLoanModal/CancelLoanModal';
import isSufficientCollateral from '@/utility/isSufficientCollateral';

interface DoneTracker {
  step: string;
}

interface UiState {
  showTransferCollateralModal: boolean;
  showFinishLoanModal: boolean;
  showLoanCompleteModal: boolean;
  showCancelLoanModal: boolean;
}

const DepositingCollateral = () => {
  // Router
  const router = useSearchParams();
  const type = router.get('type') || '';
  const navRouter = useRouter();

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

  const isJustBorrowMore =
    type === 'add' &&
    (!anotherData || borrowMoreData?.payment_collateral === 0);

  const [uiState, setUiState] = useState({
    showTransferCollateralModal: false,
    showFinishLoanModal: false,
    showLoanCompleteModal: false,
    showCancelLoanModal: false,
  });

  const updateUiState = (newState: Partial<UiState>) => {
    setUiState((prev) => ({ ...prev, ...newState }));
  };

  const [isExistLoan, setIsExistLoan] = useState<boolean>(false);
  const [existLoanId, setExistLoanId] = useState<number>(0);
  const [totalBorrowing, setTotalBorrowing] = useState<number>(borrowing);
  const [totalCollateral, setTotalCollateral] = useState<number>(collateral);
  const [collateralReceived, setCollateralReceived] = useState<boolean>(false);
  const [triggerRefetch, setTriggerRefetch] = useState(true);
  const [startTransactions, setStartTransactions] = useState(false);
  const [isExternalWallet, setIsExternalWallet] = useState(false);

  const [activeDone, setActiveDone] = useState(false);
  const [startA, setStartA] = useState(false);
  const [startB, setStartB] = useState(false);

  const [counter, setCounter] = useState(3);
  const [progress, setProgress] = useState(0);
  const [progressTracker, setProgressTracker] = useState(0);
  const [doneTracker, setDoneTracker] = useState<DoneTracker[]>([]);

  // get User info
  const { userInfo } = useUserInfo();
  // for Database
  const { finalizeLoan, getLoanData } = useLoanDB();
  const { getUserId } = useUserDB();
  // Thirdweb for EOA
  const address = useAddress();

  const { depositZerodevAccount } = useSingleLoan();
  // Wagmi for ZeroDev Smart wallet
  const { address: rockoWalletAddress } = useRockoAccount();

  const { data: rockoWalletBalance, refetch } = useRockoBalance({
    address: rockoWalletAddress as `0x${string}`,
  });

  const transactionMode = () => {
    if (isJustBorrowMore) return 'borrowMore';
    return 'getLoan';
  };

  const { executeBatchTransactions, success, txHash, error } = useGetLoan(
    collateral || 0,
    borrowing || 0,
    loanData,
    transactionMode(),
  );

  /* USE EFFECTS */
  // Check if this loan is for an external wallet
  useEffect(() => {
    if (loanData?.paymentMethod === 'other') {
      setIsExternalWallet(true);
    }
  }, [loanData]);

  useEffect(() => {
    if (!triggerRefetch) return;

    if (
      isSufficientCollateral(rockoWalletBalance?.formatted, collateral) &&
      !startTransactions
    ) {
      setCollateralReceived(true);
      setADone();
      updateUiState({
        showTransferCollateralModal: false,
        showFinishLoanModal: true,
      });
    } else {
      updateUiState({
        showTransferCollateralModal: true,
        showFinishLoanModal: false,
      });
    }

    const intervalId = setInterval(refetch, 1000);

    return () => clearInterval(intervalId);
  }, [triggerRefetch, refetch, rockoWalletBalance]);

  /* Use Effect for handling metamask payment method */
  useEffect(() => {
    if (userInfo !== undefined && rockoWalletAddress && !isExternalWallet) {
      if (!isSufficientCollateral(rockoWalletBalance?.formatted, collateral)) {
        metaMaskCollectCollateral();
      }
    }
  }, [userInfo, rockoWalletAddress, isExternalWallet]);

  // Runs when the user clicks the confirm button on the FinishLoanTransaction Modal
  useEffect(() => {
    if (startTransactions) {
      setInitialParams();
      initiateLoan();
    }
  }, [startTransactions]);

  // Handles the success or error of the ZeroDev transactions
  useEffect(() => {
    if (error) {
      logger(JSON.stringify(error, null, 2));
      setStartTransactions(false);
      updateUiState({
        showFinishLoanModal: true,
      });
    }

    if (success) {
      console.log('TxHash: ', txHash);
      console.log('success');
      setTriggerRefetch(false);
      setStartTransactions(false);
      setAllDone(txHash);
      updateUiState({
        showFinishLoanModal: false,
        showLoanCompleteModal: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, txHash, error]);

  /* Timer and Progress Bar */
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

  useEffect(() => {
    if (type === 'start') {
      setStartA(true);
    }
  }, [type]);

  /* Functions */
  // Initiates the loan creation flow
  const metaMaskCollectCollateral = async () => {
    if (!rockoWalletAddress) return;
    console.log(1, { startA });
    setStartA(true);
    console.log(2, { startA });

    let rockoAccountHasCollateral = collateralReceived;
    if (!collateralReceived && !isExternalWallet) {
      rockoAccountHasCollateral = await receiveCollateral();
    }
    if (rockoAccountHasCollateral) {
      updateUiState({
        showTransferCollateralModal: false,
        showFinishLoanModal: true,
      });
    }
    setCollateralReceived(rockoAccountHasCollateral);
  };

  const initiateLoan = async () => {
    if (!rockoWalletAddress || (isExternalWallet && !loanData.otherAddress)) {
      console.log('No Wallet Address');
      console.log(rockoWalletAddress);
      console.log(loanData);
      return;
    }
    console.log(1, { startA });
    setStartA(true);
    console.log(2, { startA });

    if (!isSufficientCollateral(rockoWalletBalance?.formatted, collateral)) {
      toast.error('Insufficient Collateral Balance!');
      setStartTransactions(false);
      setTriggerRefetch(true);
      updateUiState({
        showTransferCollateralModal: true,
        showFinishLoanModal: false,
      });
      setAError();
    } else {
      setCollateralReceived(true);
      setADone();

      executeBatchTransactions();
      setStartB(true);
    }
  };

  const receiveCollateral = async (): Promise<any> => {
    if (!collateral) {
      console.log('Mising collateral');
    }
    if (!rockoWalletAddress || !collateral) {
      return null;
    }

    console.log('Depositing Collateral');
    const depositResult = await depositZerodevAccount(
      rockoWalletAddress,
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

  const setAllDone = async (txHashLoan: string) => {
    const userId = await getUserId(userInfo?.email);

    const result = await finalizeLoan(
      userId,
      txHashLoan,
      'compound',
      true,
      'ETH',
      totalBorrowing,
      totalCollateral,
      isExistLoan,
    );

    // store transaction
    if (result) {
      saveTransactions(result.value, txHashLoan);
    }

    // clear session storage to avoid duplicate transaction
    clearLoanDataSession();

    setDoneTracker([...doneTracker, { step: 'two' }]);
    setStartB(false);
    setActiveDone(true);
    updateUiState({ showTransferCollateralModal: false });
  };

  const clearLoanDataSession = () => {
    sessionStorage.removeItem(type === 'add' ? 'borrowMoreData' : 'loanData');
  };

  const saveTransactions = async (loanId: any, hash: string) => {
    const metadata_initialCollateral = {
      loan_id: type === 'add' ? existLoanId : loanId,
      asset: 'eth',
      asset_decimals: 18,
      amount: collateral,
      usd_value: loanData?.collateralPrice,
      recipient_address: rockoWalletAddress,
      sender_address: address,
      transaction_type: 'initial_collateral',
      funding_source: loanData?.paymentMethod,
    };
    const metadata_loan = {
      loan_id: type === 'add' ? existLoanId : loanId,
      asset: 'usdc',
      asset_decimals: 6,
      amount: borrowing,
      usd_value: borrowing,
      recipient_address: address,
      sender_address: CometContract[networkChainId],
      transaction_type:
        type === 'add' ? 'loan_increase' : 'new_loan_withdrawal',
      funding_source: loanData?.paymentMethod,
    };

    transactionComp({
      transactionHash: hash,
      metadata: metadata_initialCollateral,
    });
    transactionComp({
      transactionHash: hash,
      metadata: metadata_loan,
    });
  };

  const setInitialParams = async () => {
    if (userInfo) {
      const userId = await getUserId(userInfo?.email);

      getLoanData(userId).then((result) => {
        if (result && result.length > 0) {
          // set isExistLoan
          const matchLoan = result.filter(
            (loan: any) => loan.loan_active === 1,
          );
          if (matchLoan && matchLoan.length > 0) {
            setExistLoanId(matchLoan[0]?.id);
            setIsExistLoan(true);
            setTotalBorrowing(matchLoan[0].outstanding_balance + borrowing);
            setTotalCollateral(
              Number(matchLoan[0].collateral) + Number(collateral),
            );
          }
        }
      });
    }
  };

  const renderLoanStatus = () => {
    if (activeDone) return 'Fulfilling Loan';
    if (startA) return 'Waiting for Collateral';
    return 'Depositing Collateral';
  };

  const canCancelLoan = () => {
    if (activeDone) return false;
    if (startTransactions) return false;
    return true;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(rockoWalletAddress);
  };

  const handleCopy = () => {
    copyToClipboard();
  };

  /* Modal Functions */
  const onBackTransferCollateral = () => {
    updateUiState({ showTransferCollateralModal: false });
  };

  const onBackFinishLoan = () => {
    updateUiState({
      showFinishLoanModal: false,
      showTransferCollateralModal: false,
    });
  };

  const proceedAnyway = () => {
    updateUiState({
      showFinishLoanModal: true,
      showTransferCollateralModal: false,
    });
  };

  const finalizeLoanTransfer = () => {
    setStartTransactions(true);
    setTriggerRefetch(false);
    updateUiState({
      showFinishLoanModal: false,
    });
  };

  const cancelLoan = () => {
    updateUiState({
      showFinishLoanModal: false,
      showTransferCollateralModal: false,
      showCancelLoanModal: true,
    });
  };

  const confirmCancel = () => {
    updateUiState({
      showCancelLoanModal: false,
    });
    navRouter.push('/');
  };

  const onViewDetails = () => {
    if (!isExternalWallet) {
      metaMaskCollectCollateral;
    } else {
      updateUiState({
        showTransferCollateralModal: true,
      });
    }
  };

  const onFinishLoan = () => {
    updateUiState({
      showCancelLoanModal: false,
    });
  };

  const onProgressLoan = () => {
    if (collateralReceived) {
      updateUiState({
        showFinishLoanModal: true,
        showTransferCollateralModal: false,
      });
    } else {
      updateUiState({
        showTransferCollateralModal: true,
        showFinishLoanModal: false,
      });
    }
  };

  return (
    <main className="container mx-auto px-[15px] sm:py-6">
      <h1 className="text-2xl lg:text-3xl text-blackPrimary lg:text-start text-center">
        {renderLoanStatus()}
      </h1>
      <p className="text-blackPrimary text-[14px] mt-1">
        Please do not close your browser until all of the steps below are
        completed.
      </p>
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <p className="text-blackPrimary">Estimated time remaining</p>
          <h1 className="text-2xl font-semibold text-blackPrimary mb-4">
            {' '}
            {`${activeDone ? 'Complete!' : `${counter} minutes`}`}{' '}
          </h1>
          <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
            <p
              className={`${
                progressTracker === 0 || doneTracker[0]?.step === 'one'
                  ? 'text-black'
                  : 'text-gray-400'
              }`}
            >
              Collateral Received
            </p>
            {collateralReceived && (
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
            {!collateralReceived && (
              <CircleProgressBar
                circleWidth={18}
                radius={7}
                percentage={progress}
                strokeWidth={2}
              />
            )}
          </div>
          <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
            <p
              className={`${
                progressTracker === 1 || doneTracker[1]?.step === 'two'
                  ? 'text-black'
                  : 'text-gray-400'
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

          <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
            <p
              className={`${
                progressTracker === 1 || doneTracker[1]?.step === 'two'
                  ? // progressTracker === 2 || doneTracker[2]?.step === "three"
                    'text-black'
                  : 'text-gray-400'
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
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:pt-6 lg:px-6 lg:mt-6 mt-4">
          <h6 className="text-blackPrimary lg:text-[20px] text-[16px] font-medium	leading-8">
            Collateral Instructions
          </h6>
          <p className="font-normal text-blackPrimary text-[14px] mt-2 leading-5">
            Please send the Amount Required to your Rocko wallet. Your loan will
            not be fulfilled until this amount is received.
          </p>
          <div className="flex justify-between items-center py-[16px]">
            <div>
              <p className="font-normal	text-blackSecondary text-[14px] leading-5	">
                Amount Received
              </p>
              <div className="flex items-center space-between gap-3">
                <p className="font-normal	text-blackPrimary text-[16px] leading-6	">
                  {financial(rockoWalletBalance?.formatted, 4)} ETH{' '}
                </p>
                {collateralReceived && (
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
              </div>
            </div>
          </div>
          <div className="py-[16px]  border-y	">
            <p className="font-normal	text-blackSecondary text-[14px] leading-5	">
              Amount Required
            </p>
            <p className="font-normal	text-blackPrimary text-[16px] leading-6">
              {financial(collateral, 4)} ETH{' '}
            </p>
          </div>
          <div className="flex items-center pt-[16px] ">
            <div className="">
              <p className="font-normal	text-blackSecondary text-[14px] leading-5">
                Rocko Wallet Address
              </p>
              <div className="flex items-center">
                <p className="font-normal	text-blackPrimary text-[16px] leading-6 text-wrap">
                  {rockoWalletAddress}
                </p>
                <div className="px-[16px]">
                  <Image
                    src={contentCopy}
                    onClick={handleCopy}
                    alt="contentCopy"
                    className="cursor-pointer"
                  />
                </div>
                {!collateralReceived && (
                  <button
                    type="button"
                    onClick={onViewDetails}
                    className="font-semibold  text-xs md:text-sm bg-blue py-[10px] px-6 rounded-full text-white"
                  >
                    Transfer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {uiState.showTransferCollateralModal && (
          <TransferCollateral
            balance={rockoWalletBalance}
            collateralNeeded={collateral}
            onCancel={onBackTransferCollateral}
            onOk={proceedAnyway}
          />
        )}
        {uiState.showFinishLoanModal && (
          <FinishLoanTransaction
            balance={rockoWalletBalance}
            onConfirm={finalizeLoanTransfer}
            onCancel={onBackFinishLoan}
          />
        )}
        {uiState.showLoanCompleteModal && (
          <LoanComplete
            title="Loan Complete"
            details="Your loan has been fulfilled and you can access your funds in the exchange account or wallet address provided."
            id={1}
            txHash={txHash}
          />
        )}
        {uiState.showCancelLoanModal && (
          <CancelLoanModal onCancel={onFinishLoan} onConfirm={confirmCancel} />
        )}
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
              {canCancelLoan() && (
                <button
                  disabled={startTransactions}
                  type="button"
                  onClick={cancelLoan}
                  className="py-[10px] px-6 rounded-full text-sm font-semibold bg-[#EEEEEE] text-[#2C3B8D]"
                >
                  Cancel
                </button>
              )}
              {!startTransactions && !activeDone ? (
                <button
                  type="button"
                  onClick={onProgressLoan}
                  className={`font-semibold  text-xs md:text-sm ${'bg-blue'} py-[10px] px-6 rounded-full text-white`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!activeDone}
                  onClick={() => {
                    navRouter.push('/loan-dashboard');
                  }}
                  className={`font-semibold  text-xs md:text-sm ${
                    !activeDone ? 'bg-blue/40' : 'bg-blue'
                  } py-[10px] px-6 rounded-full text-white`}
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const CollateralDepositExecution = () => {
  const { isConnected } = useRockoAccount();
  return isConnected ? <DepositingCollateral /> : null;
};

export default CollateralDepositExecution;
