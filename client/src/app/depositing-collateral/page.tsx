"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import LoanComplete from "@/components/chips/LoanComplete/LoanComplete";
import CircleProgressBar from "@/components/chips/CircleProgressBar/CircleProgressBar";
import ModalContainer from "@/components/chips/ModalContainer/ModalContainer";
import StatusSuccess from "@/assets/StatusSuccess.png";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { useAddress } from "@thirdweb-dev/react";
import { useGetLoan } from "@/contract/batch";
import { useSingleLoan } from "@/contract/single";
import { NETWORK } from "@/constants/env";
import { useLoanDB } from "@/db/loanDb";
import { LoanData } from "@/types/type";

interface DoneTracker {
  step: string;
}

const DepositingCollateral = () => {
  const retrievedData = sessionStorage.getItem('loanData');
  const loanData : LoanData = JSON.parse(retrievedData || "");

  console.log("---loanData from sessionStorage---", loanData);

  const [activeDone, setActiveDone] = useState(false);
  const [startA, setStartA] = useState(false);
  const [startB, setStartB] = useState(false);

  const [counter, setCounter] = useState(3);
  const [progress, setProgress] = useState(0);
  const [progressTracker, setProgressTracker] = useState(0);
  const [doneTracker, setDoneTracker] = useState<DoneTracker[]>([]);
  const [completeModal, setCompleteModal] = useState(false);
  const [newLoanID, setNewLoanID] = useState<number>(0);

  // for Database
  const { finalizeLoan, getLoanData } = useLoanDB();
  // Thirdweb for EOA
  const address = useAddress();
  const { depositZerodevAccount } = useSingleLoan();
  // Wagmi for ZeroDev Smart wallet
  const { address : wagmiAddress } = useAccount();
  const { data } = useBalance({ address: address as `0x${string}` });
  const { chain } = useNetwork();
  const { executeBatchGetLoan, batchGetLoan, success, txHash } = useGetLoan(loanData?.collateralNeeded, loanData?.borrowing);

  const start = async () => {
    if (!wagmiAddress || !address || !loanData) return;
    if (chain && chain.name.toUpperCase() !== NETWORK.toUpperCase()) {
      toast.error("Invalid Network!");
      return;
    }
    if (Number(data?.formatted) < loanData?.collateralNeeded) {
      toast.error("Insufficient Collateral Balance!");
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
  }

  const receiveCollateral = async () => {
    if (!wagmiAddress || !loanData) return null;

    const depositResult = await depositZerodevAccount(wagmiAddress, loanData?.collateralNeeded, "ETH");
    return depositResult;
  }

  const setADone = () => {
    setStartA(false); 
    setProgress(0);
    setDoneTracker([...doneTracker, { step: "one" }]);
  }

  const setAError = () => {
    setStartA(false);
    setProgress(0);
    setCounter(3);
  }

  const setAllDone = async (txHash: string) => {
    await setNavigationID();
    finalizeLoan(
      wagmiAddress ? wagmiAddress : "",
      txHash,
      loanData?.protocol, true, loanData?.cryptoName,
      loanData?.borrowing, loanData?.collateralNeeded, loanData?.liquidationPrice, loanData?.buffer);

    setDoneTracker([...doneTracker, { step: "two" }]);
    setStartB(false);
    setActiveDone(true);
    setCompleteModal(true);
  }

  const setNavigationID = async () => {
    if (wagmiAddress) {
      const result = await getLoanData(wagmiAddress);
      if (result) {
        const active_loans = result.filter((loan: any) => loan.loan_active === 1);
        setNewLoanID(active_loans.length + 1);
      }
    }
  }

  useEffect(() => {
    if (batchGetLoan != undefined) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[batchGetLoan, wagmiAddress])

  useEffect(() => {
    if (success) {
      console.log("---transactionHash of batchTransactions---", txHash);
      toast(() => (
        <div className="flex items-center underline gap-2">
          <Image className="w-6 h-6" src={StatusSuccess} alt="success" />
          <Link className="hover:text-green-700" 
            href={NETWORK === "mainnet" ? `https://etherscan.io/tx/${txHash}` : `https://${NETWORK}.etherscan.io/tx/${txHash}`}
            target="_blank"
          >
            Loan successfully fulfilled!
          </Link>
        </div>
      ))
  
      setAllDone(txHash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, txHash]);

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
  useEffect(() => {
    {
      progressTracker === 0 &&
        progress === 100 &&
        setDoneTracker([...doneTracker, { step: "one" }]);
    }
    {
      progressTracker === 1 &&
        progress === 100 &&
        setDoneTracker([...doneTracker, { step: "two" }]);
    }
    {
      progressTracker === 2 &&
        progress === 100 &&
        setDoneTracker([...doneTracker, { step: "three" }]);
      progressTracker === 2 && progress === 100 && setActiveDone(true);
    }
    {
      progressTracker === 3 &&
        progress === 100 &&
        setDoneTracker([...doneTracker, { step: "four" }]);
    }
  }, [progress, progressTracker, doneTracker]);

  //
  return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
      <h1 className="text-[28px] lg:text-3xl font-medium text-center lg:text-left">
        {activeDone ? "Fulfilling Loan" : startA ? "Depositing Collateral" : "Waiting for Collateral"}
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
              Collateral Received
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
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
              Collateral Deposited in Lending Protocol
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
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
          <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
            <p
              className={`${
                progressTracker === 1 || doneTracker[1]?.step === "two"
                // progressTracker === 2 || doneTracker[2]?.step === "three"
                  ? "text-black"
                  : "text-gray-400"
              }`}
            >
              Loan Delivered to Your Account
            </p>
            {/* {doneTracker[2]?.step === "three" && ( */}
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.7566 8.08964L8.75071 14.0956L4.82812 10.173L6.00664 8.99447L8.75071 11.7385L13.5781 6.91113L14.7566 8.08964Z"
                  fill="white"
                />
              </svg>
            )}
            {/* {progressTracker === 2 && !(doneTracker[2]?.step === "three") && ( */}
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
      {completeModal && (
        <ModalContainer>
          {/* <LoanComplete
            title={"Loan Complete"}
            details={
              "Your loan has been fulfilled and you can access your funds in the exchange account or wallet address provided."
            }
            id={newLoanID}
          /> */}
          <LoanComplete
            title={"Collateral Deposit Complete"}
            details={
              "You have successfully increased your loan collateral."
            }
            id={newLoanID}
          />          
        </ModalContainer>
      )}
      
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
          <div className="p-4 flex items-center justify-between  ">
            <p className="text-blackPrimary text-xs md:text-sm font-medium">
              {/* //todo remove it later */}
              {/* {stepsName[currentStep]}: {currentStep + 1}/ {loanSteps.length} 
              
            {loanData?.activeNextButton?.valueOf()} */}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setCompleteModal(true)}
                className={`font-semibold  text-xs md:text-sm ${
                  (startA || startB) ? "bg-blue/40" : "bg-blue"
                } py-[10px] px-6 rounded-full text-white`}
                disabled={startA || startB}
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

export default DepositingCollateral;
