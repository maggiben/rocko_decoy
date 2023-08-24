"use client";
import LoanSummary from "../home/loanSummary/loanSummary";
import { FC, useEffect, useRef, useState } from "react";
import { RiskStep } from "@/types/type";
import Link from "next/link";

const StepFour: FC<RiskStep> = ({ title }) => {
  const [value, setValue] = useState<number>(0);
  const [thumbPosition, setThumbPosition] = useState<number>(0);
  const [valueDivWidth, setValueDivWidth] = useState<number>(0);

  
  const valueDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (valueDivRef.current) {
      setValueDivWidth(valueDivRef.current.offsetWidth);
    }
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    setThumbPosition(
      ((newValue - parseInt(event.target.min, 10)) /
        (parseInt(event.target.max, 10) - parseInt(event.target.min, 10))) *
        100
    );
  };
const isEnd = thumbPosition === 100 ;
  const adjustedThumbPosition = isEnd
    ? thumbPosition - (valueDivWidth / 2)  // Subtract half of value div width
    : thumbPosition;

  const valueDivStyle = {
    left: `calc(${thumbPosition}% - ${valueDivWidth/2}px)`,
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

            <div className="flex items-end justify-between gap-3 min-h-[160px] py-4">
              <p className="">Heigh Risk</p>

              <div className="relative flex-1">
                <input
                  type="range"
                  className="range w-full"
                  min="0"
                  max="200"
                  value={value}
                  onChange={handleInputChange}
                  data-value={value}
                  style={{
                    background: `linear-gradient(to right, #2C3B8D 0%, #2C3B8D ${thumbPosition}%, gray ${thumbPosition}%, gray 100%)`,
                  }}
                />
                <div
                ref={valueDivRef}
                  className="absolute left-0 -top-16 text-white bg-[#2C3B8D] rounded-full py-3 px-4"
                  style={valueDivStyle}
                >
                  <p className="">{value}%</p>
                 {/*  <div className="w-1 h-10 bg-[#2C3B8D] absolute top-full left-1/2 -translate-x-1/2"></div> */}
                </div>
              </div>
              <p className="">Lower Risk</p>
            </div>
            <p className="pt-6   text-sm text-blackSecondary">
            Your loan requires your collateral to maintain a certain value at all times, otherwise your collateral may be liquidated (i.e. sold) by the lender. By posting more collateral than required, you can reduce the projected liquidation price and the likelihood of this occurring.
                  <Link href={"/"} className="underline">
                    Learn more.
                  </Link>
                </p>
           
          </div>
        </div>
        <div className="p-6 border border-[#E2E2E2] flex-1 rounded-2xl">
          <LoanSummary />
        </div>
      </section>
    </main>
  );
};

export default StepFour;
