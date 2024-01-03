'use client';

import React, { JSX, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ConnectWallet } from '@thirdweb-dev/react';
import StatusWarning from '@/assets/StatusWarning.svg';
import HoverTooltip from '@/components/chips/HoverTooltip/HoverTooltip';
import ModalContainer from '@/components/chips/ModalContainer/ModalContainer';
// import ChooseWallet from '@/components/chips/ChooseWallet/ChooseWallet';
import LoanFinalized from '@/components/chips/LoanFinalized/LoanFinalized';
import useLoanData from '@/hooks/useLoanData';
import financial from '@/utility/currencyFormate';
// import closeIcon from '@/assets/Close.svg';
import contentCopy from '@/assets/content_copy.svg';

import {
  FLAG_COINBASE_FUNDING,
  FLAG_OTHER_EXCHANGE_FUNDING,
} from '@/constants/featureFlags';
import ModalContent from '@/components/chips/ModalContent/ModalContent';
import QRCode from 'react-qr-code';

interface Term {
  rule: JSX.Element;
}

const terms: Term[] = [
  {
    rule: (
      <li className="mb-1 ml-3 text-blackSecondary font-normal text-[14px]  ">
        By finalizing your loan request, you will receive a Rocko wallet that
        will help facilitate and manage your loan. Rocko will have no access or
        control over funds inside your wallet.
      </li>
    ),
  },
  {
    rule: (
      <li className="mb-1 ml-3 text-blackSecondary font-normal text-[14px]">
        You will be asked to authorize a transaction for the loan amount
        required (shown above). If your Rocko wallet does not receive the loan
        amount required, your loan may not be fulfilled.
      </li>
    ),
  },
  {
    rule: (
      <li className="mb-1 ml-3 text-blackSecondary font-normal text-[14px]  ">
        Rocko&apos;s service fee will be taken out of the initial amount
        transferred to your Rocko wallet. More info on Rocko&apos;s service fee
        can be found{' '}
        <Link href="/" className="underline">
          here
        </Link>
        .
      </li>
    ),
  },
];

