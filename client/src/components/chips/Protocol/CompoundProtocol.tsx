import { FC, useState, useEffect } from "react";
import { ProtocolProps } from "@/types/type";
import HoverTooltip from "../HoverTooltip/HoverTooltip";
import useLoanData from "@/hooks/useLoanData";
import { useLoan } from "@/contract/single";
import financial from "@/utility/currencyFormate";
import { IS_DEMO_MODE } from "@/constants/env";
const TOOLTIPS = require('../../../locales/en_tooltips');

const CompoundProtocol: FC<ProtocolProps> = ({
  interestRate,
  name,
  symbol,
  selectProtocol,
  handleProtocol,
}) => {
    const { loanData, setLoanData } = useLoanData();
    const {
        getBorrowAPR,
        getETHPrice,
        getLTV,
        getPenalty,
        getThreshold,
        getRewardRate,
        getRewardAmount
    } = useLoan();

    const updateLoanData = async () => {
        try {
            const borrowing = loanData?.borrowing;
            const currentAPR = await getBorrowAPR();
            const loanToValue = await getLTV();
            const penalty = await getPenalty();
            const threshold = await getThreshold();
            const ethPrice = await getETHPrice();
            const rewardRate = await getRewardRate();
            const rewardAmount = await getRewardAmount();
            const collateralInUSD = borrowing / loanToValue * (1 + loanData?.buffer / 100);
            const collateral = collateralInUSD / ethPrice;
            const liquidationPrice = borrowing / threshold / collateral;
            const interestSixMonths = borrowing * (IS_DEMO_MODE ? 3.94 : currentAPR) / 200;
            const interestOneYear = borrowing * (IS_DEMO_MODE ? 3.94 : currentAPR) / 100;
            const interestTwoYears = borrowing * (IS_DEMO_MODE ? 3.94 : currentAPR) / 50;

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
                        collateralPrice: ethPrice,
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
    }, [loanData])

    return (
    <div className={selectProtocol === name ? "py-8 rounded-t-lg bg-zinc-50" : "py-8"}>
        <div className="px-5">
            {/* protocol name */}
            <div className="flex items-center justify-between flex-col md:flex-row gap-2">
            <div className="flex items-center justify-start gap-1">
                <img src={symbol || ""} alt={name || ""} width={20} height={20} />
                <h1 className="font-medium text-xl text-blackPrimary">{name}</h1>
            </div>

            <div className="flex items-center justify-end gap-2 md:gap-8 ">
                <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-0">
                <p className="text-xl font-bold text-[#141414]">
                    {IS_DEMO_MODE ? (
                        <>
                            <span style={{ fontSize: "32px" }}>3.94</span><span className="text-base">% APR</span>
                        </>
                    ) : (
                        <>
                            <span style={{ fontSize: "32px" }}>{financial(loanData?.currentAPR, 2)}</span><span className="text-base">% APR</span>
                        </>
                    )}
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
                <div className="flex-1 min-w-[205px]" key="protocol-info-1">
                    {/* info title */}
                    <div className="flex items-center gap-1">
                    <p className="font-medium text-blackPrimary">
                    Trailing APRs
                    </p>
                    <HoverTooltip text={TOOLTIPS.TRAILING_APRS} />
                    </div>
                    {/* info */}
                    <div className="py-3 space-y-3">
                    <div className="" key={"30 Day"}>
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">30 Day</span>
                        </p>
                        {IS_DEMO_MODE ? (
                            <p className="font-semibold text-blackPrimary">
                                4.24%
                            </p>
                        ) : (
                            <p className="font-semibold text-blackPrimary">
                                {financial(loanData?.currentAPR * 30/365, 2)}%
                            </p>
                        )}
                    </div>                
                    <div className="" key={"30 Day"}>
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">365 Day</span>
                        </p>
                        <p className="font-semibold text-blackPrimary">
                            {financial(loanData?.currentAPR, 2)}%
                        </p>
                    </div>                   
                    </div>
                </div>            
                <div className="flex-1 min-w-[205px]" key="protocol-info-1">
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
                <div className="flex-1 min-w-[205px]" key="protocol-info-1">
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
                            2.00%
                        </p>
                    </div>                
                    <div>
                        <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                            <span className="">Trailing 365 average</span>
                        </p>
                        <p className="font-semibold text-blackPrimary">
                            2.73%
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
