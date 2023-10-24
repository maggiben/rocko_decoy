import ModalContent from "@/components/chips/ModalContent/ModalContent";
import closeIcon from "@/assets/Close.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import financial from "@/utility/currencyFormate";
import { useSingleLoan } from "@/contract/single";

interface FormData {
  numberInput: string;
}
const ModifyWallet = ({
  setOpenModalFor,
  setModalStep,
  currentBalance,
  collateral,
  threshold,
  buffer
}: {
  setOpenModalFor: Function;
  setModalStep: Function;
  currentBalance: string;
  collateral: string;
  buffer: string;
  threshold: string;
}) => {
  const basicRouter = useParams();
  const loanIndex = parseFloat(basicRouter.single.toString() || "0");
  const [activeInputField, setActiveInputField] = useState(false); //! input field active on selecting radio btn
  const [inputNumber, setInputNumber] = useState<number | undefined>(); //! turning inputNumber into inputText to save & show number with commas on onBlur handler & number without commas on onFocus handler in inputfiled
  const [changeInputType, setChangeInputType] = useState<string>("number"); //! to show value with commas & without commas n inputfiled on onBlur handler
  const [amount, setAmount] = useState<string>(""); //! amount could be "add" or "widthraw" based on user's intention & amount value is passed through URL query for the reaction of next page based on user's intention
  
  const { getETHPrice } = useSingleLoan();
  const [collateralPrice, setCollateralPrice] = useState<number>(0);

  const new_collateral = amount === "add" ? 
      Number(collateral) + (inputNumber || 0) : 
      Number(collateral) - (inputNumber || 0);

  const {
    register,
    formState: { errors, isLoading, isValid, isValidating },
    setValue,
    getValues,
  } = useForm<FormData>();

  const handleBorrowValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = parseFloat(event.target.value);

    setInputNumber(inputValue);
  };

  const getLiquidationPrice = () => {
    const balanceFloat = parseFloat(currentBalance?.replace(/,/g, "") || "0");

    const liquidationPrice = balanceFloat / Number(threshold) / new_collateral;
    return liquidationPrice;
  };

  const getBuffer = () => {
    const original_collateral = Number(collateral) / (1 + Number(buffer) / 100);

    const new_buffer = (new_collateral / original_collateral - 1) * 100;
    return new_buffer;
  };

  useEffect(() => {
    getETHPrice()
    .then(_price => setCollateralPrice(_price))
    .catch(e => console.log(e))
  })

  return (
    <ModalContent>
      <div className="flex items-start justify-between gap-2 ">
        <h4 className="text-2xl font-semibold font-inter">Modify Collateral</h4>
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
      {/* input field with react form hook */}
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
              return true;
            },
          })}
          type="number" /* switch between "text" & "number" */
          id="numberField"
          min={1}
          onKeyDown={(event) => {
            const keyPressed = event.key;
            // const isDecimalDigit = /^\d+$/.test(keyPressed);
            const isAllowedHexChar = /^[a-eA-E]+$/.test(keyPressed);

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
          placeholder="10,000"
          disabled={!activeInputField} /* active on selecting radio button */
          value={inputNumber}
          onBlur={(event) => {
            /* on onBlur set the number */
            setInputNumber(parseFloat(event.target.value || "0"));
          }}
          onInput={handleBorrowValueChange}
        />
        <p
          className={`text-right mr-5 -mt-10 ${
            activeInputField ? "text-black" : "text-gray-400"
          }`}
        >
          {" "}
          {/* active text on selecting radion button */}
          ETH
        </p>
        <p className="text-gray-500 text-sm mt-5">
          {inputNumber ? `~$${financial(collateralPrice * inputNumber, 2)}` : ""}
        </p>{" "}
        {/* after putting a value on inputfield the number will show */}
      </div>
      <div className="p-6 bg-gray-100 rounded-2xl">
        <p className="font-semibold mb-6">
          Projected values after collateral modification
        </p>
        <div className="grid grid-cols-2 space-y-2">
          <p className="text-sm text-gray-600">Total Collateral</p>
          {/* after putting a value on inputfield the number(based on user's intention like "add" or "withdraw") will show */}
          <p className="font-semibold text-right">
            {inputNumber ? `${financial(new_collateral, 2)} ETH` : "--"}
            <span className="block text-gray-600 text-sm font-normal">
              {inputNumber
                ? `~$${financial(new_collateral * collateralPrice, 2)}`
                : ""}
            </span>
          </p>
          <p className="text-sm text-gray-600">Collateral Buffer</p>
          <p className="font-semibold text-right">
            {inputNumber ? `${financial(getBuffer())}%` : "--"}
          </p>
          <p className="text-sm text-gray-600">Liquidation Price (ETH)</p>
          <p className="font-semibold text-right">
            {inputNumber ? `$${financial(getLiquidationPrice(), 2)}` : "--"}
          </p>
        </div>
      </div>
      {/* continue button */}
      <Link
        href={`/loan-dashboard/${loanIndex}/${"modify_collateral"}?try=${amount}&payment=${inputNumber}&buffer=${getBuffer()}&collateral=${collateral}&liquidationPrice=${getLiquidationPrice()}
        `}
      >
        {" "}
        {/* passing the user's intention like "add" or "withdraw" throuth query */}
        <button
          className={`py-[10px] px-6  rounded-full text-sm font-semibold  ${
            !inputNumber || getBuffer() < 0
              ? "text-gray-100 bg-[#ABB1D1]"
              : "bg-[#2C3B8D] text-white"
          }`}
          disabled={!inputNumber || getBuffer() < 0 ? true : false}
        >
          Continue
        </button>
      </Link>
    </ModalContent>
  );
};

export default ModifyWallet;
