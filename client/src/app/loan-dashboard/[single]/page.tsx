"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import compund from "@/assets/coins/Compound (COMP).svg";
import eth from "@/assets/coins/Ether (ETH).svg";
import usdc from "@/assets/coins/USD Coin (USDC).svg";
import ToggleBtn from "@/components/chips/ToggleBtn/ToogleBtn";
import HoverTooltip from "@/components/chips/HoverTooltip/HoverTooltip";
import ModalContainer from "@/components/chips/ModalContainer/ModalContainer";
import ModifyWallet from "./modifyWallet/modifyWallet";
import MakePaymentModal from "@/components/chips/MakePaymentModal/MakePaymentModal";
import { useAccount } from "wagmi";
import { useSingleLoan } from "@/contract/single";
import { useLoanDB } from "@/db/loanDb";
import { useCompPrice } from "@/hooks/usePrice";
import financial from "@/utility/currencyFormate";
import { formatDate } from "@/utility/utils";

const headings = [
  {
    img: compund,
    text: "Compund -",
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

const currentBallanceInfo = {
  amount: "1,012.13",
  subAmount: "$1,012.13",
  interestAccrued: "12.13",
  currentAPR: "3.84",
  averageAPR: "3.84",
  dateOpened: "March 11, 2023",
}

const allTimeHigh = 4872.19;

function SinglePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const loanIndex = Number(params.single);
  const isActive = searchParams.get('active');
  const account = searchParams.get('account');
  const { address: zerodevAccount } = useAccount();

  const [openModalFor, setOpenModalFor] = useState("");
  const [modalStep, setModalStep] = useState(0);
  
  const { getLoanData } = useLoanDB();
  const { compPrice } = useCompPrice();

  const [loanData, setLoanData] = useState<any>();
  const [collateralPrice, setCollateralPrice] = useState<any>();
  const [apr, setAPR] = useState<any>();
  const [LTV, setLTV] = useState<any>();
  const [threshold, setThreshold] = useState<any>();
  const [penalty, setPenalty] = useState<any>();
  const [rewardAmount, setRewardAmount] = useState<any>();
  const [rewardRate, setRewardRate] = useState<any>();
  const [liquidationPrice, setLiquidationPrice] = useState<any>();

  const {
    getETHPrice,
    getBorrowAPR,
    getLTV,
    getPenalty,
    getThreshold,
    getRewardRate,
    getRewardAmount,
    getLiquidationPrice
  } = useSingleLoan();

  const initialize = async () => {
    if (zerodevAccount) {
      const result = await getLoanData(zerodevAccount);
      if (result) {
        const active_loans = result.filter((loan: any) => loan.loan_active == (isActive ? 1 : 0));
        console.log(active_loans[loanIndex - 1]);
        setLoanData(active_loans[loanIndex - 1]);
      }
    }
  }

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zerodevAccount]);

  useEffect(() => {
    console.log(compPrice)
    getETHPrice()
    .then(_price => setCollateralPrice(_price))
    .catch(e => console.log(e))

    getBorrowAPR()
    .then(_apr => setAPR(_apr))
    .catch(e => console.log(e))

    getLTV()
    .then(_ltv => setLTV(_ltv))
    .catch(e => console.log(e))

    getThreshold()
    .then(_threshold => setThreshold(_threshold))
    .catch(e => console.log(e))

    getPenalty()
    .then(_penalty => setPenalty(_penalty))
    .catch(e => console.log(e))

    getRewardAmount()
    .then(_reward => setRewardAmount(_reward))
    .catch(e => console.log(e))

    getRewardRate()
    .then(_rate => setRewardRate(_rate))
    .catch(e => console.log(e))

    getLiquidationPrice(loanData?.outstanding_balance, loanData?.collateral)
    .then(_price => setLiquidationPrice(_price))
    .catch(e => console.log(e))
  });

  return (
    <>
      <main className="container mx-auto px-4 py-6 pt-20 lg:py-10 lg:pt-24 ">
        <p className="text-center md:text-left font-medium">
          Loan with {loanData?.lending_protocol}
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
                  {financial(loanData?.outstanding_balance)} <small>USDC</small>
                  <span className="block text-sm text-[#545454]">
                    ${financial(loanData?.outstanding_balance)}
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
                   {currentBallanceInfo.interestAccrued} <small>USDC</small>
                  </span>
                </div>

                <div className="w-[30%]">
                  <p className=""> Current APR</p>{" "}
                  <div className="block text-xl  font-medium">
                   {financial(apr, 2)}<span className="text-base">%</span>
                  </div>
                </div>

                <div className="w-[30%]">
                  <div className="flex items-center gap-2 ">
                    <p className=""> Average APR</p>{" "}
                    <HoverTooltip text="hover me" />
                  </div>

                  <div className="block text-xl  font-medium">
                    {currentBallanceInfo.averageAPR}<span className="text-base">%</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xl font-medium">
                  <small className="block font-normal">Date Opened</small>
                  {loanData?.create_time && formatDate(new Date(loanData?.create_time))}
                </p>
                <div className="mt-5 md:mt-8 grid grid-cols-1 md:grid-cols-[1fr_3fr] min-[1535px]:grid-cols-[1fr_4fr]  items-center min-[1024px]:gap-x-3 min-[1280px]:gap-x-0 gap-y-2">
                  <button
                    onClick={() => setOpenModalFor("Make Payment")}
                    className="text-sm font-semibold bg-[#2C3B8D] text-white rounded-3xl px-7 py-3 w-max mx-auto md:m-0"
                  >
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
                  <p className="font-normal">Loan-to-Value Ratio</p>{" "}
                  <HoverTooltip text="hover me" />
                </div>
                <p className="block text-xl font-medium mt-2">
                  {LTV * 100}
                  <span className="text-base">%</span>
                </p>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-2 ">
                  <p className="font-normal">Liquidation Threshold</p>{" "}
                  <HoverTooltip text="hover me" />
                </div>
                <p className="block text-xl font-medium mt-2">
                  {threshold * 100}
                  <span className="text-base">%</span>
                </p>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-2 ">
                  <p className="font-normal">Liquidation Penalty</p>{" "}
                  <HoverTooltip text="hover me" />
                </div>
                <p className="block text-xl font-medium mt-2">
                  {financial(penalty * 100)}
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
              <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 text-xs  md:text-sm text-[#545454]"  style={{left: `${liquidationPrice / allTimeHigh * 100 - 6}%`}}>
                Liquidation Price{" "}
                <span className="block text-center text-[#141414]">
                  {liquidationPrice == "N/A" ? "N/A" : `$${financial(liquidationPrice, 2)}`}
                </span>
              </p>
              {/* <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 left-[43%] md:left-[45%] text-xs   md:text-sm text-[#545454]"> */}
              <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 text-xs  md:text-sm text-[#545454]"  style={{left: `${collateralPrice / allTimeHigh * 100 - 5}%`}}>
                Current Price{" "}
                <span className="block text-center  text-[#141414]">
                  ${financial(collateralPrice, 2)}
                </span>
              </p>
              <p className="absolute bottom-4 sm:bottom-2 md:bottom-0 right-0 text-xs   md:text-sm text-[#545454]">
                All-Time High{" "}
                <span className="block text-center  text-[#141414]">
                  ${financial(allTimeHigh, 2)}
                </span>
              </p>
              <div className="h-2 bg-gradient-to-r from-[#03703C] to-[#06C167] relative rounded-full">
                <div className="frame h-3 w-3 bg-[#03703C] rotate-180 absolute -top-2" style={{left: `${liquidationPrice / allTimeHigh * 100}%`}} ></div>
                <div className="frame h-3 w-3 bg-[#03703C] absolute top-1" style={{left: `${liquidationPrice / allTimeHigh * 100}%`}}></div>
                <div className="frame h-3 w-3 bg-[#428564] rotate-180 absolute -top-2" style={{left: `${collateralPrice / allTimeHigh * 100}%`}}></div>
                <div className="frame h-3 w-3 bg-[#428564] absolute top-1" style={{left: `${collateralPrice / allTimeHigh * 100}%`}}></div>
              </div>
            </div>
            <div className="divide-y-2 space-y-3">
              <div></div>
              <div className="flex pt-3 gap-x-2">
                <p className="w-1/2 font-medium">Collateral Posted</p>
                <p>
                  {financial(loanData?.collateral, 2)} ETH
                  <span className="block text-sm text-[#545454]">
                    ${financial(collateralPrice * loanData?.collateral, 2)}
                  </span>
                </p>
              </div>
              <div className="flex pt-3 gap-x-2">
                <p className="w-1/2 font-medium">Liquidation Price</p>
                <p>
                  {liquidationPrice == "N/A" ? "N/A" : `$${financial(liquidationPrice, 2)}`}
                </p>
              </div>
              <div className="flex items-center gap-x-2 py-5 relative">
                <p className="w-1/2 font-medium">Collateral Buffer</p>
                <p>{loanData?.collateral_buffer}%</p>
                <div className="flex flex-col md:flex-row items-center gap-y-1 md:gap-2 absolute right-0">
                  <p className="text-center md:text-left text-sm md:text-base">
                    Alerts On
                  </p>
                  <ToggleBtn />
                </div>
              </div>
              <div className="pt-6 grid grid-cols-1 md:grid-cols-[1fr_3fr] min-[1535px]:grid-cols-[1fr_4fr]  items-center min-[1024px]:gap-x-3 min-[1280px]:gap-x-0 gap-y-2">
              <button
                  onClick={() => setOpenModalFor("Modify Collateral")}
                  className="text-sm bg-[#EEE] text-[#2C3B8D] rounded-full px-7 py-3 w-max mx-auto md:m-0 font-semibold"
                >
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
                  {financial(rewardAmount, 6)} COMP{" "}
                  <span className="block text-sm text-[#545454] font-normal">
                    ~${financial(Number(compPrice) * rewardAmount, 2)}
                  </span>
                </p>
                <Image
                  width={24}
                  height={24}
                  src={compund}
                  alt=""
                  className="w-6 h-6"
                />
              </div>
              <div className="pt-3">
                <p>Rewards Rate</p>
                <h4 className="text-xl font-medium mt-1 md:mt-3">
                  {financial(rewardRate, 2)}<span className="text-base">%</span>
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
        {/* ---------------------- when choose Coinbase or Gemini Account start ------------------------ */}
        {openModalFor && openModalFor === "Make Payment" && (
          <>
            <ModalContainer>
              {modalStep === 0 && (
                <MakePaymentModal
                  setModalStep={setModalStep}
                  setOpenModalFor={setOpenModalFor}
                  currentBalance={financial(loanData?.outstanding_balance)}
                  collateral={loanData?.collateral}
                  buffer={loanData?.collateral_buffer}
                  threshold={threshold}
                  loanToValue={LTV}
                />
              )}
            </ModalContainer>
          </>
        )}
        {openModalFor && openModalFor === "Modify Collateral" && (
          <>
            <ModalContainer>
              {modalStep === 0 && (
                <ModifyWallet
                  setModalStep={setModalStep}
                  setOpenModalFor={setOpenModalFor}
                  currentBalance={financial(loanData?.outstanding_balance)}
                  collateral={loanData?.collateral}
                  loanToValue={LTV}
                  threshold={threshold}
                  buffer={loanData?.collateral_buffer}
                />
              )}
            </ModalContainer>
          </>
        )}
        {/* ---------------------- when choose Coinbase or Gemini Account End ------------------------ */}
      </main>
    </>
  );
}

export default SinglePage;
