import HoverTooltip from "../HoverTooltip/HoverTooltip";
import useLoanData from "../../hooks/useLoanData";
import { financial } from "../../helper";

const CompoundProtocol = ({
  interestRate,
  name,
  symbol,
  selectProtocol,
  handleProtocol,
}) => {
    const { loanData } = useLoanData();

    return (
    <div className="py-8">
        {/* protocol name */}
        <div className="flex items-center justify-between flex-col md:flex-row gap-2">
        <div className="flex items-center justify-start gap-1">
            <img src={symbol || ""} alt={name || ""} width={20} height={20} />
            <h1 className="font-medium text-xl text-blackPrimary">{name}</h1>
        </div>

        <div className="flex items-center justify-end gap-2 md:gap-8 ">
            <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-0">
            <p className="text-xl font-medium text-blackPrimary">
                {interestRate}<span className="text-base">%</span>
            </p>

            <p className="font-medium text-xs text-[#276EF1] bg-[#EFF3FE] rounded-md py-[2px] px-2">
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
                Trailing APR’s
                </p>
                <HoverTooltip text="tooltip information" />
                </div>
                {/* info */}
                <div className="py-3 space-y-3">
                <div className="" key={"30 Day"}>
                    <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                        <span className="">30 Day</span>
                    </p>
                    <p className="font-semibold text-blackPrimary">
                        {financial(loanData?.currentAPR * 30/365, 2)}%
                    </p>
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
                ETH Collateral Parameters
                </p>
                <HoverTooltip text="tooltip information" />
                </div>
                {/* info */}
                <div className="py-3 space-y-3">
                <div>
                    <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                        <span className="">Loan-to-value</span>
                        <HoverTooltip text="Loan-to-value tooltip" />
                    </p>
                    <p className="font-semibold text-blackPrimary">
                        {loanData?.loanToValue * 100}%
                    </p>
                </div>                
                <div>
                    <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                        <span className="">Liquidation Threshold</span>
                        <HoverTooltip text="Loan-to-value tooltip" />
                    </p>
                    <p className="font-semibold text-blackPrimary">
                        {loanData?.liquidationThreshold * 100}%
                    </p>
                </div>                   
                <div>
                    <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                        <span className="">Liquidation Penalty</span>
                        <HoverTooltip text="Loan-to-value tooltip" />
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
                <HoverTooltip text="tooltip information" />
                </div>
                {/* info */}
                <div className="py-3 space-y-3">
                <div>
                    <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                        <span className="">Current Rate</span>
                    </p>
                    <p className="font-semibold text-blackPrimary">
                        {financial(loanData?.rewardRate, 2)}%
                    </p>
                </div>                
                <div>
                    <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                        <span className="">Trailing 365 average</span>
                    </p>
                    <p className="font-semibold text-blackPrimary">
                        2.83%
                    </p>
                </div>                   
                </div>
            </div>
        </div>
        </div>
    </div>
    );
};

export default CompoundProtocol;
