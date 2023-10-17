/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import StatusWarning from "@/assets/StatusWarning.svg";
import ModalContainer from "@/components/chips/ModalContainer/ModalContainer";
import ChooseWallet from "@/components/chips/ChooseWallet/ChooseWallet";
import LoanFinalized from "@/components/chips/LoanFinalized/LoanFinalized";
import correct from "@/assets/correct.svg";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import HoverTooltip from "@/components/chips/HoverTooltip/HoverTooltip";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
import { useSingleLoan } from "@/contract/single";
import { useLoanDB } from "@/db/loanDb";
import financial from "@/utility/currencyFormate";

interface InnerInfo {
  description: string | JSX.Element;
  details: string| JSX.Element;
  subDetails?: string | JSX.Element;
}

interface Info {
  description: string;
  details?: string | number | JSX.Element;
  subDetails?: string | JSX.Element;
  subDescription?: InnerInfo[];
}

interface Term {
  rule: JSX.Element;
}

const terms: Term[] = [
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm">
        You will need to authorize the transfer to your Rocko wallet for the
        Payment Amount above. If your Rocko wallet does not receive the Payment
        Amount, no payment will be made.
      </li>
    ),
  },
];

const termsFull: Term[] = [
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm">
        A 5.00 USDC Payment Buffer is added to your payment to ensure the loan
        is fully repaid while accounting for interest that accrues each second.
        Any excess amount will be returned to you along with your collateral.
      </li>
    ),
  },
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm">
        Any rewards you may have earned will be automatically claimed and
        delivered to your wallet/account along with your collateral upon full
        repayment of the loan.
      </li>
    ),
  },
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm">
        You will need to authorize the transfer to your Rocko wallet for the
        Payment Amount above. If your Rocko wallet does not receive the Payment
        Amount, no payment will be made.
      </li>
    ),
  },
];

