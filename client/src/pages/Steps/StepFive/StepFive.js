import HoverTooltip from "../../../components/HoverTooltip/HoverTooltip";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLoanData from "../../../hooks/useLoanData";
import { financial } from "../../../helper";
import { ConnectWallet } from "@thirdweb-dev/react";
import ModalContainer from "../../../components/ModalContainer/ModalContainer";
import ModalContent from "../../../components/ModalContent/ModalContent";
import ChooseWallet from "../../../components/ChooseWallet/ChooseWallet";
import LoanFinalized from "../../../components/LoanFinalized/LoanFinalized";
import { IS_DEMO_MODE } from "../../../constants/env";

const terms = [
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm lg:text-base">
        By finalizing your loan request, you will receive a Rocko wallet that
        will help facilitate and manage your loan. Rocko will have no access or
        control over funds inside your wallet.
      </li>
    ),
  },
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm lg:text-base">
        You will be asked to authorize a transaction for the loan amount
        required (shown above). If your Rocko wallet does not receive the loan
        amount required, your loan may not be fulfilled.
      </li>
    ),
  },
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm lg:text-base">
        Rocko’s service fee will be taken out of the initial amount transferred
        to your Rocko wallet. More info on Rocko’s service fee can be found{" "}
        <Link href={"/"} className="underline">
        here
        </Link>
        .
      </li>
    ),
  },
];

