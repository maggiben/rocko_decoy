'use client';

import useLoanData from '@/hooks/useLoanData';
import { useAddress } from '@thirdweb-dev/react';
import { useAccount, configureChains, useConnect } from 'wagmi';
import { Auth0WalletConnector } from '@zerodev/wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { NETWORK } from '@/constants/env';
import * as blockchains from 'wagmi/chains';
import toast from 'react-hot-toast';

interface Props {
  steps?: number;
  currentStep?: number;
  stepNames?: Array<string>;
  onBack?: () => void;
  setIsFinalized: React.Dispatch<any>;
}

const net = (blockchains as { [key: string]: any })[NETWORK];

function Footer(props: Props) {
  const {
    steps = 1,
    currentStep = 1,
    stepNames = [],
    onBack,
    setIsFinalized,
  } = props;
  const { loanSteps, setCurrentStep, loanData, setLoanData } = useLoanData();
  const address = useAddress();
  const { address: zerodevAccount } = useAccount();
  const { connect } = useConnect();
  const { chains } = configureChains([net], [publicProvider()]);
  const auth0Connector = new Auth0WalletConnector({
    chains,
    options: {
      projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || '',
      shimDisconnect: true,
    },
  });

  const loginZerodev = async () => {
    await connect({
      connector: auth0Connector,
    });
  };

  const nextStep = async () => {
    if (!zerodevAccount && currentStep === 2) {
      toast.error('Please log in to finalize your loan!');
      await loginZerodev();
      return;
    }

    if (loanData?.nextValidation && setLoanData) {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        activeNextButton: false,
      }));
      return;
    }

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

  const isValidateNextButton = () => {
    const isValidate =
      loanData?.paymentMethod === 'ethereum'
        ? address !== null
        : loanData?.paymentMethod !== '';

    return isValidate;
  };

  return (
    <div className="mt-24 fixed bottom-0 left-0 w-full bg-white ">
      <div className="bg-[#F7F7F7] h-1 w-full relative">
        <div
          style={{
            width: `${(100 / steps) * (currentStep + 1)}%`,
          }}
          className="duration-500 bg-blue h-full absolute left-0 top-0"
        />
      </div>
      <div className="container mx-auto">
        <div className="p-4 flex items-center justify-end  ">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onBack}
              className={`font-semibold  text-xs md:text-sm text-blue  py-[10px]  px-6 rounded-full ${
                currentStep === 0 ? 'bg-grayPrimary' : 'bg-gray-200'
              }`}
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className={`font-semibold  text-xs md:text-sm ${
                isValidateNextButton() ? 'bg-blue' : 'bg-blue/40'
              } py-[10px]  px-6 rounded-full text-white`}
              disabled={!isValidateNextButton()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
