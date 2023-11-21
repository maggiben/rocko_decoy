import {
  FC,
  ChangeEvent,
  FocusEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import { RiskStep } from '@/types/type';
import Link from 'next/link';
import LoanSummary from '@/components/chips/LoanSummary/LoanSummary';
import useLoanData from '@/hooks/useLoanData';
import financial from '@/utility/currencyFormate';

const StepFour: FC<RiskStep> = ({ title, subTitle, description }) => {
  const [value, setValue] = useState<number>(10);
  const [customValue, setCustomValue] = useState<number>();
  const [thumbPosition, setThumbPosition] = useState<number>(0);
  const [valueDivWidth, setValueDivWidth] = useState<number>(0);

  const [minimum, setMinimum] = useState<number>(0);
  const { loanData, setLoanData } = useLoanData();

  const valueDivRef = useRef<HTMLDivElement | null>(null);

  const initialize = () => {
    // for start
    setMinimum(loanData?.collateralNeeded / (1 + loanData?.buffer / 100));

    // for keeping status
    if (loanData?.buffer !== 0 && loanData?.buffer) {
      setValue(loanData?.buffer);
      setThumbPosition((loanData?.buffer / 400) * 100);

      if (setLoanData) {
        setLoanData((prevLoanData) => ({
          ...prevLoanData,
          activeNextButton: true,
        }));
      }
    }
  };

  const updateLoanData = async (newBuffer: number) => {
    try {
      const loanToValue: any = loanData?.loanToValue;
      const threshold: any = loanData?.liquidationThreshold;
      const ethPrice = loanData?.collateralPrice;
      const collateralInUSD = loanData?.borrowing
        ? (loanData?.borrowing / loanToValue) * (1 + newBuffer / 100)
        : 0;
      const collateral = collateralInUSD / ethPrice;
      const liquidationPrice = loanData?.borrowing
        ? loanData?.borrowing / threshold / collateral
        : 0;

      if (setLoanData) {
        setLoanData((prevLoanData) => ({
          ...prevLoanData,
          buffer: newBuffer,
          collateralNeeded: collateral,
          liquidationPrice,
          activeNextButton: true,
        }));
      }
    } catch (e) {
      console.error({ e }, 'Cannot update loan buffer');
    }
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    setCustomValue(newValue);
    setThumbPosition(
      ((newValue - parseInt(event.target.min, 10)) /
        (parseInt(event.target.max, 10) - parseInt(event.target.min, 10))) *
        100,
    );

    if (setLoanData) await updateLoanData(newValue);
  };

  const handleCustomInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value || '0', 10);
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
        100,
    );
  };
  const handleCustomInputChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(event.target.value);
    if (event.target.value === '') {
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
    }

    if (newValue >= 400 && newValue <= 1000) {
      setValue(newValue);
    }

    if (setLoanData) await updateLoanData(newValue > 1000 ? 1000 : newValue);
  };

  const isEnd = thumbPosition === 100;
  const adjustedThumbPosition = isEnd
    ? thumbPosition - valueDivWidth / 2 // Subtract half of value div width
    : thumbPosition;

  const valueDivStyle = {
    left: `calc(${thumbPosition}% - ${80 / 2}px)`,
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (valueDivRef.current) setValueDivWidth(valueDivRef.current.offsetWidth);
  }, [value]);

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
            <p className=" text-sm font-medium mt-1 text-blackPrimary lg:text-start text-center">
              {subTitle}
            </p>

            <div className="flex items-center justify-between gap-1 md:gap-3 mt-20 md:mt-[144px]  py-4">
              <p className="text-sm md:text-base">Higher Risk</p>

              <div className="flex-1 flex items-start">
                <div className="w-10 md:w-20 h-[6px]" />

                {/* fake bar space of right */}
                <div className=" flex-1">
                  {/* rang slider container */}
                  <div className="relative w-full">
                    {/* fake bar start */}
                    <div className="w-10 md:w-20 h-[6px] rounded-full bg-[#2C3B8D] mt-[3px] absolute top-1/2 -translate-y-1/2 right-[calc(100%-4px)]">
                      <div className="frame h-3 w-3 bg-[#2C3B8D] rotate-180 absolute -top-2  -right-3" />
                      <div className="frame h-3 w-3 bg-[#2C3B8D] absolute top-[2px] -right-3" />
                    </div>
                    {/* fake bar end */}
                    {/* initial fix value start */}
                    <div className="flex items-center justify-between w-fit absolute  top-10 -left-14 ">
                      <div className="text-center ">
                        <p className="text-[#545454] text-xs whitespace-nowrap">
                          Minimum collateral required:
                        </p>
                        <p className="text-[#141414] text-xs whitespace-nowrap">
                          {financial(minimum, 4)} ETH ($
                          {financial(loanData?.collateralPrice * minimum, 2)})
                        </p>
                      </div>
                    </div>
                    {/* initial fix value end */}
                    <input
                      type="range"
                      className="range w-full "
                      min="10"
                      max="400"
                      value={value}
                      onChange={handleInputChange}
                      data-value={value}
                      style={{
                        background: `linear-gradient(to right, #2C3B8D 0%, #2C3B8D ${thumbPosition}%, #E2E2E2 ${thumbPosition}%, #E2E2E2 100%)`,
                      }}
                    />{' '}
                    <div
                      ref={valueDivRef}
                      className="absolute w-20 h-12 left-0 -top-16 text-center text-white bg-[#2C3B8D] rounded-full py-3 px-4"
                      style={valueDivStyle}
                    >
                      <p className="">{value}%</p>
                      {/*  <div className="w-1 h-10 bg-[#2C3B8D] absolute top-full left-1/2 -translate-x-1/2"></div> */}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm md:text-base">Lower Risk</p>
            </div>
            {/* custom field */}
            {value >= 400 ? (
              <div className="ml-auto w-fit space-y-1 mt-10 mb-4 md:mt-0">
                <p className="text-[#141414] font-medium text-xs ">
                  Enter custom amount
                </p>
                <div className="flex items-center gap-2 border border-[#E6E6E6] rounded-[10px] py-2 px-4 w-fit ">
                  <input
                    type="number"
                    name=""
                    id=""
                    min="10"
                    max="1000"
                    value={customValue}
                    onBlur={handleCustomInputBlur}
                    onChange={handleCustomInputChange}
                    onKeyDown={(event) => {
                      const keyPressed = event.key;
                      const isDecimalDigit = /^\d+$/.test(keyPressed);
                      const isAllowedHexChar = /^[a-eA-E]+$/.test(keyPressed);

                      if (
                        (!isDecimalDigit && !(event.key === 'Backspace')) ||
                        isAllowedHexChar
                      ) {
                        event.preventDefault();
                      }
                      if (event.key === '-') {
                        event.preventDefault();
                      }
                    }}
                    className="focus:outline-none border-none max-w-[136px] w-full number-input"
                  />
                  <p className="text-[#141414] ">%</p>
                </div>
              </div>
            ) : (
              <div className="h-12 w-full" />
            )}
            {/* ${value >= 400 ? ' pt-6 ' : 'pt-12'} */}

            <p className="text-sm text-blackSecondary">
              {description}{' '}
              <Link href="/" className="underline">
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
