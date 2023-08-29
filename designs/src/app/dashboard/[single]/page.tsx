
import Image from "next/image";
import compund from "@/assets/coins/Compound (COMP).svg";
import eth from "@/assets/coins/Ether (ETH).svg";
import usdc from "@/assets/coins/USD Coin (USDC).svg";
import ToggleBTN from "@/components/pages/Dashboard/toggleBTN/toggleBTN";
import HoverTooltip from "@/components/shared/tooltip/tooltip";

const headings = [
  {
    img: compund,
    text: "Compund -",
  },
  {
    img: eth,
    text: "ETH :",
  },
  {
    img: usdc,
    text: "USDC",
  },
];

const collateralParameters = [
  {
    name: "Loan-to-value-ration",
    rate: "83",
  },
  {
    name: "Liquidation Threshold",
    rate: "90",
  },
  {
    name: "Liquidation Penalty",
    rate: "5",
  },
];

const collaterals = [
  {
    name: "Collateral Posted",
    amount: "1.841892113 ETH",
    subAmount: "$2,791.49",
  },
  {
    name: "Liquidation Price",
    amount: "$1,301.55",
  },
];

function SinglePage() {
  return (
    <>
      <main className="container mx-auto px-4 py-6 pt-20 lg:py-10 lg:pt-24 font-semibold">
        <p className="text-center md:text-left">Loan with Compound Finance</p>
        <div className="flex gap-x-2 items-center justify-center md:justify-start mt-5">
          {headings.map((heading, i) => (
            <div className="flex gap-x-1 md:gap-x-2 items-center" key={i}>
              <Image width={24} height={24} src={heading.img} alt="" className="w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-xl md:text-[28px] lg:text-3xl font-semibold text-center lg:text-left">
                {heading.text}
              </h1>
            </div>
          ))}
        </div>
        <section className="my-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-7">
          {/* ------------left-top grid---------------- */}
          <div className="border-2 rounded-2xl p-3 md:p-5 lg:p-6">
            <h1 className="text-xl mb-4">Current Balance</h1>
            <div className="divide-y-2 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-2xl">
                  1,012.13 <small>USDC</small>
                  <span className="block text-sm text-[#545454]">
                    $1,012.13
                  </span>
                </p>
                <Image width={24} height={24} src={usdc} alt="" className="w-6 h-6" />
              </div>
              <div className="flex justify-between flex-wrap gap-1 md:gap-0 pt-3">
                <div className="w-[30%]">
                 <p className=""> Interest Accrued{" "}</p>
                  <span className="block text-xl">
                    12.13 <small>USDC</small>
                  </span>
                </div>

                <div className="w-[30%]">
                 <p className=""> Current APR</p> <span className="block text-xl">3.84%</span>
                </div>

                <div className="w-[30%]">

                <div className="flex items-center gap-2 "><p className=""> Average APR</p> <HoverTooltip text="hover me" /></div>
                 
                  <span className="block text-xl">3.84%</span>
                </div>
              </div>
              <div className="pt-3">
                <p className="text-xl">
                  <small className="block">Date Opened</small>March 11, 2023
                </p>
                <div className="mt-5 md:mt-8 grid grid-cols-1 md:grid-cols-[1fr_3fr] min-[1535px]:grid-cols-[1fr_4fr]  items-center min-[1024px]:gap-x-3 min-[1280px]:gap-x-0 gap-y-2">
                  <button className="text-sm bg-[#2C3B8D] text-white rounded-3xl px-7 py-3 w-max mx-auto md:m-0">
                    Make a Payment
                  </button>
                  <p className="text-sm text-center md:text-left text-[#545454]">
                    There is no payment due date for this loan. You can repay it
                    in part or in full at anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ------------right-top grid---------------- */}
          <aside className="border-2 rounded-2xl p-3 md:p-5 lg:p-6">
            <h1 className="text-xl mb-2">Collateral Parameters</h1>
            <div className="divide-y-2 space-y-3">
              {collateralParameters.map((scheme, i) => (
                <div key={i} className="pt-3 ">
                  <div className="flex items-center gap-2 "><p className="">{scheme.name}</p> <HoverTooltip text="hover me" /></div>
                  
                  <p className="block text-xl font-medium">{scheme.rate}<span className="text-base">%</span></p>
                </div>
              ))}
            </div>
          </aside>
          {/* ------------left-bottom grid---------------- */}
          <div className="border-2 rounded-2xl p-3 md:p-5 lg:p-6">
            <h1 className="text-xl mb-4">Collateral</h1>
            {/* --------------green bar-------------- */}
            <div className="pb-16 relative">
              <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 left-[10%] md:left-[18%] lg:left-[20%] text-xs sm:text-sm md:text-base">
                Liquidation Price{" "}
                <span className="block text-center">$1,301.55</span>
              </p>
              <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 left-[43%] md:left-[45%] text-xs sm:text-sm md:text-base">
                Current Price{" "}
                <span className="block text-center">$1,855.34</span>
              </p>
              <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 right-0 text-xs sm:text-sm md:text-base">
                All-Time High{" "}
                <span className="block text-center">$4,872.19</span>
              </p>
              <div className="h-2 bg-gradient-to-r from-[#03703C] to-[#06C167] rounded-3xl relative">
                <div className="frame h-3 w-3 bg-[#03703C] rotate-180 absolute -top-2 left-1/4"></div>
                <div className="frame h-3 w-3 bg-[#03703C] absolute top-1 left-1/4"></div>
                <div className="frame h-3 w-3 bg-[#428564] rotate-180 absolute -top-2 left-1/2"></div>
                <div className="frame h-3 w-3 bg-[#428564] absolute top-1 left-1/2"></div>
              </div>
            </div>
            <div className="divide-y-2 space-y-3">
              <div></div>
              {collaterals.map((collateral, i) => (
                <div key={i} className="flex pt-3 gap-x-2">
                  <p className="w-1/2 ">{collateral.name}</p>
                  <p>
                    {collateral.amount}
                    {collateral.subAmount && (
                      <span className="block text-sm text-[#545454]">
                        {collateral.subAmount}
                      </span>
                    )}
                  </p>
                </div>
              ))}
              <div className="flex items-center gap-x-2 py-5 relative">
                <p className="w-1/2">Collateral Buffer</p>
                <p>101%</p>
                <div className="flex flex-col md:flex-row items-center gap-y-1 md:gap-2 absolute right-0">
                  <p className="text-center md:text-left text-sm md:text-base">
                    Alerts On
                  </p>
                  <ToggleBTN />
                </div>
              </div>
              <div className="pt-6 grid grid-cols-1 md:grid-cols-[1fr_3fr] min-[1535px]:grid-cols-[1fr_4fr]  items-center min-[1024px]:gap-x-3 min-[1280px]:gap-x-0 gap-y-2">
                <button className="text-sm bg-[#EEE] text-[#2C3B8D] rounded-3xl px-7 py-3 w-max mx-auto md:m-0">
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
            <h1 className="text-xl mb-2">Rewards</h1>
            <p>Rewards Earned</p>
            <div className="divide-y-2 space-y-3">
              <div className="flex justify-between mt-1">
                <p className="text-xl">
                  0.0217 COMP{" "}
                  <span className="block text-sm text-[#545454]">~$0.07</span>
                </p>
                <Image width={24} height={24} src={compund} alt="" className="w-6 h-6" />
              </div>
              <div className="pt-3">
                <p>Rewards Rate</p>
                <h4 className="text-xl mt-1 md:mt-3">2.54%</h4>
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