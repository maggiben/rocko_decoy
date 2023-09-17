/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import LoanComplete from "@/components/pages/depositing-collateral/loanComplete/loanComplete";
import CircleProgressBar from "@/components/shared/CircleProgressBar/CircleProgressBar";
import ModalContainer from "@/components/shared/modalContainer/modalContainer";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface DoneTracker {
  step: string;
}

const ModifyStatus = () => {
  const { status } = useParams();
  const [counter, setCounter] = useState(status === "add" ? 5 : 15);
  const [progress, setProgress] = useState(0);
  const [progressTracker, setProgressTracker] = useState(0);
  const [doneTracker, setDoneTracker] = useState<DoneTracker[]>([]);
  const [activeDone, setActiveDone] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [hide, setHide] = useState<boolean>(false);
  // Use useMemo to memoize the 'status' value
  /* const memoizedStatus = useMemo(() => status, []);
  console.log(memoizedStatus); */

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
        setProgress((prevProg) => {
          if (prevProg === 100) {
            setProgressTracker((prevProgTra) => {
              return prevProgTra + 1;
            });

            return status === "add" ? 0 : 20;
          } else {
            return status === "add" ? prevProg + 50 : prevProg + 20;
          }
        });
        console.log(progress);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counter, progress, progressTracker]);
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
      progressTracker === 1 && progress === 100 && setActiveDone(true);
    }
  }, [progress, progressTracker]);

  console.log(doneTracker);
  return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
      <h1 className="text-[28px] lg:text-3xl font-medium text-center lg:text-left">
        Collateral Modification Status
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
      {completeModal && !hide ? (
        <ModalContainer>
          {status === "add" ? (
            <LoanComplete
              title={"Collateral Deposit Complete"}
              details={"You have successfully increased your loan collateral"}
              id={2}
              setHide={setHide}
            />
          ) : (
            <LoanComplete
              title={"Collateral Withdrawal Complete"}
              details={"You have successfully withdrawn collateral"}
              id={3}
              setHide={setHide}
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
          <div className="p-4 flex items-center justify-between  ">
            <p className="text-blackPrimary text-xs md:text-sm font-medium">
              {/* //todo remove it later */}
              {/* {stepsName[currentStep]}: {currentStep + 1}/ {loanSteps.length} 
              
            {loanData?.activeNextButton?.valueOf()} */}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
              /*   onClick={prevStep}
                className={`font-semibold  text-xs md:text-sm text-blue  py-[10px]  px-6 rounded-full ${
                  currentStep === 0 ? "bg-grayPrimary" : "bg-gray-200"
                }`}
                disabled={currentStep === 0} */
              >
                {/* Back */}
              </button>
              <button
                onClick={() => {
                  setCompleteModal(true);
                  setHide(false);
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
