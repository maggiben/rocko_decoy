'use client';

import { useState, useEffect, useMemo, FC } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useAccount, configureChains, useConnect } from 'wagmi';
import ModalContainer from '@/components/chips/ModalContainer/ModalContainer';
import LoanFinalized from '@/components/chips/LoanFinalized/LoanFinalized';
import useLoanData from '@/hooks/useLoanData';
import toast from 'react-hot-toast';
import { Auth0WalletConnector } from '@zerodev/wagmi';
import * as blockchains from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { NETWORK } from '@/constants/env';
import { useZeroDev } from '@/hooks/useZeroDev';
import { AssetStep, CurrencyStep, ProtocolStep, RiskStep } from '@/types/type';
import { useRouter } from 'next/navigation';
import TransferCollateral from './chips/TransferCollateral/TransferCollateral';

const net = (blockchains as { [key: string]: any })[NETWORK];

export type Step = {
  label: string;
  component:
    | FC<{}>
    | FC<CurrencyStep>
    | FC<AssetStep>
    | FC<ProtocolStep>
    | FC<RiskStep>;
};

type Props = {
  steps: Step[];
};

export default function Stepper(props: Props) {
  const { steps } = props;

  const { address: zerodevAccount } = useAccount();

  const { userInfo } = useZeroDev();
  const address = useAddress();
  const [isFinalized, setIsFinalized] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const router = useRouter();
  const { loanSteps, currentStep, setCurrentStep, loanData, setLoanData } =
    useLoanData();

  const { connect, isSuccess } = useConnect();
  const { chains } = configureChains([net], [publicProvider()]);

  const auth0Connector = new Auth0WalletConnector({
    chains,
    options: {
      projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || '',
      shimDisconnect: true,
    },
  });

  const { stepsName, Steps } = useMemo(() => {
    const names: Step['label'][] = [];
    const components: Step['component'][] = [];

    Object.values(steps).forEach(({ component, label }) => {
      names.push(label);
      components.push(component);
    });

    return { stepsName: names, Steps: components };
  }, []);

  const loginZerodev = async () => {
    await connect({
      connector: auth0Connector,
    });
  };

  const handleOnOk = () => {
    router.push('/depositing-collateral?type=start');
    setIsFinalized(false);
    setShowQR(false);
  };

  const nextStep = async () => {
    if (!zerodevAccount && currentStep === 2) {
      toast.error('Please log in to finalize your loan!');
      await loginZerodev();
      return;
    }

    if (loanData?.otherAddress === '' && currentStep === loanSteps.length - 1) {
      toast.error('Please input wallet address!');
      return;
    }

    if (loanData?.nextValidation && setLoanData) {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        activeNextButton: false,
      }));
      return;
    }

    setShowQR(loanData.paymentMethod === 'other' && currentStep === 4);
    if (currentStep < loanSteps.length - 1 && setCurrentStep) {
      setCurrentStep(currentStep + 1);
      if (setLoanData) {
        setLoanData((prevLoanData) => ({
          ...prevLoanData,
          activeNextButton: false,
        }));
      }
    }

    // if click Finalize Loan button
    if (currentStep === loanSteps.length - 1 && loanData) {
      const { sessionStorage } = window;
      sessionStorage.setItem('loanData', JSON.stringify(loanData));

      setIsFinalized(true);
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
    if (sessionStorage.getItem('isReadOnly') === 'true') return false;

    if (currentStep === loanSteps.length - 1) {
      const isValidate =
        loanData?.paymentMethod === 'ethereum'
          ? address !== null
          : loanData?.paymentMethod !== '';

      return isValidate;
    }

    return loanData?.activeNextButton;
  };

  // keep always scroll as top
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    if (userInfo && sessionStorage.getItem('isReadOnly') === 'true')
      toast.error(
        'Your account is currently under review. You may manage existing loans but cannot create new loans. Please contact support@rocko.co if you need further assistance.',
      );
  }, [userInfo]);

  useEffect(() => {
    if (isSuccess && setCurrentStep && setLoanData && currentStep === 2) {
      setCurrentStep(currentStep + 1);
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        activeNextButton: false,
      }));
    }
  }, [isSuccess]);
  return (
    <>
      <CurrentStepComponent {...currentData} />

      {/* footer */}
      <div className="h-20 w-full" />
      <div className=" mt-24 fixed bottom-0 left-0 w-full bg-white ">
        <div className="bg-[#F7F7F7] h-1 w-full relative">
          <div
            style={{
              width: `${(100 / loanSteps.length) * (currentStep + 1)}%`,
            }}
            className="duration-500 bg-blue h-full absolute left-0 top-0"
          />
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
                disabled={!isValidateNextButton() && !isFinalized}
              >
                {currentStep === loanSteps.length - 1
                  ? 'Finalize Loan'
                  : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isFinalized && showQR && (
        <TransferCollateral
          onOk={handleOnOk}
          onCancel={() => {
            setShowQR(false);
            setIsFinalized(false);
          }}
        />
      )}
      {isFinalized && !showQR && (
        <ModalContainer>
          <LoanFinalized navType="start" />
        </ModalContainer>
      )}
    </>
  );
}
