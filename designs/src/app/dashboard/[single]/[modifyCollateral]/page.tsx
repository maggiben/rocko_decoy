/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import StatusWarning from "@/assets/StatusWarning.svg";
import ModalContainer from "@/components/shared/modalContainer/modalContainer";
import ChooseWallet from "@/components/pages/stepFive/chooseWallet/chooseWallet";
import LoanFinalized from "@/components/pages/stepFive/loanFinalized/loanFinalized";
import correct from "@/assets/correct.svg";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface InnerInfo {
  description: string;
  details: string;
  subDetails?: string;
}

interface Info {
  description: string;
  details?: string | number | JSX.Element;
  subDetails?: string;
  subDescription?: InnerInfo[];
}

interface Term {
  rule: JSX.Element;
}

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

const ModifyCollateral: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [openModalFor, setOpenModalFor] = useState("");
  const [modalStep, setModalStep] = useState(0);
  const [connect, setConnect] = useState<boolean>(true);
  const router = useSearchParams();
  const amount = router.get("try");

  const invoice: Info[] = [
    {
      description: "Lending Protocol",
      details: <span className="underline">Compound Finance</span>,
    },
    {
      description: "Collateral Amount",
      details: "0.12 ETH",
      subDetails: `~$209.45`,
    },
    {
      description: "Amount Required for Loan",
      subDescription: [
        {
          description: "Total Collateral",
          details: `${amount === "add" ? "1.96 ETH" : "1.72 ETH"}`,
          subDetails: `${amount === "add" ? "~$2,918.82" : "~$2,425.64"}`,
        },
        {
          description: "Collateral Buffer",
          details: `${amount === "add" ? "107%" : "96%"}`,
        },
        {
          description: "Liquidation Price (ETH)",
          details: `${amount === "add" ? "$1,221.74" : "$1,412.94"}`,
        },
      ],
    },
  ];

  return (
    <main className="container mx-auto px-4 py-4 sm:py-6 lg:py-10">
      <h1 className="text-2xl lg:text-3xl font-semibold">Modify Collateral</h1>
      {amount === "add" ? (
        <p>
          You’re adding more <strong>ETH</strong> to your loan collateral
        </p>
      ) : (
        <p>
          You’re withdrawing <strong>ETH</strong> from your loan collateral
        </p>
      )}

      {/* ---------------------- First Section Start ------------------------ */}
      <section className="my-6">
        <div className="lg:max-w-4xl border-2 rounded-2xl p-3 lg:p-6">
          <h3 className="text-xl font-medium mb-4">Summary</h3>
          <div className="divide-y-2">
            {invoice.map((info, i) => (
              <React.Fragment key={i}>
                <div className="flex pb-3 pt-2 flex-wrap items-center space-y-2">
                  <p className="font-medium w-[62%] md:w-1/2">
                    {info?.description}
                  </p>
                  <div className="w-[38%] md:w-1/2 text-right md:text-left">
                    <p>
                      <strong>{info?.details}</strong>
                    </p>
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
                          <p>
                            <strong>{innerInfo?.details}</strong>
                          </p>
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
        </div>
      </section>
      {/* ---------------------- First Section End ------------------------ */}
      {/* ---------------------- Second Section Start ------------------------ */}
      <section className="my-6">
        <div className="lg:max-w-4xl border-2 rounded-2xl p-3 lg:p-5">
          <h3 className="text-xl font-medium mb-6">
            {amount === "add"
              ? "Choose your funding source"
              : "Where do you want to receive your collateral?"}
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
              {connect ? (
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
              ) : (
                <button className="mx-auto md:m-0 flex items-center gap-x-1 px-2 py-1 text-green-600 bg-green-100 rounded-md">
                  <Image src={correct} alt="Correct Image" />
                  <p>Connected</p>
                </button>
              )}
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
              <Link href={`/dashboard/invoice`}>
                <button
                  className={`font-semibold  text-xs md:text-sm text-blue  py-[10px]  px-6 rounded-full 
                   bg-grayPrimary`}
                >
                  Back
                </button>
              </Link>
              <Link
                href={`/dashboard/${"invoice"}/${"modify_collateral"}/${amount}`}
              >
                <button
                  className={`font-semibold  text-xs md:text-sm ${
                    !connect ? "bg-blue" : "bg-blue/40"
                  } py-[10px]  px-6 rounded-full text-white `}
                  disabled={connect}
                >
                  Confirm
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------------- when choose Coinbase or Gemini Account start ------------------------ */}
      {paymentMethod === "default" && openModalFor && (
        <>
          <ModalContainer>
            {modalStep === 0 && (
              <ChooseWallet
                setModalStep={setModalStep}
                setOpenModalFor={setOpenModalFor}
                setConnect={setConnect}
              />
            )}

            {modalStep === 1 && (
              <LoanFinalized setOpenModalFor={setOpenModalFor} />
            )}
          </ModalContainer>
        </>
      )}
      {/* ---------------------- when choose Coinbase or Gemini Account End ------------------------ */}
    </main>
  );
};

export default ModifyCollateral;
