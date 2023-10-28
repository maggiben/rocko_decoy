import useLoanData from "@/hooks/useLoanData";
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";

const RangeSlider = ({
  collateralBufferCurrentPercentage,
}: {
  collateralBufferCurrentPercentage?: number;
}) => {
  const [value, setValue] = useState<number>(
    collateralBufferCurrentPercentage ? collateralBufferCurrentPercentage : 0
  );
  const [customValue, setCustomValue] = useState<number>();
  const [thumbPosition, setThumbPosition] = useState<number>(
    collateralBufferCurrentPercentage
      ? (collateralBufferCurrentPercentage / 400) * 100
      : 0
  );
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
    left: `calc(${thumbPosition}% - ${50 / 2}px)`,
  };

  return (
    <>
      <div className="flex items-center justify-between gap-1 md:gap-3 mt-20 md:mt-[104px]  py-4">
        <p className="text-sm md:text-base">Higher Risk</p>

        <div className="flex-1 flex items-start">
          <div className="w-10 md:w-20 h-[6px]"></div>

          {/* fake bar space of right */}
          <div className=" flex-1">
            {/* rang slider container */}
            <div className="relative w-full">
              {/* fake bar start */}
              <div className="w-10 md:w-20 h-[6px] rounded-full mt[3px] absolute top-1/2 -translate-y-1/2 right-[calc(100%-5px)]">
                <div className="frame h-3 w-3 bg-[#2C3B8D] rotate-180 absolute -top-[7px]  -right-3"></div>
                <div className="frame h-3 w-3 bg-[#2C3B8D] absolute top-[3px] -right-3"></div>
              </div>
              {/* fake bar end */}
              {/* initial fix value start */}
              <div className="flex items-center justify-between w-fit absolute  top-10 -left-14 ">
                <div className="text-center ">
                  <p className="text-[#545454] text-xs whitespace-nowrap">
                    Minimum collateral required:
                  </p>
                  <p className="text-[#141414] text-xs whitespace-nowrap">
                    8.3412 ETH ($16,301.55)
                  </p>
                </div>
              </div>
              {/* initial fix value end */}
              <input
                type="range"
                className="range w-full h-[6px]"
                min="0"
                max="400"
                value={value}
                onChange={handleInputChange}
                data-value={value}
                readOnly={collateralBufferCurrentPercentage ? true : false}
                disabled={collateralBufferCurrentPercentage ? true : false}
                style={{
                  background: `linear-gradient(to right, #2C3B8D 0%, #2C3B8D ${thumbPosition}%, #E2E2E2 ${thumbPosition}%, #E2E2E2 100%)`,
                }}
              />{" "}
              <div
                ref={valueDivRef}
                className="absolute left-0 -top-10 text-center text-white bg-[#2C3B8D] rounded-full py-2 px-4"
                style={valueDivStyle}
              >
                <p className="text-xs">{value}%</p>
                {/*  <div className="w-1 h-10 bg-[#2C3B8D] absolute top-full left-1/2 -translate-x-1/2"></div> */}
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm md:text-base">Lower Risk</p>
      </div>
      {/* custom field */}
      {!collateralBufferCurrentPercentage && value >= 400 ? (
        <div className="ml-auto w-fit space-y-1 mt-10 mb-4 md:mt-0">
          <p className="text-[#141414] font-medium text-xs ">
            Enter custom amount
          </p>
          <div className="flex items-center gap-2 border border-[#E6E6E6] rounded-[10px] py-2 px-4 w-fit ">
            <input
              type="number"
              name=""
              id=""
              min="0"
              max="1000"
              value={customValue}
              onBlur={handleCustomInputBlur}
              onChange={handleCustomInputChange}
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
              className="focus:outline-none border-none max-w-[136px] w-full number-input"
            />
            <p className="text-[#141414] ">%</p>
          </div>
        </div>
      ) : (
        <div className="h-12 w-full"></div>
      )}
      {/* ${value >= 400 ? ' pt-6 ' : 'pt-12'} */}
    </>
  );
};

export default RangeSlider;