const StepFive = () => {
  const { loanData, setLoanData } = useLoanData();

  const invoice = [
    {
      description: "Lending Protocol",
      details: <span className="underline">Compound Finance</span>,
    },
    {
      description: "Loan Amount",
      details: `~$${financial(loanData?.borrowing)} USDC`,
      subDetails: `~$${financial(loanData?.borrowing)}`,
    },
    {
      description: "Current APR",
      details: IS_DEMO_MODE ? "3.84%" : `${financial(loanData?.currentAPR, 2)}%`,
    },
    {
      description: "Amount Required for Loan",
      details: `${financial(loanData?.collateralNeeded, 3)} ETH`,
      subDetails: `$${financial(loanData?.collateralNeeded * loanData?.collateralPrice, 2)}`,
      subDescription: [
        {
          description: "Collateral",
          details: `${financial(loanData?.collateralNeeded, 3)} ETH`,
          subDetails: `$${financial(loanData?.collateralNeeded * loanData?.collateralPrice, 2)}`,
        },
        {
          description: "Rocko Service Fee",
          details: `${0} ETH`,
          subDetails: `$0.00`,
        },
      ],
    },
    {
      description: "Collateral Buffer",
      details: loanData?.buffer + "%",
    },
    {
      description: "Estimated Time to Receive Loan",
      details: "<15 Minutes*",
    },
    {
      description: "Collateral Parameters & Loan Terms",
      subDescription: [
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0">Max Loan-to-Value </span>{" "}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `${loanData?.loanToValue * 100}%`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1 w-max">
              <span className="mr-1 lg:mr-0">Liquidation Threshold </span>{" "}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `${loanData?.liquidationThreshold * 100}%`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0">Liquidation Penalty </span>{" "}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `${financial(loanData?.liquidationPenalty * 100)}%`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0">Loan Term </span>{" "}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `Open Ended`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1 w-max">
              <span className="mr-1 lg:mr-0">Minimum Monthly Payment </span>{" "}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: `None`,
        },
        {
          description: (
            <div className="flex items-center lg:gap-x-1">
              <span className="mr-1 lg:mr-0">Protocol Rewards </span>{" "}
              <HoverTooltip text="this is tooltip" />
            </div>
          ),
          details: IS_DEMO_MODE ? "2.00%" : `${financial(loanData?.rewardRate, 2)}%`,
        },
      ],
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState("");
  const [openModalFor, setOpenModalFor] = useState("");
  const [modalStep,setModalStep] = useState(0);

  const handlePaymentMethodChange = (event) => {
    const inputValue = event.target.value;
    setPaymentMethod(inputValue);

    if (setLoanData) {
      setLoanData((prevLoanData) => {
        return {
          ...prevLoanData,
          paymentMethod: (inputValue || ""),
        };
      });
    }
  };

  return (
    <main className="container mx-auto px-4 md:8 py-4 sm:py-6 lg:py-10">
      <h1 className="text-2xl lg:text-3xl font-semibold">Finalize Your Loan</h1>
      {/* ---------------------- First Section Start ------------------------ */}
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
          <h3 className="text-xl font-medium mb-4">Loan Summary</h3>
          <div className="divide-y-2">
            {invoice.map((info, i) => (
              <React.Fragment key={i}>
                <div className="flex pb-3 pt-2 flex-wrap items-center space-y-2">
                  <p className="font-medium w-[62%] md:w-1/2">
                    {info?.description}
                  </p>
                  <div className="w-[38%] md:w-1/2 text-right md:text-left">
                    <p>{info?.details}</p>
                    {info?.subDetails && (
                      <p className="text-sm text-gray-500">
                        {info?.subDetails}
                      </p>
                    )}
                  </div>
                  {info?.subDescription &&
                    info?.subDescription.map((innerInfo, i) => (
                      <React.Fragment key={i}>
                        <div className="pt-1 md:pt-0 w-[65%] md:w-1/2 lg:pl-6">
                          {innerInfo?.description}
                        </div>
                        <div className="pt-1 md:pt-0 w-[35%] md:w-1/2 text-right md:text-left">
                          <p>{innerInfo?.details}</p>
                          {innerInfo?.subDetails && (
                            <p className="text-sm text-gray-500">
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
          <div className="mt-2 p-5 bg-gray-100 rounded-2xl">
            <p className="text-slate-600 text-sm lg:text-base">
              *Loan fulfillment times are subject to the Ethereum network.
              Fulfillment may be delayed during periods of high congestion
            </p>
          </div>
        </div>
      </section>
      {/* ---------------------- First Section End ------------------------ */}
      {/* ---------------------- Second Section Start ------------------------ */}
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-5">
          <h3 className="text-xl font-medium mb-6">
            Where do you want to receive your loan?
          </h3>
          <div className="md:flex justify-between mb-7">
            <div className="flex md:items-center">
              <input
                type="radio"
                id="wallet1"
                name="contact"
                value="default"
                checked={paymentMethod === "default"}
                className="w-[30px] h-[30px] md:w-7 md:h-7 border-2 border-black"
                onChange={(e) => handlePaymentMethodChange(e)}
              />
              <label htmlFor="wallet1" className="pl-4">
                <p className="font-semibold">
                  Coinbase or Gemini Account{" "}
                  <span className="font-medium text-xs md:text-sm lg:ml-3 bg-[#EFF3FE] py-1 px-2 rounded-xl text-[#276EF1] inline-block my-1 lg:my-0">
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
                onClick={() => { setOpenModalFor("Coinbase or Gemini"); setPaymentMethod("default"); }}
                className={`w-24 md:w-32 h-10 rounded-3xl text-sm md:text-base text-[#eee] bg-[#2C3B8D]`}
              >
                Sign in
              </button>
            </div>
          </div>
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
                  background: paymentMethod === "ethereum" ? "#2C3B8D" : "#eee",
                  color: paymentMethod === "ethereum" ? "#eee" : "#2C3B8D",
                  borderRadius: "1.5rem",
                  minWidth: "8rem",
                }}
              />
            </div>
          </div>
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

              {/* if select other address then it will be active  start*/}
              {paymentMethod === "other" && (
                <>
                  <div className="">
                    <p className="text-sm font-semibold font-inter mb-2">
                      Enter Wallet Address
                    </p>
                    <div className="max-w-[426px] w-full">
                      <input
                        type="text"
                        className="w-full p-4 border border-[#E6E6E6] rounded-[10px] block focus:outline-none"
                        defaultValue={"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"}
                      />
                    </div>
                    <div className="my-4 p-4 rounded-[10px] bg-[#FFFAF0] flex items-center justify-start gap-2 border border-[#dbdbda]">
                      <img
                        src="./assets/StatusWarning.svg"
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
                </>
              )}
              {/* if select other address then it will be active  end*/}
            </div>
          </div>

          <div className="mt-2 p-5 bg-gray-100 rounded-2xl">
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
      {openModalFor && (
        <>
          <ModalContainer>
            {
              modalStep === 0 && <ChooseWallet setModalStep={setModalStep} setOpenModalFor={setOpenModalFor} />
            }

            {
              modalStep === 1 && <LoanFinalized setOpenModalFor={setOpenModalFor}/>
            }
          </ModalContainer>
        </>
      )}
      {/* ---------------------- when choose Coinbase or Gemini Account End ------------------------ */}
    </main>
  );
};

export default StepFive;