const MakePayment: FC = () => {
  const [paymentMethod, setPaymentMethod] = useState(""); //! capture which payment method or radio btn a user will select
  const [openModalFor, setOpenModalFor] = useState(""); //! if openModalFor's value is empty string then popup modal is closed if it's not empty string then it'll show up
  const [modalStep, setModalStep] = useState(0); //! passing modalStep value to chooseWallet popup/modal. If modalStep's value is 1 then it will redirect to loanFinalized popup after user clicking continue btn on chooseWallet popup/modal.
  const [connect, setConnect] = useState<boolean>(true); //! after choosing wallet on chooseWallet popup/modal then it'll show connected on the page

  const basicRouter = useParams();
  const router = useSearchParams(); //! use the hooks for getting the URL parameters
  const loanIndex = parseFloat(basicRouter.single.toString() || "0");
  const payment = parseFloat(router.get("payment") || "0"); //! get the URL parameter payment value
  const amount = "add"; //! get the URL parameter amount value

  const { address : zerodevAccount } = useAccount();
  const address = useAddress();
  const { getLoanData } = useLoanDB();
  const { getLiquidationPrice } = useSingleLoan();
  const [ loanData, setLoanData ] = useState<any>();
  const [ liquidationPrice, setLiquidationPrice ] = useState<any>();
  const [ currentBalance, setCurrentBalance ] = useState<any>();

  const invoice: Info[] = [
    {
      description: "Lending Protocol",
      details: <span className="underline">Compound Finance</span>,
    },
    {
      description: "Payment Amount",
      subDescription: [
        {
          description:
            payment === currentBalance ? (
              <>
                <p className="text-sm">Outstanding balance</p>
              </>
            ) : (
              ""
            ),
          details: payment === currentBalance ? `${new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 6,
              }).format(parseFloat(payment.toFixed(6).replace(/\.?0+$/, '')))} USDC` : "",
          subDetails: payment === currentBalance ? `~$${new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 6,
              }).format(parseFloat(payment.toFixed(6).replace(/\.?0+$/, '')))}` : "",
        },
        {
          description:
            payment === currentBalance ? (
              <div className="flex items-center gap-2">
                <p className="text-sm">Payment Buffer</p>
                <HoverTooltip text="Payment Butter" />
              </div>
            ) : (
              ""
            ),
          details: payment === currentBalance ? `5.00 USDC` : "",
          subDetails: payment === currentBalance ? `~$5.00` : "",
        },
      ],
      details: <span className="font-semibold">{new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 6,
              }).format(parseFloat(payment.toFixed(6).replace(/\.?0+$/, '')))} USDC</span>,
      subDetails: `~$${new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 6,
              }).format(parseFloat(payment.toFixed(6).replace(/\.?0+$/, '')))}`,
    },
    {
      description: "Projected values after payment",
      subDescription: [
        {
          description: "Outstanding balance",
          details: <span className="font-semibold text-sm">{(currentBalance - payment).toFixed(6).replace(/\.?0+$/, '')} USDC</span>,
          subDetails: `~$${new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 6,
              }).format(parseFloat((currentBalance - payment).toFixed(6).replace(/\.?0+$/, '')))}`,
        },
        {
          description: "Collateral Buffer",
          details: <span className="font-semibold text-sm">{loanData?.collateral_buffer}%</span>,
        },
        {
          description: "Liquidation Price (ETH)",
          details: <span className="font-semibold text-sm">{liquidationPrice == "N/A" ? "N/A" : `$${financial(liquidationPrice, 2)}`}</span>,
        },
      ],
    },
  ];

  const initialize = async () => {
    console.log(zerodevAccount)
    if (zerodevAccount) {
      const result = await getLoanData(zerodevAccount);
      if (result) {
        const active_loans = result.filter((loan: any) => loan.loan_active == 1);
        console.log(active_loans[loanIndex - 1]);
        setLoanData(active_loans[loanIndex - 1]);
        setCurrentBalance(active_loans[loanIndex - 1]?.outstanding_balance);
      }
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zerodevAccount]);

  useEffect(() => {
    getLiquidationPrice(loanData?.outstanding_balance - payment, loanData?.collateral)
    .then(_price => setLiquidationPrice(_price))
    .catch(e => console.log(e));
  });

  return (
    <main className="container mx-auto px-4 py-4 sm:py-6 lg:py-10">
      <h1 className="text-2xl lg:text-3xl font-semibold">Make a Payment</h1>
      {payment === currentBalance ? (
        <p>You’re repaying your loan in full</p>
      ) : (
        <p>You’re making a partial payment</p>
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
                    <p className="text-base text-[#141414]">
                      {info?.details}
                    </p>
                    {info?.subDetails && (
                      <p className="text-sm text-[#545454]">
                        {info?.subDetails}
                      </p>
                    )}
                  </div>
                  {info?.subDescription &&
                    info?.subDescription.map((innerInfo, i) => (
                      <React.Fragment key={i}>
                        <div className="pt-1 md:pt-0 w-[65%] md:w-1/2 lg:pl-6 text-sm">
                          {innerInfo?.description} {/* //! come here  */}
                        </div>
                        <div className="pt-1 md:pt-0 w-[35%] md:w-1/2 text-right md:text-left">
                          <p className="font-semibold text-xs text-[#141414]">
                            {innerInfo?.details}
                          </p>
                          {innerInfo?.subDetails && (
                            <p className="text-xs text-gray-500">
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
          {/* radio btn - 1 Container*/}
          <div className="md:flex justify-between mb-7">
            {/* radio btn - 1 */}
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
                <p className="font-medium">
                  Coinbase or Gemini Account{" "}
                  <span className=" text-xs lg:ml-3 bg-[#EFF3FE] py-1 px-2 rounded-xl text-[#276EF1] inline-block my-1 lg:my-0">
                    Recommended
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Minimize risk of funds being sent to an incorrect address
                </p>
              </label>
            </div>
            <div className="text-center md:text-left mt-1 lg:mt-0">
              {/* based on the connect value toggling the buttons */}
              {connect ? (
                <button
                  onClick={() => setOpenModalFor("Coinbase or Gemini")}
                  disabled={paymentMethod !== "default"}
                  className={` w-24 md:w-32 h-10 rounded-3xl text-sm font-semibold ${
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
          {/* radio btn - 2 Container*/}
          <div className="md:flex justify-between mb-7">
            {/* radio btn - 2*/}
            <div className="flex items-center">
              <input
                type="radio"
                id="wallet2"
                name="contact"
                value="ethereum"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setConnect(true);
                }}
                className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
              />
              <label htmlFor="wallet2" className="pl-4">
                <p className="font-medium">Ethereum Wallet</p>
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
          {/* radio btn - 3*/}
          <div className="flex items-start mb-7">
            <input
              type="radio"
              id="wallet3"
              name="contact"
              value="other"
              className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setConnect(true);
              }}
            />
            <div className="pl-4">
              <label htmlFor="wallet3" className="">
                <p className="font-medium mb-6">
                  Other Exchange or Wallet Address
                </p>
              </label>

              {/* if select other address then it will be active -- start*/}
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
              {/* if select other address then it will be active -- end*/}
            </div>
          </div>

          <div className="mt-2 p-5 bg-gray-100 rounded-2xl">
            <ul className="list-disc">
              {payment === currentBalance
                ? termsFull.map((term, i) => (
                    <React.Fragment key={i}>
                      {term.rule}
                    </React.Fragment>
                  ))
                : terms.map((term, i) => (
                    <React.Fragment key={i}>{term.rule}
                    </React.Fragment>
                  ))}
            </ul>
          </div>
        </div>
      </section>
      {/* ---------------------- Second Section End ------------------------ */}
      {/* ---------------------footer start------------------- */}
      <div className="h-20 w-full"></div>
      <div className=" mt-24 fixed bottom-0 left-0 w-full bg-white ">
        <div className="bg-[#F7F7F7] h-1 w-full relative">
          <div
            className={`duration-500 bg-blue h-full absolute left-0 top-0 w-8/12`}
          ></div>
        </div>
        <div className="container mx-auto">
          <div className="p-4">
            <div className="flex items-center justify-end gap-3">
              {/* //!after clicking back btn it'll redirect to previous page */}
              <Link href={`/loan-dashboard/1?active=true`}>
                <button
                  className={`font-semibold  text-xs md:text-sm text-blue  py-[10px]  px-6 rounded-full 
                   bg-grayPrimary`}
                >
                  Back
                </button>
              </Link>
              {/* //!after clicking continue page it'll redirect to "processing" page with dynamic URL */}
              <Link
                href={`/loan-dashboard/${loanIndex}/${"make-payment"}/processing?payment=${payment}`}
              >
                <button
                  className={`font-semibold  text-xs md:text-sm ${
                    address && zerodevAccount ? "bg-blue" : "bg-blue/40"
                  } py-[10px]  px-6 rounded-full text-white `}
                  disabled={!address || !zerodevAccount}
                >
                  Confirm
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* //!---------------------footer end------------------- */}
      {/* //! If user select the first radio button and click "Sign in"  btn then chosseWallet popup/modal will show and passing modalStep,openModalFor&connet value to chooseWallet popup/modal [for mor details about the props look up where they're initialize] */}
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
    </main>
  );
};

export default MakePayment;
