"use client";
import HoverTooltip from "@/components/shared/tooltip/tooltip";
import Image from "next/image";
import React, { useState } from "react";
import StatusWarning from "@/assets/StatusWarning.svg";
import closeIcon from "@/assets/Close.svg";
import ModalContainer from "@/components/shared/modalContainer/modalContainer";
import ModalContent from "@/components/shared/modalContainer/modalContent/modalContent";
import ChooseWallet from "./chooseWallet/chooseWallet";
import LoanFinalized from "./loanFinalized/loanFinalized";
interface InnerInfo {
  description: string | JSX.Element;
  details?: string | number | JSX.Element;
  subDetails?: string;
}

interface Info {
  description: string | JSX.Element;
  details?: string | number | JSX.Element;
  subDetails?: string;
  subDescription?: InnerInfo[];
}

interface Term {
  rule: JSX.Element;
}

const invoice: Info[] = [
  {
    description: "Lending Protocol",
    details: <span className="underline">Compound Finance</span>,
  },
  {
    description: "Loan Amount",
    details: `$10,000 USDC `,
    subDetails: `~$10,000.00`,
  },
  {
    description: "Current APR",
    details: 3.84 + "%",
  },
  {
    description: "Amount Required for Loan",
    details: `${14.7341} ETH`,
    subDetails: `$27,647.01`,
    subDescription: [
      {
        description: "Collateral",
        details: `${14.6241} ETH`,
        subDetails: `$27,647.01`,
      },
      {
        description: "Rocko Service Fee",
        details: `${0.11} ETH`,
        subDetails: `$200.00`,
      },
    ],
  },
  {
    description: "Collateral Buffer",
    details: 1.0 + "%",
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
            <span className="mr-1 lg:mr-0">Loan-to-value-ratio </span>{" "}
            <HoverTooltip text="this is tooltip" />
          </div>
        ),
        details: `${83}%`,
      },
      {
        description: (
          <div className="flex items-center lg:gap-x-1 w-max">
            <span className="mr-1 lg:mr-0">Liquidation Threshold </span>{" "}
            <HoverTooltip text="this is tooltip" />
          </div>
        ),
        details: `${90}%`,
      },
      {
        description: (
          <div className="flex items-center lg:gap-x-1">
            <span className="mr-1 lg:mr-0">Liquidation Penalty </span>{" "}
            <HoverTooltip text="this is tooltip" />
          </div>
        ),
        details: `${5}%`,
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
        details: `${2.01}%`,
      },
    ],
  },
];

const terms: Term[] = [
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm lg:text-base">
        By finalizing your loan request, you will receive a Rocko wallet that
        will help facilitate and manage your loan. Rocko will have no access or
        control over funds inside your wallet
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
        <a href="" className="underline">
          here
        </a>
        .
      </li>
    ),
  },
];

const StepFive: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [openModalFor, setOpenModalFor] = useState("");
  const [modalStep,setModalStep] = useState(0);
  return (
    <main className="container mx-auto px-4 md:8 py-4 sm:py-6 lg:py-10">
      <h1 className="text-2xl lg:text-3xl font-semibold">Finalize Your Loan</h1>
      {/* ---------------------- First Section Start ------------------------ */}
      <section className="my-6">
        <div className="lg:max-w-4xl border-2 rounded-2xl p-3 lg:p-6">
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
        <div className="lg:max-w-4xl border-2 rounded-2xl p-3 lg:p-5">
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
                className="w-[30px] h-[30px] md:w-7 md:h-7 border-2 border-black"
                onChange={(e) => setPaymentMethod(e.target.value)}
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
                onClick={() => setOpenModalFor("Coinbase or Gemini")}
                disabled={paymentMethod !== "default"}
                className={` w-24 md:w-32 h-10 rounded-3xl text-sm md:text-base ${
                  paymentMethod === "default"
                    ? "text-[#eee] bg-[#2C3B8D]"
                    : "bg-[#eee] text-[#2C3B8D]"
                }`}
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
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
              />
              <label htmlFor="wallet2" className="pl-4">
                <p className="font-semibold">Ethereum Wallet</p>
              </label>
            </div>
            <div className="text-center md:text-left mt-1 lg:mt-0">
              <button
                disabled={paymentMethod !== "ethereum"}
                className={`w-24 md:w-32 h-10 rounded-3xl text-sm md:text-base ${
                  paymentMethod === "ethereum"
                    ? "text-[#eee] bg-[#2C3B8D]"
                    : "bg-[#eee] text-[#2C3B8D]"
                }`}
              >
                Connect
              </button>
            </div>
          </div>
          <div className="flex items-start mb-7">
            <input
              type="radio"
              id="wallet3"
              name="contact"
              value="other"
              className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
              onChange={(e) => setPaymentMethod(e.target.value)}
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
      {paymentMethod === "default" && openModalFor && (
        <>
          <ModalContainer>
            {
              modalStep===0 && <ChooseWallet setModalStep={setModalStep} setOpenModalFor={setOpenModalFor} />
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
