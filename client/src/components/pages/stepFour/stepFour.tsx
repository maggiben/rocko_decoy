"use client";
import LoanSummary from "../home/loanSummary/loanSummary";
import {
  ChangeEvent,
  FC,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiskStep } from "@/types/type";
import Link from "next/link";
import useLoanData from "@/hooks/useLoanData";
import RangeSlider from "@/components/rangeSlider/rangeSlider";

const StepFour: FC<RiskStep> = ({ title }) => {
  const [value, setValue] = useState<number>(0);
  const [customValue, setCustomValue] = useState<number>();
  const [thumbPosition, setThumbPosition] = useState<number>(0);
  const [valueDivWidth, setValueDivWidth] = useState<number>(0);

  const { loanData, setLoanData } = useLoanData();

  const valueDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (valueDivRef.current) {
      setValueDivWidth(valueDivRef.current.offsetWidth);
    }
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value || "0", 10);
    setValue(newValue);
    setCustomValue(newValue);
    setThumbPosition(
      ((newValue - parseInt(event.target.min, 10)) /
        (parseInt(event.target.max, 10) - parseInt(event.target.min, 10))) *
        100
    );

    if (setLoanData) {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        activeNextButton: true,
      }));
    }
  };

  const handleCustomInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value || "0", 10);
    if (newValue <= 1000) {
      setValue(newValue);
    }
    if (newValue > 1000) {
      setCustomValue(1000);
      setValue(1000);
      return;
    }
    if (setLoanData) {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        activeNextButton: true,
      }));
    }

    if (newValue > 400) return;
    setThumbPosition(
      ((newValue - parseInt(event.target.min, 10)) /
        (400 - parseInt(event.target.min, 10))) *
        100
    );
  };
  const handleCustomInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      setCustomValue(undefined);
      return;
    }
    const newValue = parseInt(event.target.value, 10);
    if (newValue <= 1000) {
      setCustomValue(newValue);
    }

    if (newValue > 1000) {
      setCustomValue(1000);
      setValue(1000);
      return;
    }

    if (newValue >= 400 && newValue <= 1000) {
      setValue(newValue);
    }
  };

  const isEnd = thumbPosition === 100;
  const adjustedThumbPosition = isEnd
    ? thumbPosition - valueDivWidth / 2 // Subtract half of value div width
    : thumbPosition;

  const valueDivStyle = {
    left: `calc(${thumbPosition}% - ${80 / 2}px)`,
  };

  // clg
  // console.log({ thumbPosition });
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
            <RangeSlider />

            <p className={`text-sm text-blackSecondary`}>
              Your loan requires your collateral to maintain a certain value at
              all times, otherwise your collateral may be liquidated (i.e. sold)
              by the lender. By posting more collateral than required, you can
              reduce the projected liquidation price and the likelihood of this
              occurring.{" "}
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
