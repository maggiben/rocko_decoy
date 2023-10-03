"use client";
import ToggleBtn from "@/components/chips/ToggleBtn/ToogleBtn";
import HoverTooltip from "@/components/chips/HoverTooltip/HoverTooltip";
import useLoanData from "@/hooks/useLoanData";
import financial from "@/utility/currencyFormate";
import { formatDate } from "@/utility/utils";
import { useCompPrice } from "@/hooks/usePrice";
import Image from "next/image";
import compound from "@/assets/coins/Compound (COMP).svg";
import eth from "@/assets/coins/Ether (ETH).svg";
import usdc from "@/assets/coins/USD Coin (USDC).svg";

const allTimeHigh = 4872.19;
const TOOLTIPS = require('../../locales/en_tooltips');

const headings = [
  {
    img: compound,
    text: "Compound -",
  },

  {
    img: usdc,
    text: "USDC  :",
  },
  {
    img: eth,
    text: "ETH",
  },
];

function SinglePage() {
  const { loanData } = useLoanData();
  const { compprice } = useCompPrice();

  return (
    <>
      <main className="container mx-auto px-4 py-6 pt-20 lg:py-10 lg:pt-24 ">
        <p className="text-center md:text-left font-medium">
          Loan with Compound Finance
        </p>
        <div className="flex gap-x-2 items-center justify-center md:justify-start mt-5">
          {headings.map((heading, i) => (
            <div className="flex gap-x-1 md:gap-x-2 items-center" key={i}>
              <Image
                width={24}
                height={24}
                src={heading.img}
                alt=""
                className="w-6 h-6 md:w-8 md:h-8"
              />
              <h1 className="text-xl md:text-[28px] font-medium text-center lg:text-left">
                {heading.text}
              </h1>
            </div>
          ))}
        </div>
        <section className="my-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-7">
          {/* ------------left-top grid---------------- */}
          <div className="border-2 rounded-2xl p-3 md:p-5 lg:p-6">
            <h1 className="text-xl mb-4 font-medium">Current Balance</h1>
            <div className="divide-y-2 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-2xl  font-medium">
                  {financial(loanData?.borrowing, 2)} <small>USDC</small>
                  <span className="block text-sm text-[#545454]">
                    ${financial(loanData?.borrowing, 2)}
                  </span>
                </p>
                <Image
                  width={24}
                  height={24}
                  src={usdc}
                  alt=""
                  className="w-6 h-6"
                />
              </div>
              <div className="flex justify-between flex-wrap gap-1 md:gap-0 pt-4">
                <div className="w-[30%]">
                  <p className=""> Interest Accrued </p>
                  <span className="block text-xl  font-medium">
                    {financial(loanData?.twelveMonthInterest, 2)} <small>USDC</small>
                  </span>
                </div>

                <div className="w-[30%]">
                  <p className=""> Current APR</p>{" "}
                  <div className="block text-xl  font-medium">
                    {financial(loanData?.currentAPR, 2)}
                    <span className="text-base">%</span>
                  </div>
                </div>

                <div className="w-[30%]">
                  <div className="flex items-center gap-2 ">
                    <p className=""> Average APR</p>{" "}
                    <HoverTooltip text={TOOLTIPS.AVERAGE_APR} />
                  </div>

                  <div className="block text-xl  font-medium">
                    3.84<span className="text-base">%</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xl font-medium">
                  <small className="block font-normal">Date Opened</small>{formatDate(new Date())}
                </p>
                <div className="mt-5 md:mt-8 grid grid-cols-1 md:grid-cols-[1fr_3fr] min-[1535px]:grid-cols-[1fr_4fr]  items-center min-[1024px]:gap-x-3 min-[1280px]:gap-x-0 gap-y-2">
                  <button className="text-sm font-semibold bg-[#2C3B8D] text-white rounded-3xl px-7 py-3 w-max mx-auto md:m-0">
                    Make a Payment
                  </button>
                  <p className="text-sm text-center md:text-left text-[#545454] font-normal">
                    There is no payment due date for this loan. You can repay it
                    in part or in full at anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ------------right-top grid---------------- */}
          <aside className="border-2 rounded-2xl p-3 md:p-5 lg:p-6">
            <h1 className="text-xl font-medium">Collateral Parameters</h1>
            <div className="divide-y-2 space-y-[15px]">
              <div className="pt-4">
                <div className="flex items-center gap-2 ">
                  <p className="font-normal">Loan-to-Value</p>{" "}
                  <HoverTooltip text={TOOLTIPS.MAX_LTV} />
                </div>
                <p className="block text-xl font-medium mt-2">
                  {loanData?.loanToValue * 100}
                  <span className="text-base">%</span>
                </p>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-2 ">
                  <p className="font-normal">Liquidation Threshold</p>{" "}
                  <HoverTooltip text={TOOLTIPS.LIQUIDATION_THRESHOLD} />
                </div>
                <p className="block text-xl font-medium mt-2">
                  {loanData?.liquidationThreshold * 100}
                  <span className="text-base">%</span>
                </p>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-2 ">
                  <p className="font-normal">Liquidation Penalty</p>{" "}
                  <HoverTooltip text={TOOLTIPS.LIQUIDATION_PENALTY} />
                </div>
                <p className="block text-xl font-medium mt-2">
                  {financial(loanData?.liquidationPenalty * 100)}
                  <span className="text-base">%</span>
                </p>
              </div>
            </div>
          </aside>
          {/* ------------left-bottom grid---------------- */}
          <div className="border-2 rounded-2xl p-3 md:p-5 lg:p-6">
            <h1 className="text-xl mb-4  font-medium">Collateral</h1>
            {/* --------------green bar-------------- */}
            <div className="pb-16 relative">
              {/* <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 left-[10%] md:left-[18%] lg:left-[20%] text-xs  md:text-sm text-[#545454]"> */}
              <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 text-xs  md:text-sm text-[#545454]"  style={{left: `${loanData?.liquidationPrice / allTimeHigh * 100 - 6}%`}}>
                Liquidation Price{" "}
                <span className="block text-center text-[#141414]">
                  ${financial(loanData?.liquidationPrice, 2)}
                </span>
              </p>
              {/* <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 left-[43%] md:left-[45%] text-xs   md:text-sm text-[#545454]"> */}
              <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 text-xs  md:text-sm text-[#545454]"  style={{left: `${loanData?.collateralPrice / allTimeHigh * 100 - 5}%`}}>
                Current Price{" "}
                <span className="block text-center  text-[#141414]">
                  ${financial(loanData?.collateralPrice, 2)}
                </span>
              </p>
              <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 right-0 text-xs   md:text-sm text-[#545454]">
                All-Time High{" "}
                <span className="block text-center  text-[#141414]">
                  ${financial(allTimeHigh, 2)}
                </span>
              </p>
              <div className="h-2 bg-gradient-to-r from-[#03703C] to-[#06C167] relative rounded-full">
                <div className="frame h-3 w-3 bg-[#03703C] rotate-180 absolute -top-2" style={{left: `${loanData?.liquidationPrice / allTimeHigh * 100}%`}} ></div>
                <div className="frame h-3 w-3 bg-[#03703C] absolute top-1" style={{left: `${loanData?.liquidationPrice / allTimeHigh * 100}%`}}></div>
                <div className="frame h-3 w-3 bg-[#428564] rotate-180 absolute -top-2" style={{left: `${loanData?.collateralPrice / allTimeHigh * 100}%`}}></div>
                <div className="frame h-3 w-3 bg-[#428564] absolute top-1" style={{left: `${loanData?.collateralPrice / allTimeHigh * 100}%`}}></div>
              </div>
            </div>
            <div className="divide-y-2 space-y-3">
              <div></div>
              <div className="flex pt-3 gap-x-2">
                <p className="w-1/2 font-medium">Collateral Posted</p>
                <p>
                  {financial(loanData?.collateralNeeded, 2)} ETH
                  <span className="block text-sm text-[#545454]">
                    ${financial(loanData?.collateralPrice * loanData?.collateralNeeded, 2)}
                  </span>
                </p>
              </div>
              <div className="flex pt-3 gap-x-2">
                <p className="w-1/2 font-medium">Liquidation Price</p>
                <p>
                  ${financial(loanData?.liquidationPrice, 2)}
                </p>
              </div>
              <div className="flex items-center gap-x-2 py-5 relative">
                <p className="w-1/2 font-medium">Collateral Buffer</p>
                <p>{loanData?.buffer}%</p>
                <div className="flex flex-col md:flex-row items-center gap-y-1 md:gap-2 absolute right-0">
                  <p className="text-center md:text-left text-sm md:text-base">
                    Alerts On
                  </p>
                  <ToggleBtn />
                </div>
              </div>
              <div className="pt-6 grid grid-cols-1 md:grid-cols-[1fr_3fr] min-[1535px]:grid-cols-[1fr_4fr]  items-center min-[1024px]:gap-x-3 min-[1280px]:gap-x-0 gap-y-2">
                <button className="text-sm bg-[#EEE] text-[#2C3B8D] rounded-full px-7 py-3 w-max mx-auto md:m-0 font-semibold">
                  Modify Collateral
                </button>
                <p className="text-sm text-center md:text-left text-[#545454]">
                  You can post additional collateral for this loan at anytime.
                  Doing so will decrease the possibility of liquidation.
                </p>
              </div>
            </div>
          </div>
          {/* ------------right-bottom grid---------------- */}
          <aside className="border-2 rounded-2xl p-3 md:p-5 lg:p-6">
            <h1 className="text-xl mb-2 font-medium">Rewards</h1>
            <p>Rewards Earned</p>
            <div className="divide-y-2 space-y-3">
              <div className="flex justify-between mt-1">
                <p className="text-xl font-medium">
                  {loanData?.rewardAmount ? financial(loanData?.rewardAmount, 6) : 0} COMP{" "}
                  <span className="block text-sm text-[#545454] font-normal">
                    ~${loanData?.rewardAmount ? financial(Number(compprice) * loanData?.rewardAmount, 2) : 0}
                  </span>
                </p>
                <Image
                  width={24}
                  height={24}
                  src={compound}
                  alt=""
                  className="w-6 h-6"
                />
              </div>
              <div className="pt-3">
                <p>Rewards Rate</p>
                <h4 className="text-xl font-medium mt-1 md:mt-3">
                  {financial(loanData?.rewardRate, 2)}<span className="text-base">%</span>
                </h4>
                <p className="p-6 bg-[#F9F9F9] rounded-2xl text-sm mt-12 lg:mt-[88px] text-[#545454]">
                  Compound protocol offers rewards in its Comp token for usage
                  of the protocol. Your Rocko wallet will automatically claim
                  your rewards for you when your loan is repaid.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}

export default SinglePage;
