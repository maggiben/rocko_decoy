import useLoanData from "@/hooks/useLoanData";
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";

const RangeSlider = ({
  collateralBufferCurrentPercentage,
}: {
  collateralBufferCurrentPercentage?: number;
}) => {
  const [value, setValue] = useState<number>(
    collateralBufferCurrentPercentage ? collateralBufferCurrentPercentage : 50
  );
  const [customValue, setCustomValue] = useState<number>();
  const [thumbPosition, setThumbPosition] = useState<number>(
    collateralBufferCurrentPercentage
      ? (collateralBufferCurrentPercentage / 450) * 100
      : (50 / (450 - 0)) * 100
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
    const newValue = parseInt(event.target.value || "50", 10);
    if (newValue >= 50) {
      setValue(newValue);
      setCustomValue(newValue - 50);
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
    }
  };

  const handleCustomInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value || "50", 10);
    if (newValue <= 1050) {
      setValue(newValue + 50);
    }
    if (newValue > 1050) {
      setCustomValue(1050 - 50);
      setValue(1050);
      return;
    }
    if (setLoanData) {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        activeNextButton: true,
      }));
    }

    if (newValue > 450) return;
    setThumbPosition(
      ((newValue + 50 - parseInt(event.target.min, 10)) /
        (450 - parseInt(event.target.min, 10))) *
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
    if (newValue <= 1050) {
      setCustomValue(newValue);
    }

    if (newValue > 1050) {
      setCustomValue(1050 - 50);
      setValue(1050);
      return;
    }

    if (newValue >= 450 && newValue <= 1050) {
      setValue(newValue + 50);
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
          {/* fake bar space of right */}
          <div className="relative flex-1">
            <div className="frame h-3 w-3 bg-[#2C3B8D] rotate-180 absolute top-1 left-[10%]"></div>
            <div className="frame h-3 w-3 bg-[#2C3B8D] absolute top-4 left-[10%]"></div>
            {/* rang slider container */}
            <div className="relative w-full">
              {/* fake bar start */}

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
                max="450"
                value={value}
                onChange={handleInputChange}
                data-value={value}
                readOnly={collateralBufferCurrentPercentage ? true : false}
                disabled={collateralBufferCurrentPercentage ? true : false}
                style={{
                  background: `linear-gradient(to right, #2C3B8D 0%, #2C3B8D ${thumbPosition}%, #E2E2E2 ${thumbPosition}%, #E2E2E2 100%)`,
                }}
              />
              <div
                ref={valueDivRef}
                className="absolute left-0 -top-10 text-center text-white bg-[#2C3B8D] rounded-full py-2 px-4"
                style={valueDivStyle}
              >
                <p className="text-xs">{value - 50}%</p>
                {/*  <div className="w-1 h-10 bg-[#2C3B8D] absolute top-full left-1/2 -translate-x-1/2"></div> */}
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm md:text-base">Lower Risk</p>
      </div>
      {/* custom field */}
      {!collateralBufferCurrentPercentage && value >= 450 ? (
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
              max="1050"
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
