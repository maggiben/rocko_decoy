"use client";
import StepFive from "@/components/pages/stepFive/stepFive";
import StepFour from "@/components/pages/stepFour/stepFour";
import StepOne from "@/components/pages/stepOne/stepOne";
import StepThree from "@/components/pages/stepThree/stepThree";
import StepTow from "@/components/pages/stepTow/stepTow";
import useLoanData from "@/hooks/useLoanData";

const Steps = [StepOne, StepTow, StepThree, StepFour, StepFive];

export default function Home() {
  const { loanSteps, currentStep, setCurrentStep } = useLoanData();

  const nextStep = () => {
    if (currentStep < loanSteps.length - 1 && setCurrentStep) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0 && setCurrentStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = Steps[currentStep];
  const currentData = loanSteps[currentStep];

  console.log(currentStep, loanSteps.length);
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
            <p className="text-blackPrimary text-sm font-medium">
              Collateral Asset: {currentStep + 1}/ {loanSteps.length}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={prevStep}
                className={`font-semibold  text-sm text-blue  py-[10px]  px-6 rounded-full ${
                  currentStep === 0 ? "bg-grayPrimary" : "bg-gray-200"
                }`}
                disabled={currentStep === 0}
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className={`font-semibold  text-sm ${
                  currentStep < loanSteps.length - 1 ? "bg-blue" : "bg-blue/40"
                } py-[10px]  px-6 rounded-full text-white`}
                disabled={currentStep === loanSteps.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
