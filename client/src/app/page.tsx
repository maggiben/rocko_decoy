"use client";
import { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import StepOne from "@/components/pages/Steps/StepOne/StepOne";
import StepTwo from "@/components/pages/Steps/StepTwo/StepTwo";
import StepThree from "@/components/pages/Steps/StepThree/StepThree";
import StepFour from "@/components/pages/Steps/StepFour/StepFour";
import StepFive from "@/components/pages/Steps/StepFive/StepFive";
import ModalContainer from "@/components/chips/ModalContainer/ModalContainer";
import LoanFinalized from "@/components/chips/LoanFinalized/LoanFinalized";
import useLoanData from "@/hooks/useLoanData";

const Steps = [StepOne, StepTwo, StepThree, StepFour, StepFive];
const stepsName = [
  "Loan Amount",
  "Collateral Asset",
  "Lending Protocol",
  "Collateral Buffer",
  "Loan Summary",
];

export default function Home() {
  const address = useAddress();
  const [isFinalized, setIsFinalized] = useState(false);
  const [openModalFor, setOpenModalFor] = useState("");
  const { loanSteps, currentStep, setCurrentStep, loanData, setLoanData } =
    useLoanData();

  const nextStep = () => {
    if (loanData?.nextValidation && setLoanData) {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        activeNextButton: false,
      }));
      return;
    }

    if (currentStep == loanSteps.length - 1)
      setIsFinalized(true);

    if (currentStep < loanSteps.length - 1 && setCurrentStep) {
      
      setCurrentStep(currentStep + 1);
        if (setLoanData) {
        setLoanData((prevLoanData) => ({
          ...prevLoanData,
          activeNextButton: false,
        }));
      }
    }
  };
  const prevStep = () => {
    if (currentStep > 0 && setCurrentStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = Steps[currentStep];
  const currentData = loanSteps[currentStep];

  const isValidateNextButton = () => {
    if (currentStep == loanSteps.length - 1) {
      const isValidate = loanData?.paymentMethod === "ethereum" ? 
          address != null :
          loanData?.paymentMethod != "";

      return isValidate;
    }

    return loanData?.activeNextButton;
  }

  // keep always scroll as top
  useEffect(() => {
    if (typeof window !== "undefined")
      window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <>
      {<CurrentStepComponent {...currentData} />}

      {/* footer */}
      <div className="h-20 w-full"></div>
      <div className=" mt-24 fixed bottom-0 left-0 w-full bg-white ">
        <div className="bg-[#F7F7F7] h-1 w-full relative">
          <div
            style={{
              width: `${(100 / loanSteps.length) * (currentStep + 1)}%`,
            }}
            className={`duration-500 bg-blue h-full absolute left-0 top-0`}
          ></div>
        </div>
        <div className="container mx-auto">
          <div className="p-4 flex items-center justify-between  ">
            <p className="text-blackPrimary text-xs md:text-sm font-medium">
              {stepsName[currentStep]}: {currentStep + 1}/{loanSteps.length} 
              {/* //todo remove it later */}
            {loanData?.activeNextButton?.valueOf()}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={prevStep}
                className={`font-semibold  text-xs md:text-sm text-blue  py-[10px]  px-6 rounded-full ${
                  currentStep === 0 ? "bg-grayPrimary" : "bg-gray-200"
                }`}
                disabled={currentStep === 0}
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className={`font-semibold  text-xs md:text-sm ${
                  isValidateNextButton() ? "bg-blue" : "bg-blue/40"
                } py-[10px]  px-6 rounded-full text-white`}
                disabled={!isValidateNextButton()}
              >
                {currentStep === loanSteps.length - 1
                  ? "Finalize Loan"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFinalized && (
        <ModalContainer>
          <LoanFinalized setOpenModalFor={setOpenModalFor} />
        </ModalContainer>
      )}
    </>
  );
}
