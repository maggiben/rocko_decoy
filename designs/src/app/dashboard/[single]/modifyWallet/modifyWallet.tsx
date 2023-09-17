import ModalContent from "@/components/shared/modalContainer/modalContent/modalContent";
import closeIcon from "@/assets/Close.svg";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
interface FormData {
  numberInput: string;
}
const ModifyWallet = ({
  setOpenModalFor,
  setModalStep,
}: {
  setOpenModalFor: Function;
  setModalStep: Function;
}) => {
  const [activeInputField, setActiveInputField] = useState(false);
  const [inputNumber, setInputNumber] = useState("");
  const [changeInputType, setChangeInputType] = useState<string>("number");
  const [amount, setAmount] = useState<string>("");
  const {
    register,
    formState: { errors, isLoading, isValid, isValidating },
    setValue,
    getValues,
  } = useForm<FormData>();
  const handleBorrowValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;

    if (/^-?\d*\.?\d*$/.test(inputValue)) {
      setInputNumber(inputValue);
      setValue("numberInput", inputValue, { shouldValidate: true });
    }
  };
  return (
    <ModalContent>
      {/* instruction */}
      <div className="flex items-start justify-between gap-2 ">
        <h4 className="text-2xl font-semibold font-inter">Modify Collateral</h4>
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
      </div>
      {/* select option */}
      <div className="space-y-3">
        {/* radio button-1 */}
        <div className="flex items-center">
          <input
            type="radio"
            id="Coinbase"
            name="recommended-wallet"
            value="Coinbase"
            className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
            onClick={() => {
              setActiveInputField(true);
              setAmount("add");
            }}
          />
          <label htmlFor="Coinbase" className="pl-4">
            <p className="font-semibold">Add Collateral</p>
          </label>
        </div>
        {/* radio button-2 */}
        <div className="flex items-center">
          <input
            type="radio"
            id="Gemini"
            name="recommended-wallet"
            value="Gemini"
            className="w-5 h-5 md:w-7 md:h-7 border-2 border-black"
            onClick={() => {
              setActiveInputField(true);
              setAmount("withdraw");
            }}
          />
          <label htmlFor="Gemini" className="pl-4">
            <p className="font-semibold">Withdraw Collateral</p>
          </label>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2 font-bold"> Enter Collateral Amount</p>
        <input
          {...register("numberInput", {
            required: "Number is required",
            validate: (value) => {
              const num = parseFloat(value);
              if (isNaN(num)) {
                return "Invalid number";
              }
              if (num < 1000) {
                return "Number must be at least 1000";
              }
              return true;
            },
          })}
          type={changeInputType}
          id="numberField"
          min={1}
          onKeyDown={(event) => {
            const keyPressed = event.key;
            const isDecimalDigit = /^\d+$/.test(keyPressed);
            const isAllowedHexChar = /^[a-eA-E]+$/.test(keyPressed);

            if (
              (!isDecimalDigit && !(event.key === "Backspace")) ||
              isAllowedHexChar
            ) {
              event.preventDefault();
            }
            if (event.key === "-") {
              event.preventDefault();
            }
          }}
          className="w-full p-4 focus:outline-none border-2 border-gray-200 rounded-lg bg-white number-input"
          placeholder="10,000"
          disabled={!activeInputField}
          value={inputNumber}
          onFocus={() => {
            const valueWithoutCommas = inputNumber.replace(/,/g, "");
            setInputNumber(valueWithoutCommas);
            setChangeInputType("number");
          }}
          onBlur={(event) => {
            if (event.target.value.length < 1) {
              return event.preventDefault();
            }
            setChangeInputType("text");
            setInputNumber(
              new Intl.NumberFormat("en-US").format(
                parseFloat(getValues("numberInput"))
              )
            );
          }}
          onChange={handleBorrowValueChange}
        />
        <p
          className={`text-right mr-5 -mt-10 ${
            activeInputField ? "text-black" : "text-gray-400"
          }`}
        >
          ETH
        </p>
        <p className="text-gray-500 text-sm mt-5">
          {inputNumber.length > 0 && "~$209.45"}
        </p>
      </div>
      <div className="p-6 bg-gray-100 rounded-2xl">
        <p className="font-semibold mb-6">
          Projected values after collateral modification
        </p>
        <div className="grid grid-cols-2 space-y-2">
          <p className="text-sm text-gray-600">Total Collateral</p>
          <p className="font-semibold text-right">
            {inputNumber.length > 0
              ? amount === "add"
                ? "1.96 ETH"
                : "1.72 ETH"
              : "--"}
            <span className="block text-gray-600 text-sm font-normal">
              {inputNumber.length > 0
                ? amount === "add"
                  ? "~$2,918.82"
                  : "~$2,425.64"
                : ""}
            </span>
          </p>
          <p className="text-sm text-gray-600">Collateral Buffer</p>
          <p className="font-semibold text-right">
            {inputNumber.length > 0
              ? amount === "add"
                ? "107%"
                : "96%"
              : "--"}
          </p>
          <p className="text-sm text-gray-600">Liquidation Price (ETH)</p>
          <p className="font-semibold text-right">
            {inputNumber.length > 0
              ? amount === "add"
                ? "$1,221.74"
                : "$1,412.94"
              : "--"}
          </p>
        </div>
      </div>
      {/* continue button */}
      <Link
        href={`/dashboard/${"invoice"}/${"modify_collateral"}?try=${amount}`}
      >
        <button
          className={`py-[10px] px-6  rounded-full text-sm font-semibold  ${
            inputNumber.length > 0
              ? "bg-[#2C3B8D] text-white"
              : "text-gray-100 bg-[#ABB1D1]"
          }`}
          disabled={inputNumber.length > 0 ? false : true}
        >
          Continue
        </button>
      </Link>
    </ModalContent>
  );
};

export default ModifyWallet;