const NonConnected: React.FC = () => {
  const { loanData, setLoanData } = useLoanData();

  const invoice = [
    {
      description: 'Lending Protocol',
      details: (
        <span className="underline text-blackPrimary font-normal text-[16px]">
          Compound Finance
        </span>
      ),
      // symbol: '/icons/Compound (COMP).svg',
    },
    {
      description: 'Loan Amount',
      details: `~$${financial(loanData?.borrowing)} USDC`,
      subDetails: `~$${financial(loanData?.borrowing)}`,
    },
    {
      description: 'Current APR',
      details: `${financial(loanData?.currentAPR, 2)}%`,
    },
    {
      description: 'Amount Required for Loan',
      details: `${financial(loanData?.collateralNeeded, 3)} ETH`,
      subDetails: `$${financial(
        loanData?.collateralNeeded * loanData?.collateralPrice,
        2,
      )}`,
      subDescription: [
        {
          description: 'Collateral',
          details: `${financial(loanData?.collateralNeeded, 3)} ETH`,
          subDetails: `$${financial(
            loanData?.collateralNeeded * loanData?.collateralPrice,
            2,
          )}`,
        },
        {
          description: 'Rocko Service Fee',
          details: `${0} ETH`,
          subDetails: `$0.00`,
        },
      ],
    },
    {
      description: 'Collateral Buffer',
      details: `${loanData?.buffer}%`,
    },
    {
      description: 'Liquidation Price',
      details: `$${financial(loanData?.liquidationPrice, 2)}`,
    },
    {
      description: 'Estimated Time to Receive Loan',
      details: '<15 Minutes*',
    },
    {
      description: 'Collateral Parameters & Loan Terms',
      subDescription: [
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0 text-blackPrimary font-normal	">
                Max Loan-to-Value{' '}
              </span>{' '}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `${loanData?.loanToValue * 100}%`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1 w-max">
              <span className="mr-1 lg:mr-0 text-blackPrimary font-normal">
                Liquidation Threshold{' '}
              </span>{' '}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `${loanData?.liquidationThreshold * 100}%`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0 text-blackPrimary font-normal">
                Liquidation Penalty{' '}
              </span>{' '}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `${financial(loanData?.liquidationPenalty * 100)}%`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0 text-blackPrimary font-normal">
                Loan Term{' '}
              </span>{' '}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `Open Ended`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1 w-max">
              <span className="mr-1 lg:mr-0 text-blackPrimary font-normal">
                Minimum Monthly Payment{' '}
              </span>{' '}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `None`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0 text-blackPrimary font-normal">
                Protocol Rewards{' '}
              </span>{' '}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `${financial(loanData?.rewardRate * 100, 2)}%`,
        },
      ],
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState('');
  const [openModalFor, setOpenModalFor] = useState('');
  const [modalStep /* setModalStep */] = useState(0);

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value;
    setPaymentMethod(inputValue);

    if (setLoanData) {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        paymentMethod: inputValue || '',
      }));
    }
  };

  return (
    <main className="container mx-auto px-4 md:8 py-4 sm:py-6 lg:py-10">
      <h1 className="text-2xl lg:text-3xl text-blackPrimary lg:text-start text-center">
        Finalize Your Loan
      </h1>
      {/* ---------------------- First Section Start ------------------------ */}
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <h3 className="text-xl text-blackPrimary font-medium mb-4">
            Loan Summary
          </h3>
          <div className="divide-y-2">
            {invoice.map((info, i) => (
              <React.Fragment key={i}>
                <div className="flex pb-3 pt-2 flex-wrap items-center space-y-2">
                  <p className="font-medium w-[62%] md:w-1/2 text-blackPrimary">
                    {info?.description}
                  </p>
                  <div className="w-[38%] md:w-1/2 text-right md:text-left">
                    <div className="flex gap-1 justify-end md:justify-start">
                      {/* {info?.symbol && (
                        <Image
                          src={info?.symbol || ''}
                          alt={info?.description || ''}
                          width={20}
                          height={20}
                        />
                      )} */}
                      <p>{info?.details}</p>
                    </div>
                    {info?.subDetails && (
                      <p className="text-sm text-blackSecondary">
                        {info?.subDetails}
                      </p>
                    )}
                  </div>
                  {info?.subDescription &&
                    info?.subDescription.map((innerInfo, i) => (
                      <React.Fragment key={i}>
                        <div className="pt-1 md:pt-0 w-[65%] md:w-1/2 lg:pl-6 text-blackPrimary text-[14px]">
                          {innerInfo?.description}
                        </div>
                        <div className="pt-1 md:pt-0 w-[35%] md:w-1/2 text-right md:text-left">
                          <p className="text-blackPrimary font-normal text-[14px]">
                            {innerInfo?.details}
                          </p>
                          {'subDetails' in innerInfo && (
                            <p className="text-sm text-blackSecondary">
                              {innerInfo?.subDetails}
                            </p>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="mt-2 p-[16px] md:p-[20px] lg:p-[24px] bg-whiteTertiary rounded-2xl">
            <p className="text-blackSecondary text-sm lg:text-base">
              *Loan fulfillment times are subject to the Ethereum network.
              Fulfillment may be delayed during periods of high congestion
            </p>
          </div>
        </div>
      </section>
      {/* ---------------------- First Section End ------------------------ */}
      {/* ---------------------- Second Section Start ------------------------ */}
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <h3 className="text-xl font-medium mb-1">
            Where do you want to receive your loan?
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            You can use the same account or wallet to provide collateral for
            your loan
          </p>
          {FLAG_COINBASE_FUNDING && (
            <div className="md:flex justify-between mb-7">
              <div className="flex md:items-center">
                <input
                  type="radio"
                  id="wallet1"
                  name="contact"
                  value="default"
                  checked={paymentMethod === 'default'}
                  className="w-[30px] h-[30px] md:w-7 md:h-7 border-2 border-black"
                  onChange={(e) => handlePaymentMethodChange(e)}
                />
                <label htmlFor="wallet1" className="pl-4">
                  <p className="font-semibold">
                    Coinbase or Gemini Account{' '}
                    <span className="font-medium text-[12px] lg:ml-3 bg-[#E6F2ED] py-1 px-2 rounded-[5px] text-[#05944F] inline-block my-1 lg:my-0">
                      Recommended
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Minimize risk of funds being sent to an incorrect address
                  </p>
                </label>
              </div>
              <div className="text-center md:text-left mt-1 lg:mt-0">
                <button
                  onClick={() => {
                    setOpenModalFor('Coinbase or Gemini');
                    setPaymentMethod('default');
                  }}
                  className="w-24 md:w-32 h-10 rounded-3xl text-sm md:text-base text-[#eee] bg-[#2C3B8D]"
                >
                  Sign in
                </button>
              </div>
            </div>
          )}
          <div className="md:flex justify-between mb-7">
            <div className="flex items-center">
              <input
                type="radio"
                id="wallet2"
                name="contact"
                value="ethereum"
                onChange={(e) => handlePaymentMethodChange(e)}
                className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
              />
              <label htmlFor="wallet2" className="pl-4">
                <p className="font-semibold">Ethereum Wallet</p>
              </label>
            </div>
            <div className="text-center md:text-left mt-1 lg:mt-0">
              <ConnectWallet
                btnTitle="Connect"
                theme="light"
                style={{
                  background: paymentMethod === 'ethereum' ? '#2C3B8D' : '#eee',
                  color: paymentMethod === 'ethereum' ? '#eee' : '#2C3B8D',
                  borderRadius: '1.5rem',
                  minWidth: '8rem',
                }}
              />
            </div>
          </div>
          {FLAG_OTHER_EXCHANGE_FUNDING && (
            <div className="flex items-start mb-7">
              <input
                type="radio"
                id="wallet3"
                name="contact"
                value="other"
                className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
                onChange={(e) => handlePaymentMethodChange(e)}
              />
              <div className="pl-4">
                <label htmlFor="wallet3" className="">
                  <p className="font-semibold mb-6">
                    Other Exchange or Wallet Address
                  </p>
                </label>

                {/* if select other address then it will be active  start */}
                {paymentMethod === 'other' && (
                  <div className="">
                    <p className="text-sm font-semibold font-inter mb-2">
                      Enter Wallet Address
                    </p>
                    <div className="max-w-[426px] w-full">
                      <input
                        type="text"
                        className="w-full p-4 border border-[#E6E6E6] rounded-[10px] block focus:outline-none"
                      />
                    </div>
                    <div className="my-4 p-4 rounded-[10px] bg-[#FFFAF0] flex items-center justify-start gap-2 ">
                      <Image
                        src={StatusWarning}
                        width={24}
                        height={24}
                        alt="warning"
                      />
                      <p className="text-sm font-inter text-[#010304]">
                        Caution: Please ensure this address is correct as
                        inputting an incorrect address could lead to lost funds.
                      </p>
                    </div>
                  </div>
                )}
                {/* if select other address then it will be active  end */}
              </div>
            </div>
          )}

          <div className="mt-2 p-[16px] md:p-[20px] lg:p-[24px] bg-whiteTertiary rounded-2xl">
            <ul className="list-disc">
              {terms.map((term, i) => (
                <React.Fragment key={i}>{term.rule}</React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* ---------------------- Second Section End ------------------------ */}

      {/* ---------------------- when choose Coinbase or Gemini Account start ------------------------ */}
      {/* {openModalFor && (
        <ModalContainer>
          {modalStep === 0 && (
            <ChooseWallet
              setModalStep={setModalStep}
              setOpenModalFor={setOpenModalFor}
            />
          )}
          {modalStep === 1 && <LoanFinalized navType="start" />}
        </ModalContainer>
      )} */}
      {/* ---------------------- when choose Coinbase or Gemini Account End ------------------------ */}
      {/* ---------------------- qr scanner popup start ------------------------ */}
      {/* {openModalFor && (
        <ModalContainer>
          {modalStep === 0 && (
            <ModalContent>
              <div className="flex items-start justify-between gap-2 ">
                <div className="space-y-2 ">
                  <h4 className="text-2xl font-semibold font-inter">
                    Transfer Collateral
                  </h4>
                  <p className="text-sm text-[#141414] font-inter ">
                    Please send the Amount Required to your Rocko wallet. Your
                    loan will not be fulfilled until this amount is received.
                  </p>
                </div>
                <div className="">
                  <button
                    onClick={() => setOpenModalFor('')}
                    className="w-8 h-8 rounded-full p-2 bg-[#EEE] block"
                  >
                    <Image
                      src={closeIcon}
                      alt=""
                      width={16}
                      height={16}
                      className="w-full"
                    />
                  </button>
                </div>
              </div>
              <div className="border-2 rounded-2xl p-3 lg:p-6">
                <div className="border-b-2 py-[16px]">
                  <p className="font-normal	text-blackSecondary text-[14px]">
                    Amount Required{' '}
                  </p>
                  <p className="font-normal	text-blackPrimary text-[16px]">
                    14.7341 ETH
                  </p>
                </div>
                <div className=" flex items-center flex-col py-[16px]">
                  <QRCode value="hello" size={200} />
                  <p className="text-blackSecondary text-[14px] text-center mt-[12px]">
                    Scan within your exchange mobile app
                  </p>
                </div>
                <div className="flex justify-between items-center pt-[16px] border-t-2">
                  <div>
                    <p className="font-normal	text-blackSecondary text-[14px]">
                      Address
                    </p>
                    <p className="font-normal	text-blackPrimary text-[16px] text-wrap">
                      0xC02aaA39b223FE8D0A0e5C4F27eAD908
                      <br />
                      3C756Cc2
                    </p>
                  </div>
                  <Image
                    src={contentCopy}
                    alt="contentCopy"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <button className="py-[10px] px-6 max-w-[110px] rounded-full text-sm font-semibold bg-[#2C3B8D] text-white">
                Continue
              </button>
            </ModalContent>
          )}
          {modalStep === 1 && <LoanFinalized navType="start" />}
        </ModalContainer>
      )} */}
      {/* ---------------------- qr scanner popup End ------------------------ */}

      {/* ---------------------- qr Waiting for Collateral popup start ------------------------ */}
      {/* {openModalFor && (
        <ModalContainer>
          {modalStep === 0 && (
            <ModalContent>
              <div className="flex items-start justify-between gap-2 ">
                <div className="space-y-2 ">
                  <h4 className="text-2xl font-semibold font-inter">
                    Transfer Collateral
                  </h4>
                  <p className="text-sm text-[#141414] font-inter ">
                    Please send the Amount Required to your Rocko wallet. Your
                    loan will not be fulfilled until this amount is received.
                  </p>
                  <div className="my-4 p-4 rounded-[10px] bg-[#F7B13329] flex  justify-start gap-2 ">
                    <Image
                      src={StatusWarning}
                      width={24}
                      height={24}
                      alt="warning"
                    />
                    <div>
                      <p className="text-[16px] font-inter text-[#010304]">
                        Amount received is less than the amount required to
                        transfer.
                      </p>
                      <p className="text-[14px] font-inter text-[#010304]">
                        Less than the Amount Required has been received by your
                        Rocko wallet. Continuing could result in the transaction
                        failing or receiving a loan with a smaller collateral
                        buffer than intended.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <button
                    onClick={() => setOpenModalFor('')}
                    className="w-8 h-8 rounded-full p-2 bg-[#EEE] block"
                  >
                    <Image
                      src={closeIcon}
                      alt=""
                      width={16}
                      height={16}
                      className="w-full"
                    />
                  </button>
                </div>
              </div>
              <div className="border-2 rounded-2xl p-3 lg:p-6">
                <div className="border-b-2 py-[16px] flex justify-between items-center">
                  <div>
                    <p className="font-normal	text-blackSecondary text-[14px]">
                      Amount Received
                    </p>
                    <p className="font-normal	text-blackPrimary text-[16px]">
                      0 ETH
                    </p>
                  </div>
                  <div className="flex items-center gap-x-[4px] bg-[#F7B13329] rounded-[5px] py-[3px] ps-[4px] pe-[8px] cursor-pointer">
                    <Image
                      src={StatusWarning}
                      alt="contentCopy"
                      className="cursor-pointer"
                    />
                    <p className="text-[#141414] text-[12px] font-medium leading-4">
                      Less than amount required
                    </p>
                  </div>
                </div>
                <div className="border-b-2 py-[16px]">
                  <p className="font-normal	text-blackSecondary text-[14px]">
                    Amount Required{' '}
                  </p>
                  <p className="font-normal	text-blackPrimary text-[16px]">
                    14.7341 ETH
                  </p>
                </div>
                <div className=" flex items-center flex-col py-[16px]">
                  <QRCode value="hello" size={200} />
                  <p className="text-blackSecondary text-[14px] text-center mt-[12px]">
                    Scan within your exchange mobile app
                  </p>
                </div>
                <div className="flex justify-between items-center pt-[16px] border-t-2">
                  <div>
                    <p className="font-normal	text-blackSecondary text-[14px]">
                      Address
                    </p>
                    <p className="font-normal	text-blackPrimary text-[16px] text-wrap">
                      0xC02aaA39b223FE8D0A0e5C4F27eAD908
                      <br />
                      3C756Cc2
                    </p>
                  </div>
                  <Image
                    src={contentCopy}
                    alt="contentCopy"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div className='flex gap-x-[12px]  items-center'>
              <button className="py-[10px] px-6 rounded-full text-sm font-semibold bg-[#2C3B8D] text-white">
              Go back and add collateral
              </button>
              <button className="py-[10px] px-6 rounded-full text-sm font-semibold bg-[#EEEEEE] text-[#2C3B8D]">
              Proceed anyway
              </button>
              </div>
             
            </ModalContent>
          )}
          {modalStep === 1 && <LoanFinalized navType="start" />}
        </ModalContainer>
      )} */}
      {/* ---------------------- qr Collateral popup End ------------------------ */}

      {/* ---------------------- qr Warning popup End ------------------------ */}
      {openModalFor && (
        <ModalContainer>
          {modalStep === 0 && (
            <ModalContent>
              <div className="flex items-start justify-between gap-2 ">
                <div className="space-y-2 ">
                  <h4 className="text-2xl font-semibold font-inter">
                    Warning{' '}
                  </h4>
                  <p className="text-sm text-[#141414] font-inter ">
                    Less than the Amount Required has been received by your
                    Rocko wallet. Continuing could result in the transaction
                    failing or receiving a loan with a smaller collateral buffer
                    than intended.
                  </p>
                </div>
                {/* <div className="">
                  <button
                    onClick={() => setOpenModalFor('')}
                    className="w-8 h-8 rounded-full p-2 bg-[#EEE] block"
                  >
                    <Image
                      src={closeIcon}
                      alt=""
                      width={16}
                      height={16}
                      className="w-full"
                    />
                  </button>
                </div> */}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-normal	text-blackSecondary text-[14px]">
                      Amount Received
                    </p>
                    <p className="font-normal	text-blackPrimary text-[16px]">
                      10.8278 ETH
                    </p>
                  </div>
                </div>
                <div className="py-[5px]">
                  <p className="font-normal	text-blackSecondary text-[14px]">
                    Amount Required
                  </p>
                  <p className="font-normal	text-blackPrimary text-[16px]">
                    14.7341 ETH
                  </p>
                </div>
                <div className="flex justify-between items-center pt-[5px]">
                  <div>
                    <p className="font-normal	text-blackSecondary text-[14px]">
                      Address
                    </p>
                    <p className="font-normal	text-blackPrimary text-[16px] text-wrap">
                      0xC02aaA39b223FE8D0A0e5C4F27eAD908
                      <br />
                      3C756Cc2
                    </p>
                  </div>
                  <Image
                    src={contentCopy}
                    alt="contentCopy"
                    className="cursor-pointer"
                  />
                </div>
                <div className=" flex   flex-col py-[5px]">
                  <QRCode value="hello" size={100} />
                  <p className="text-blackSecondary text-[14px]   mt-[12px]">
                    Scan within your exchange mobile app
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button className="py-[10px] px-6 rounded-full text-sm font-semibold bg-[#2C3B8D] text-white">
                  Go back and add collateral
                </button>
              </div>
            </ModalContent>
          )}
          {modalStep === 1 && <LoanFinalized navType="start" />}
        </ModalContainer>
      )}
    </main>
  );
};

export default NonConnected;
