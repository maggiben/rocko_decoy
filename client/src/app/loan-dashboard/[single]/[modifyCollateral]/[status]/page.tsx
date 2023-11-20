/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import LoanComplete from "@/components/chips/LoanComplete/LoanComplete";
import CircleProgressBar from "@/components/chips/CircleProgressBar/CircleProgressBar";
import ModalContainer from "@/components/chips/ModalContainer/ModalContainer";
import StatusSuccess from "@/assets/StatusSuccess.png";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { useAddress } from "@thirdweb-dev/react";
import { NETWORK } from "@/constants/env";
import { useSingleLoan } from "@/contract/single";
import { useLoanDB } from "@/db/loanDb";
import { useAddCollateral, useBorrowCollateral } from "@/contract/batch";
import { useZeroDev } from "@/hooks/useZeroDev";
import { etherscanLink } from "@/utility/utils";

interface DoneTracker {
  step: string;
}

const ModifyStatus = () => {
  const { status, single : loanIndex } = useParams(); //! by using this hook get the URL parameter
  const router = useSearchParams(); //! use the hooks for getting the URL parameters
  const payment = parseFloat(router.get("payment") || "0"); //! get the URL parameter payment value

  // DB for getting loanBalance and collateral
  const { getLoanData, updateLoan } = useLoanDB();
  const [ loanData, setLoanData ] = useState<any>();
  const [ collateral, setCollateral ] = useState<number>(0);
  // Thirdweb for EOA
  const address = useAddress();
  const { wethToETH, depositZerodevAccount, getCollateralBalanceOf } = useSingleLoan();
  const { data } = useBalance({ address: address as `0x${string}` });
  // Wagmi for ZeroDev Smart wallet
  const { address : zerodevAccount } = useAccount();
  const { userInfo } = useZeroDev();
  const { chain } = useNetwork();
  const { executeBatchAddCollateral, batchAddCollateral, success, txHash } = useAddCollateral(payment);
  const { executeBatchBorrowCollateral, batchBorrowCollateral, success: borrowSuccess, txHash: borrowTxHash } = useBorrowCollateral(payment);

  const [activeDone, setActiveDone] = useState(false); //! done btn will active and counter coverts to "Completed" when all loader completed.
  const [startA, setStartA] = useState(false); // true when depositLoan to zerodevAccount
  const [startB, setStartB] = useState(false); // true when start batchTransactions

  const [counter, setCounter] = useState(3); //! countdown
  const [progress, setProgress] = useState(0); //! showing the loader progress
  const [progressTracker, setProgressTracker] = useState(0); //! when progress will hit 100 then progressTracker is incremented by 1
  const [doneTracker, setDoneTracker] = useState<DoneTracker[]>([]); //! when progress will hit 100 and progressTracker is incremented by 1 then doneTracker is incremented by 1
  const [completeModal, setCompleteModal] = useState(false); //! after clicking done btn completeModal popup shows

  const start = async () => {
    if (!zerodevAccount || !address || !loanData) return; // !zerodevAccount - logout, !address - no EOA, !loanData - no db data
    if (chain && chain.name.toUpperCase() !== NETWORK.toUpperCase()) {
      toast.error("Invalid Network!");
      return;
    }

    setStartA(true);
    // if add collateral
    if (status === "add") { 
      if (Number(data?.formatted) < payment) {
        toast.error("Insufficient Collateral Balance!");
        return;
      }

      const collateralReceived = await receiveCollateral();
      if (collateralReceived) {
        setADone();
        setStartB(true);

        // batch transactions
        executeBatchAddCollateral();
      } else {
        setError("A");
      }
    } else {
      // if borrow collateral
      executeBatchBorrowCollateral();
    }
  }

  const receiveCollateral = async () => {
    if (!zerodevAccount) return null;

    const depositResult = await depositZerodevAccount(zerodevAccount, payment, "ETH");
    return depositResult;
  }
  
  const setADone = () => {
    setStartA(false); 
    setProgress(0);
    setDoneTracker([{ step: "one" }]);
  };

  const setError = (step: string) => {
    step === "A" ? setStartA(false) : setStartB(false);
    setProgress(0);
    setCounter(3);
  };

  const setAllDone = async (txHash: string) => {
    updateLoan(
      "modifyCollateral",
      loanData?.id,
      0, false,
      status === "add" ? collateral + payment : collateral - payment, 
      0,
      txHash
    );

    setDoneTracker([{step: "one"}, { step: "two" }]);
    setStartB(false);
    setActiveDone(true);
    setCompleteModal(true);
  };

  const initialize = async () => {
    if (userInfo) {
      const result = await getLoanData(userInfo.email);
      if (result) {
        const active_loans = result.filter((loan: any) => loan.loan_active == 1);
        if (active_loans.length > 0) setLoanData(active_loans[0]);
      }
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    getCollateralBalanceOf()
    .then(_value => setCollateral(_value))
    .catch(e => console.log(e))
  })

  useEffect(() => {
    if (loanData && batchAddCollateral != undefined && batchBorrowCollateral != undefined)
      start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[zerodevAccount, loanData, batchAddCollateral, batchBorrowCollateral]);

  useEffect(() => {
    if (borrowSuccess) {
      console.log("---transactionHash of batchTransactions---", borrowTxHash);
      toast(() => (
        <div className="flex items-center underline gap-2">
          <Image className="w-6 h-6" src={StatusSuccess} alt="success" />
          <Link className="hover:text-green-700"
            href={etherscanLink(borrowTxHash)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Successfully transaction is completed!
          </Link>
        </div>
      ))

      setAllDone(borrowTxHash);
    }

    if (success) {
      console.log("---transactionHash of batchTransactions---", txHash);
      toast(() => (
        <div className="flex items-center underline gap-2">
          <Image className="w-6 h-6" src={StatusSuccess} alt="success" />
          <Link className="hover:text-green-700" 
            href={etherscanLink(txHash)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Successfully transaction is completed!
          </Link>
        </div>
      ))
  
      setAllDone(txHash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [borrowSuccess, success, borrowTxHash, txHash]);

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
          setProgress((prevProg) => {
            return prevProg + 20;
          });
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
          setProgress((prevProg) => {
            return prevProg + 20;
          });
        }
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [startA, startB, progress]);

  return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
      <h1 className="text-[28px] lg:text-3xl font-medium text-center lg:text-left">
        {status === "add" ? (startA || (!startA && !startB) ? "Waiting for Collateral" : "Depositing Collateral") 
                          : "Withdrawing Collateral"}
      </h1>
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <p className="text-black">Estimated time remaining</p>
          <h1 className="text-2xl font-semibold mb-4">
            {" "}
            {`${activeDone ? "Complete!" : `${counter} minutes`}`}{" "}
          </h1>
          <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
            <p
              className={`${
                progressTracker === 0 || doneTracker[0]?.step === "one"
                  ? "text-black"
                  : "text-gray-400"
              }`}
            >
              {status === "add"
                ? "Collateral Received"
                : "Collateral Withdrawn from Compound"}
            </p>
            {doneTracker[0]?.step === "one" && (
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
            {progressTracker === 0 && !(doneTracker[0]?.step === "one") && (
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
                progressTracker === 1 || doneTracker[1]?.step === "two"
                  ? "text-black"
                  : "text-gray-400"
              }`}
            >
              {status === "add"
                ? "Collateral Deposited in Compound"
                : "Collateral Deposited in your account or wallet"}
            </p>
            {doneTracker[1]?.step === "two" && (
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

            {progressTracker === 1 && !(doneTracker[1]?.step === "two") && (
              <CircleProgressBar
                circleWidth={18}
                radius={7}
                percentage={progress}
                strokeWidth={2}
              />
            )}
          </div>
        </div>
      </section>
      {completeModal ? (
        <ModalContainer>
          {status === "add" ? (
            <LoanComplete
              title={"Collateral Deposit Complete"}
              details={"You have successfully increased your loan collateral"}
              id={Number(loanIndex)}
            />
          ) : (
            <LoanComplete
              title={"Collateral Withdrawal Complete"}
              details={"You have successfully withdrawn collateral"}
              id={Number(loanIndex)}
            />
          )}
        </ModalContainer>
      ) : null}

      {/* footer */}
      <div className="h-20 w-full"></div>
      <div className=" mt-24 fixed bottom-0 left-0 w-full bg-white ">
        <div className="bg-[#F7F7F7] h-1 w-full relative">
          <div
            /*  style={{
              width: `${(100 / loanSteps.length) * (currentStep + 1)}%`,
            }} */
            className={`duration-500 bg-blue h-full absolute left-0 top-0 w-full`}
          ></div>
        </div>
        <div className="container mx-auto">
          <div className="p-4">
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setCompleteModal(true); //! after clicking done btn completeModal popup shows
                }}
                className={`font-semibold  text-xs md:text-sm ${
                  activeDone ? "bg-blue" : "bg-blue/40"
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
};

export default ModifyStatus;
