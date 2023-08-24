"use client";
import Link from "next/link";
import LoanSummary from "../home/loanSummary/loanSummary";
import { CurrencyStep } from "@/types/type";
import { ChangeEvent, FC, useState } from "react";
import CoinCard from "../home/coinCard/coinCard";
import useLoanData from "@/hooks/useLoanData";

const StepOne: FC<CurrencyStep> = ({ title, currency }) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const { loanData, setLoanData, loanSteps, currentStep, setCurrentStep } =
    useLoanData();

  const handleBorrowValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setLoanData) {
      setLoanData((prevLoanData) => {
        return {
          ...prevLoanData,
          borrowing: parseFloat(event.target.value || "0"),
          sixMonthInterest: parseFloat(
            (
              (prevLoanData.currentAPR / 100) *
              parseFloat(event.target.value || "0") *
              0.5
            ).toFixed(2)
          ),
          twelveMonthInterest: parseFloat(
            (
              (prevLoanData.currentAPR / 100) *
              parseFloat(event.target.value || "0") *
              1
            ).toFixed(2)
          ),
          twentyFourMonthInterest: parseFloat(
            (
              (prevLoanData.currentAPR / 100) *
              parseFloat(event.target.value || "0") *
              2
            ).toFixed(2)
          ),
        };
      });
    }
  };

  const handleSelect = (info: any) => {
    setSelectedCoin(info.coinShortName);
    if (setLoanData) {
      setLoanData((prevLoanData) => {
        return {
          ...prevLoanData,
          coin: selectedCoin,
          currentAPR: parseFloat(info.currentAPR),
          coinIcon: info.coinIcon
        };
      });
    }
  };
  return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
      {/* title start  */}
      <h1 className="text-2xl lg:text-3xl text-blackPrimary lg:text-start text-center">
        Customize Your Loan
      </h1>
      {/* title end  */}

      {/* Choose section  */}
      <section className="flex gap-4 lg:gap-10 my-6 flex-col sm:flex-row ">
        <div className="w-full sm:w-8/12 ">
          <div className="p-6 border border-whiteSecondary rounded-2xl">
            <p className=" text-xl font-medium  text-blackPrimary lg:text-start text-center">
              {title}
            </p>
            <div className="grid grid-cols-2 gap-6 w-full my-4 py-4 max-w-[420px]">
              {currency?.map((singleCurrency) => (
                // <div key={singleCurrency.id} className="max-w-[200px] flex-1">
                  <CoinCard
                  key={singleCurrency.id} 
                    coinIcon={singleCurrency.symbol || ""}
                    coinShortName={singleCurrency.name || ""}
                    coinName={singleCurrency.fullName || ""}
                    selectedCoin={selectedCoin}
                    handleSelect={handleSelect}
                    label={singleCurrency.label}
                    currentAPR={singleCurrency.currentAPR}
                  />
                // </div>
              ))}
            </div>
            <div className="py-6 space-y-6">
              <p className="text-blackPrimary font-medium text-xl">
                How much do you want to borrow?
              </p>
              <div className="flex items-center justify-start gap-4 p-4 rounded-[10px] border border-[#E6E6E6] max-w-[310px] w-full bg-white ">
                <input
                  onChange={handleBorrowValueChange}
                  type="text"
                  name="num"
                  id="num"
                  className="w-60 md:flex-1 focus:outline-none border-none "
                  placeholder="10,000"
                />
                <label htmlFor="num">{selectedCoin}</label>
              </div>
            </div>
            <div className=" p-4 lg:p-6 space-y-6 lg:space-y-10 bg-whiteTertiary rounded-2xl">
              <p className="text-sm text-blackSecondary">
                Only USDC (a USD-backed stablecoin) is available at this time.
                However, you can convert USDC into USD on most crypto exchanges.
                <Link href={"/"} className="underline">
                  Learn more.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 border border-[#E2E2E2] flex-1 rounded-2xl">
          <LoanSummary />
        </div>
      </section>
    </main>
  );
};

export default StepOne;
