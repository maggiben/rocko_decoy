/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import LoanComplete from "@/components/pages/depositing-collateral/loanComplete/loanComplete";
import CircleProgressBar from "@/components/shared/CircleProgressBar/CircleProgressBar";
import ModalContainer from "@/components/shared/modalContainer/modalContainer";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface DoneTracker {
  step: string;
}

const Processing = () => {
  const { processing } = useParams(); //! by using this hook get the URL parameter
  const router = useSearchParams(); //! use the hooks for getting the URL parameters
  const payment = parseFloat(router.get("payment") || "0"); //! get the URL parameter payment value
  const currentBalance = parseFloat(router.get("currentBalance") || "0"); //! get the URL parameter currentBalance value

  const [counter, setCounter] = useState(payment === currentBalance ? 10 : 5); //! countdown

  const [progress, setProgress] = useState(0); //! showing the loader progress

  const [progressTracker, setProgressTracker] = useState(0); //! when progress will hit 100 then progressTracker is incremented by 1

  const [doneTracker, setDoneTracker] = useState<DoneTracker[]>([]); //! when progress will hit 100 and progressTracker is incremented by 1 then doneTracker is incremented by 1

  const [activeDone, setActiveDone] = useState(false); //! done btn will active and counter coverts to "Completed" when all loader completed.

  const [completeModal, setCompleteModal] = useState(false); //! after clicking done btn completeModal popup shows

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
        setProgress((prevProg) => {
          if (prevProg === 100) {
            setProgressTracker((prevProgTra) => {
              return prevProgTra + 1;
            });

            return processing === "processing" ? 0 : 20;
          } else {
            return processing === "processing" ? prevProg + 50 : prevProg + 20;
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
        payment < currentBalance && progressTracker === 1 && progress === 100 && setActiveDone(true);
    }
    {
      progressTracker === 2 &&
        progress === 100 &&
        setDoneTracker([...doneTracker, { step: "three" }]);
      progressTracker === 2 && progress === 100 && setActiveDone(true);
    }
  }, [progress, progressTracker]);

  console.log(doneTracker);
  return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
      <h1 className="text-[28px] lg:text-3xl font-medium text-center lg:text-left">
        Processing Payment
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
             Payment Received
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
            Payment Made to Lending Protocol
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

          {payment === currentBalance && (
            <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
              <p
                className={`${
                  progressTracker === 2 || doneTracker[2]?.step === "three"
                    ? "text-black"
                    : "text-gray-400"
                }`}
              >
               Collateral withdrawn to your account
              </p>
              {doneTracker[2]?.step === "three" && (
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

              {progressTracker === 2 && !(doneTracker[2]?.step === "three") && (
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
              title={"Payment Complete"}
              details={"You have successfully repaid your loan. Your collateral and any earned rewards have been withdrawn to your account or wallet. "}
              id={2}
            />
          ) : (
            <LoanComplete
              title={"Payment Complete"}
              details={"You have successfully made a payment"}
              id={3}
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

export default Processing;
