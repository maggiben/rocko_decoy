import { use, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LoanSummary from "../../../components/LoanSummary/LoanSummary";
import useLoanData from "../../../hooks/useLoanData";
import { useLoan } from "../../../contract/single";

const StepFour = ({ title }) => {
  const [value, setValue] = useState(0);
  const [thumbPosition, setThumbPosition] = useState(0);
  const [valueDivWidth, setValueDivWidth] = useState(0);
  const {loanData,setLoanData} = useLoanData()
  const {
    getETHPrice,
    getLTV,
    getThreshold,
  } = useLoan();
  
  const valueDivRef = useRef(null);

  const initialize = () => {
    if (loanData?.buffer !== 0) {
      setValue(loanData?.buffer);
      setThumbPosition(
        (loanData?.buffer / 400) * 100
      );
    
      setLoanData((prevLoanData) => {
        return {
          ...prevLoanData,
          activeNextButton:true,
        }
      });
    }
  };

  const updateLoanData = async (newBuffer) => {
    try {
      const loanToValue = await getLTV();
      const threshold = await getThreshold();
      const ethPrice = await getETHPrice();
      const collateralInUSD = loanData?.borrowing / loanToValue * (1 + newBuffer / 100);
      const collateral = collateralInUSD / ethPrice;
      const liquidationPrice = loanData?.borrowing / threshold / collateral;
      
      if (setLoanData) {
        setLoanData((prevLoanData) => {
          return {
              ...prevLoanData,
              buffer: newBuffer,
              collateralNeeded: collateral,
              liquidationPrice: liquidationPrice,
              activeNextButton:true,
            }
        })
      }
    } catch (e) {
        console.error({e}, "Cannot update loan buffer");
    }
  }

  const handleInputChange = async (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    setThumbPosition(
      ((newValue - parseInt(event.target.min, 10)) /
        (parseInt(event.target.max, 10) - parseInt(event.target.min, 10))) *
        100
    );

    if(setLoanData)
      await updateLoanData(newValue);
  };
  
  const isEnd = thumbPosition === 100 ;
    const adjustedThumbPosition = isEnd
      ? thumbPosition - (valueDivWidth / 2)  // Subtract half of value div width
      : thumbPosition;

  const valueDivStyle = {
    left: `calc(${thumbPosition}% - ${80/2}px)`,
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (valueDivRef.current)
      setValueDivWidth(valueDivRef.current.offsetWidth);
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

            <div className="flex items-end justify-between gap-3 min-h-[160px] py-4">
              <p className="">Higher Risk</p>

              <div className="relative flex-1">
                <input
                  type="range"
                  className="range w-full"
                  min="0"
                  max="400"
                  value={value}
                  onChange={handleInputChange}
                  data-value={value}
                  style={{
                    background: `linear-gradient(to right, #2C3B8D 0%, #2C3B8D ${thumbPosition}%, #E2E2E2 ${thumbPosition}%, #E2E2E2 100%)`,
                  }}
                />
                <div
                ref={valueDivRef}
                  className="absolute w-20 h-12 left-0 -top-16 text-center text-white bg-[#2C3B8D] rounded-full py-3 px-4"
                  style={valueDivStyle}
                >
                  <p className="">{value}%</p>
                 {/*  <div className="w-1 h-10 bg-[#2C3B8D] absolute top-full left-1/2 -translate-x-1/2"></div> */}
                </div>
              </div>
              <p className="">Lower Risk</p>
            </div>
            <p className="pt-6   text-sm text-blackSecondary">
            Your loan requires your collateral to maintain a certain value at all times, otherwise your collateral may be liquidated (i.e. sold) by the lender.{" "}
            <span className="font-bold">A collateral buffer is the percentage of collateral you provide above what is required for your loan.{" "}</span>
            A larger collateral buffer will reduce the collateral asset price at which your collateral would be liquidated (i.e. liquidation price).{" "}
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
