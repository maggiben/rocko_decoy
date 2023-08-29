import HoverTooltip from "../HoverTooltip/HoverTooltip";
import useLoanData from "../../hooks/useLoanData";
import { financial } from "../../helper";
import formatCurrency from "../../utils/currencyFormate";

const LoanSummary = () => {
    const { loanData, setLoanData, loanSteps, currentStep, setCurrentStep } =
        useLoanData();

    return (
    <>
        <p className="text-2xl font-medium text-blackPrimary">Loan Summary</p>
        <div className="my-4">
        <p className="text-blackPrimary">Borrowing</p>
        <div className="flex items-center mt-4 mb-2 justify-between">
            <p className="text-2xl font-medium tracking-[-0.5px] text-blackPrimary">
            {loanData?.borrowing ? formatCurrency(loanData?.borrowing) : "--"}
            <span className="text-base"> {loanData?.coin}</span>
            </p>
            {loanData?.coinIcon && (
            <img src={loanData?.coinIcon} width={24} height={24} alt="usdc" />
            )}
        </div>
        <p className="text-sm text-blackSecondary">
            {(loanData?.coin !== "USD" &&
            loanData?.borrowing &&
            `~$${formatCurrency(loanData?.borrowing)}`) ||
            ""}
        </p>
        </div>
        <hr className=" border-whiteSecondary" />
        <div className="my-4 space-y-2">
        <div className="flex items-center gap-2 text-blackPrimary">
            Current APR
            <HoverTooltip text="Current APR tooltip" />
        </div>
        <p className="text-2xl font-medium tracking-[-0.5px] text-blackPrimary">
            {(loanData?.currentAPR && (
            <>
                {financial(loanData?.currentAPR, 2)}
                <span className="text-base">%</span>
            </>
            )) ||
            "--"}
        </p>
        </div>
        <hr className=" border-whiteSecondary" />
        <div className="my-4 space-y-2">
        <div className="flex items-center gap-2 text-blackPrimary">
            Projected Interest (in USD)
            <HoverTooltip text="Projected Interest tooltip" />
        </div>
        <p className="text-sm flex items-center justify-between font-medium ">
            <span className="text-blackSecondary">6 months</span>
            <span className="text-blackPrimary">
            {(loanData?.sixMonthInterest && (
                <>${financial(loanData?.sixMonthInterest, 2)}</>
            )) ||
                "--"}
            </span>
        </p>
        <p className="text-sm flex items-center justify-between font-medium ">
            <span className="text-blackSecondary">12 months</span>
            <span className="text-blackPrimary">
            {" "}
            {(loanData?.twelveMonthInterest && (
                <> ${financial(loanData?.twelveMonthInterest, 2)}</>
            )) ||
                "--"}
            </span>
        </p>
        <p className="text-sm flex items-center justify-between font-medium ">
            <span className="text-blackSecondary">24 months</span>
            <span className="text-blackPrimary">
            {" "}
            {(loanData?.twentyFourMonthInterest && (
                <>${financial(loanData?.twentyFourMonthInterest, 2)}</>
            )) ||
                "--"}
            </span>
        </p>
        </div>

        <hr className=" border-whiteSecondary" />
        <div className="my-4 space-y-2">
        <div className="flex items-center gap-2 text-blackPrimary">
            Collateral Needed
            <HoverTooltip text="Collateral Needed tooltip" />
        </div>
        <div
            className="flex items-center
            justify-between gap-1"
        >
            <p className="text-2xl font-medium tracking-[-0.5px] text-blackPrimary">
            {loanData?.collateralNeeded && loanData?.cryptoName ? (
                <>
                {" "}
                {financial(loanData?.collateralNeeded, 3)}{" "}
                <span className="text-base"> {loanData?.cryptoName}</span>
                </>
            ) : (
                "--"
            )}
            </p>
            {loanData?.cryptoIcon && (
            <img
                src={loanData?.cryptoIcon || ""}
                alt={loanData?.cryptoName || ""}
                width={24}
                height={24}
            />
            )}
        </div>

        <p className="text-[#545454] text-sm ">
            {(loanData?.subCollateralPrice && (
            <> ${formatCurrency(loanData?.subCollateralPrice)}</>
            )) ||
            ""}
        </p>
        </div>
        <hr className=" border-whiteSecondary" />
        <div className="my-4 space-y-2">
        <div className="flex items-center gap-2 text-blackPrimary">
            Liquidation Price
            <HoverTooltip text="Liquidation Price tooltip" />
        </div>
        <p className="text-2xl font-medium tracking-[-0.5px] text-blackPrimary">
            {(loanData?.liquidationPrice &&
            `$ ${financial(loanData?.liquidationPrice, 2)}`) ||
            "--"}
        </p>
        {(loanData?.liquidationPrice && (
            <p className="text-sm flex items-center justify-between font-medium ">
            <span className="text-blackSecondary">
                Current Price of {loanData?.cryptoName}
            </span>
            <span className="text-blackPrimary">
                ${financial(loanData?.collateralPrice, 2)}
            </span>
            </p>
        )) ||
            ""}
        </div>
    </>
    );
};

export default LoanSummary;
