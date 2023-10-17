import ModalContent from "../ModalContent/ModalContent";
import closeIcon from "@/assets/Close.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import financial from "@/utility/currencyFormate";

interface FormData {
  numberInput: string;
}
const MakePaymentModal = ({
  setOpenModalFor,
  setModalStep,
  loanIndex,
  currentBalance,
  collateral,
  buffer,
  threshold
}: {
  setOpenModalFor: Function;
  setModalStep: Function;
  loanIndex: Number;
  currentBalance: string;
  collateral: string;
  buffer: string;
  threshold: string;
}) => {
  const basicRouter = useParams();
  const loanIndex = parseFloat(basicRouter.single.toString() || "0");
  const [activeInputField, setActiveInputField] = useState(false); //! input field active on selecting radio btn
  const [inputNumber, setInputNumber] = useState<string | undefined>(); //! turning inputNumber into inputText to save & show number with commas on onBlur handler & number without commas on onFocus handler in inputfiled
  const [changeInputType, setChangeInputType] = useState<string>("text"); //! to show value with commas & without commas n inputfiled on onBlur handler

  console.log(loanIndex)

  const handleBorrowValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    if (
      parseFloat(inputValue?.replace(/,/g, "") || "0") >
      parseFloat(currentBalance.replace(/,/g, "") || "0")
    ) {
      setInputNumber(currentBalance.replace(/,/g, ""));

      return;
    }

    setInputNumber(inputValue);

    setChangeInputType("number"); /* show number without commas */
    setActiveInputField(true);
  };

  const handleRepayBtn = () => {
    setInputNumber(currentBalance);
  };

  const getLiquidationPrice = (): string => {
    const inputFloat = parseFloat(inputNumber?.replace(/,/g, "") || "0");
    const balanceFloat = parseFloat(currentBalance?.replace(/,/g, "") || "0");

    const outstanding_balance = balanceFloat - inputFloat;
    if (outstanding_balance === 0) {
      return "N/A";
    } else {
      const liquidationPrice = outstanding_balance / Number(threshold) / Number(collateral);
      return financial(liquidationPrice, 2);
    }
  };

  return (
    <ModalContent>
      <div className="flex items-start justify-between gap-2 ">
        <h4 className="text-2xl font-semibold font-inter">Make a Payment</h4>
        {/* close button start */}
        <div>
          <button
            onClick={() => setOpenModalFor("")}
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
        {/* close button end */}
      </div>
      {/* select option */}
      <div className="space-y-3">
        <p className="font-medium text-[#141414]">
          Outstanding balance: {currentBalance} USDC
        </p>
      </div>
      {/* input field with react form hook */}
      <div>
        <p className="text-sm mb-2 font-bold"> Enter Payment Amount </p>
        <input
          name="numberInput"
          type={changeInputType} /* switch between "text" & "number" */
          id="numberField"
          min={0.000001}
          max={currentBalance}
          onKeyDown={(event) => {
            const keyPressed = event.key;
            // const isDecimalDigit = /^\d+$/.test(keyPressed);
            const isAllowedHexChar = /^[a-eA-E]+$/.test(keyPressed);
            console.log(keyPressed);
            if (
              /* not allowing any character without number */
              isAllowedHexChar
            ) {
              event.preventDefault();
            }
            if (event.key === "-") {
              event.preventDefault();
            }
          }}
          className="w-full p-4 focus:outline-none border-2 border-gray-200 rounded-lg bg-white number-input"
          placeholder={currentBalance.toString()}
          value={inputNumber}
          onFocus={() => {
            const valueWithoutCommas = inputNumber?.replace(/,/g, "");
            setInputNumber(valueWithoutCommas);
            setChangeInputType("number");
          }}
          onBlur={(event) => {
            /* on onBlur set the number */
            if (
              parseFloat(inputNumber?.replace(/,/g, "") || "0") < 0.000001 &&
              inputNumber !== ""
            ) {
              setInputNumber("0.000001");

              return;
            }
            const valueWithoutCommas = parseFloat(
              inputNumber?.replace(/,/g, "") || "0.000001"
            );
            setInputNumber(
              new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 6,
              }).format(valueWithoutCommas)
            );

            setChangeInputType("text");
          }}
          onChange={handleBorrowValueChange}
        />
        <p
          className={`text-right mr-5 -mt-10 ${
            activeInputField ? "text-black" : "text-black"
          }`}
        >
          {" "}
          {/* active text on selecting radion button */}
          USDC
        </p>
      </div>
      {/* input field with react form hook end
       */}

      <div className="flex items-center justify-between">
        <button
          onClick={handleRepayBtn}
          className="py-2 px-4 rounded-full text-[#2C3B8D] bg-[#EEEEEE] font-semibold text-xs "
        >
          Repay Loan in Full
        </button>
      </div>
      <div className="p-6 bg-gray-100 rounded-2xl">
        <div className="mb-6">
          <p className="font-semibold ">Projected values after payment</p>
        </div>
        <div className="grid grid-cols-2 space-y-2">
          <p className="text-sm text-gray-600">Outstanding Balance</p>
          {/* after putting a value on inputfield the number(based on user's intention like "add" or "withdraw") will show */}
          <p className="font-semibold text-right">
            {parseFloat(inputNumber?.replace(/,/g, "") || "0") > 0
              ? `${parseFloat(currentBalance?.replace(/,/g, "") || "0") - parseFloat(inputNumber?.replace(/,/g, "") || "0")} USDC`
              : "--"}
            <span className="block text-gray-600 text-sm font-normal">
              {parseFloat(inputNumber?.replace(/,/g, "") || "0") > 0
                ? `$${parseFloat(currentBalance?.replace(/,/g, "") || "0") - parseFloat(inputNumber?.replace(/,/g, "") || "0")}`
                : "--"}
            </span>
          </p>
          <p className="text-sm text-gray-600">Collateral Buffer</p>
          <p className="font-semibold text-right">
            {parseFloat(inputNumber?.replace(/,/g, "") || "0") > 0
              ? `${buffer}%`
              : "--"}
          </p>
          <p className="text-sm text-gray-600">Liquidation Price (ETH)</p>
          <p className="font-semibold text-right">
            {parseFloat(inputNumber?.replace(/,/g, "") || "0") > 0
              ? getLiquidationPrice()
              : "--"}
          </p>
        </div>
      </div>
      {/* continue button */}
      <Link
        href={`/loan-dashboard/${loanIndex}/${"make-payment"}?payment=${parseFloat(
          inputNumber?.replace(/,/g, "") || "0"
        )}
        `}
      >
        {/* passing the user's intention like "add" or "withdraw" throuth query */}
        <button
          className={`py-[10px] px-6  rounded-full text-sm font-semibold  ${
            parseFloat(inputNumber?.replace(/,/g, "") || "0") > 0
              ? "bg-[#2C3B8D] text-white"
              : "text-gray-100 bg-[#ABB1D1]"
          }`}
          disabled={
            parseFloat(inputNumber?.replace(/,/g, "") || "0") > 0 ? false : true
          }
        >
          Continue
        </button>
      </Link>
    </ModalContent>
  );
};

export default MakePaymentModal;
