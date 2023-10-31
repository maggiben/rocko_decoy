import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { ProtocolProps } from "@/types/type";
import HoverTooltip from "../HoverTooltip/HoverTooltip";
import useLoanData from "@/hooks/useLoanData";
import { useLoanDB } from "@/db/loanDb";
import financial from "@/utility/currencyFormate";
const TOOLTIPS = require('../../../locales/en_tooltips');

const CompoundProtocol: FC<ProtocolProps> = ({
  interestRate,
  name,
  symbol,
  selectProtocol,
  handleProtocol,
}) => {
    const { loanData, setLoanData } = useLoanData();
    const [monthAvgAPR, setMonthAvgAPR] = useState<any>(0);
    const [yearAvgAPR, setYearAvgAPR] = useState<any>(0);
    const [rewardRate, setRewardRate] = useState<any>(0);
    const [avgRewardRate, setAvgRewardRate] = useState<any>(0);
    const { getMonthAverageAPR, getYearAverageAPR, getYearAvgRewardRate, getRewardRate } = useLoanDB();

    const calculateInterestAccrued = (borrowing: number, apr: number, days: number) => {
        const seconds = 60 * 60 * 24 * days;
        const interest = borrowing * (1 + apr / seconds) ** (seconds * days / 365);
        return interest;
    }

    const updateLoanData = async () => {
        try {
            const borrowing = loanData?.borrowing;
            const currentAPR = loanData?.currentAPR;
            const loanToValue = loanData?.loanToValue;
            const penalty = loanData?.liquidationPenalty;
            const threshold = loanData?.liquidationThreshold;
            const rewardRate = loanData?.rewardRate;
            const rewardAmount = loanData?.rewardAmount;
            const collateralInUSD = borrowing / loanToValue * (1 + loanData?.buffer / 100);
            const collateral = collateralInUSD / loanData?.collateralPrice;
            const liquidationPrice = borrowing / threshold / collateral;
            const interestSixMonths = calculateInterestAccrued(borrowing, currentAPR/100, 182.5);
            const interestOneYear = calculateInterestAccrued(borrowing, currentAPR/100, 365);
            const interestTwoYears = calculateInterestAccrued(borrowing, currentAPR/100, 365*2);

            if (setLoanData) {
                setLoanData((prevLoanData) => {
                    return {
                        ...prevLoanData,
                        currentAPR: currentAPR,
                        sixMonthInterest: interestSixMonths,
                        twelveMonthInterest: interestOneYear,
                        twentyFourMonthInterest: interestTwoYears,
                        loanToValue: loanToValue,
                        liquidationPenalty: penalty,
                        liquidationThreshold: threshold,
                        collateralNeeded: collateral,
                        liquidationPrice: liquidationPrice,
                        rewardRate: rewardRate,
                        rewardAmount: rewardAmount,
                    }
                })
            }
        } catch(e) {
            console.log({e}, 'Cannot update loan data')
        }
    }

    useEffect(() => {
        updateLoanData();
        
        getMonthAverageAPR()
        .then(_apr => setMonthAvgAPR(_apr))
        .catch(_err => console.log(_err));

        getYearAverageAPR()
        .then(_apr => setYearAvgAPR(_apr))
        .catch(_err => console.log(_err));

        getRewardRate()
        .then(_rate => setRewardRate(_rate))
        .catch(_err => console.log(_err));

        getYearAvgRewardRate()
        .then(_rate => setAvgRewardRate(_rate))
        .catch(_err => console.log(_err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
    <div className={selectProtocol === name ? "py-8 rounded-t-lg bg-zinc-50" : "py-8"}>
        <div className="px-5">
            {/* protocol name */}
            <div className="flex items-center justify-between flex-col md:flex-row gap-2">
            <div className="flex items-center justify-start gap-1">
                <Image src={symbol || ""} alt={name || ""} width={20} height={20} />
                <h1 className="font-medium text-xl text-blackPrimary">{name}</h1>
            </div>

            <div className="flex items-center justify-end gap-2 md:gap-8 ">
                <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-0">
                <p className="text-xl font-bold text-[#141414]">
                    <>
                        <span style={{ fontSize: "32px" }}>{financial(loanData?.currentAPR, 2)}</span><span className="text-base">% APR</span>
                    </>
                </p>

                <p className="font-medium text-xs text-[#7356BF] bg-[#F4F1FA] rounded-md py-[2px] px-2">
                    Floating Rate
                </p>
                </div>

                <button
                onClick={() => {
                    if (handleProtocol) {
                    handleProtocol(name);
                    }
                }}
                className={`rounded-full py-[10px] px-6  text-sm font-semibold ${
                    selectProtocol === name
                    ? "text-[#eee] bg-[#2C3B8D] "
                    : "bg-[#eee] text-[#2C3B8D]"
                }`}
                >
                Select
                </button>
            </div>
            </div>

            {/* protocol info */}
            <div className="py-4 px-6 w-full mt-4">
            <div className="flex items-start justify-between gap-4 w-full flex-wrap">
                <div className="flex-1 min-w-[205px]">
                    {/* info title */}
                    <div className="flex items-center gap-1">
                    <p className="font-medium text-blackPrimary">
                    Trailing APRs
                    </p>
                    <HoverTooltip text={TOOLTIPS.TRAILING_APRS} />
                    </div>
                    {/* info */}
                    <div className="py-3 space-y-3">
                    <div className="">
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">30 Day</span>
                        </p>
                        <p className="font-semibold text-blackPrimary">
                            {financial(monthAvgAPR * 100, 2)}%
                        </p>
                    </div>                
                    <div className="">
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">365 Day</span>
                        </p>
                        <p className="font-semibold text-blackPrimary">
                            {financial(yearAvgAPR * 100, 2)}%
                        </p>
                    </div>                   
                    </div>
                </div>            
                <div className="flex-1 min-w-[205px]">
                    {/* info title */}
                    <div className="flex items-center gap-1">
                    <p className="font-medium text-blackPrimary">
                    Collateral Parameters (ETH)
                    </p>
                    </div>
                    {/* info */}
                    <div className="py-3 space-y-3">
                    <div>
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">Max Loan-to-Value</span>
                            <HoverTooltip text={TOOLTIPS.MAX_LTV} />
                        </p>
                        <p className="font-semibold text-blackPrimary">
                            {loanData?.loanToValue * 100}%
                        </p>
                    </div>                
                    <div>
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">Liquidation Threshold</span>
                            <HoverTooltip text={TOOLTIPS.LIQUIDATION_THRESHOLD} />
                        </p>
                        <p className="font-semibold text-blackPrimary">
                            {loanData?.liquidationThreshold * 100}%
                        </p>
                    </div>                   
                    <div>
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">Liquidation Penalty</span>
                            <HoverTooltip text={TOOLTIPS.LIQUIDATION_PENALTY} />
                        </p>
                        <p className="font-semibold text-blackPrimary">
                            {financial(loanData?.liquidationPenalty * 100)}%
                        </p>
                    </div>                   
                    </div>
                </div>
                <div className="flex-1 min-w-[205px]">
                    {/* info title */}
                    <div className="flex items-center gap-1">
                    <p className="font-medium text-blackPrimary">Rewards</p>
                    <HoverTooltip text={TOOLTIPS.PROTOCOL_REWARDS} />
                    </div>
                    {/* info */}
                    <div className="py-3 space-y-3">
                    <div>
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">Current Rate</span>
                        </p>
                        <p className="font-semibold text-blackPrimary">
                            {financial(rewardRate * 100, 2)}%
                        </p>
                    </div>                
                    <div>
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">Trailing 365 average</span>
                        </p>
                        <p className="font-semibold text-blackPrimary">
                            {financial(avgRewardRate * 100, 2)}%
                        </p>
                    </div>                   
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
};

export default CompoundProtocol;
