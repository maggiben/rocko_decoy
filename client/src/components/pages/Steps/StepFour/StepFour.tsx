/* eslint-disable import/order */
import { FC, ChangeEvent, FocusEvent, useState, useEffect } from 'react';
import { RiskStep } from '@/types/type';
import Link from 'next/link';
import LoanSummary from '@/components/chips/LoanSummary/LoanSummary';
import useLoanData from '@/hooks/useLoanData';
import CoinCard from '@/components/chips/CoinCard/CoinCard';
import extrabitcoin from '@/assets/coins/extrabitcoin.svg';
import extra from '@/assets/coins/extrabitcoin-se.svg';
import etherIcon from '@/assets/coins/Extra(ETH).svg';
import RadioInput from '@/components/RadioInput';

const StepFour: FC<RiskStep> = ({ title, subTitle, description }) => {
  const [value, setValue] = useState<number>(10);
  const [customValue, setCustomValue] = useState<number>();
  const [thumbPosition, setThumbPosition] = useState<number>(0);

  const { loanData, setLoanData } = useLoanData();
  const [hasOther, setHasOther] = useState(0);

  const initialize = () => {
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

  /* eslint-disable */
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

  /* eslint-disable */
  const valueDivStyle = {
    left: `calc(${thumbPosition}% - ${80 / 2}px)`,
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value;
    setHasOther(parseInt(inputValue) === 0 ? 1 : 0);

    setLoanData?.((prevLoanData) => ({
      ...prevLoanData,
      paymentMethod: inputValue || '',
    }));
  };
  const collateralCard = [
    {
      id: 1,
      icon: etherIcon,
      title: '150% extra',
      description: 'Lower risk of liquidation',
    },
    {
      id: 2,
      icon: extra,
      title: '100% extra',
      description: '',
    },
    {
      id: 3,
      icon: extrabitcoin,
      title: '50% extra',
      description: 'Higher risk of liquidation',
    },
  ];
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
            <div className="my-4 py-4 grid grid-cols-2 lg:grid-cols-3 gap-6">
              {collateralCard.map((card) => (
                <CoinCard
                  key={card.id}
                  coinIcon={card.icon}
                  coinShortName={card.title}
                  coinName={card.description}
                  selectedCoin=""
                  handleSelect={() => {}}
                  currentAPR={1}
                  isComingSoon={false}
                />
              ))}
            </div>
            <RadioInput
              id="wallet3"
              name="paymentMethod"
              checked={Boolean(hasOther)}
              value={hasOther}
              onChange={handlePaymentMethodChange}
              label="Input other value"
            />
            {hasOther === 1 && (
              <div className="mt-[16px]">
                <div className="max-w-[284px] w-full relative">
                  <label className="-translate-y-1/2 text-[#141414] text-[16px] top-[50%]  right-[16px] absolute">
                    %
                  </label>
                  <input
                    type="text"
                    className="w-full py-[8px] px-[16px] border border-[#E6E6E6] rounded-[10px] block focus:outline-none w-full"
                  />
                </div>
              </div>
            )}
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
                  <p className="text-[#141414]">%</p>
                </div>
              </div>
            ) : (
              <div className="w-full" />
            )}
            {/* ${value >= 400 ? ' pt-6 ' : 'pt-12'} */}
            <p className="text-sm text-blackSecondary bg-[#F9F9F9] text-[#545454] text-[14px] leading-5 rounded-[16px] md:p-[24px] p-[16px]  mt-[24px]">
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
