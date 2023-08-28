import { Link } from "react-router-dom"
import AssetParameter from "../../../components/AssetParameter/AssetParameter"
import ChooseCoins from "../../../components/ChooseCoins/ChooseCoins"
import LoanSummary from "../../../components/LoanSummary/LoanSummary"
import useLoanData from "../../../hooks/useLoanData"

const StepTwo = ({assets, id, title, description}) => {
    const { loanData, setLoanData, loanSteps, currentStep, setCurrentStep } =
    useLoanData();

    return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
        {/* title start  */}
        <h1 className="text-2xl lg:text-3xl text-blackPrimary lg:text-start text-center">Customize Your Loan</h1>
        {/* title end  */}

        {/* Choose section  */}
        <section className="flex gap-4 lg:gap-10 my-6 flex-col sm:flex-row ">
            <div className="w-full sm:w-8/12 ">
            <div className="p-6 border border-whiteSecondary rounded-2xl">
                <p className=" text-xl font-medium  text-blackPrimary lg:text-start text-center">
                {title}
                </p>
                
                
                <ChooseCoins assets={assets}/>
                <div className=" p-4 lg:p-6 space-y-6 lg:space-y-10 bg-whiteTertiary rounded-2xl">
                <p className="text-blackPrimary font-medium">
                Collateral Parameters
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
                    <AssetParameter title="Loan-to-Value" value={loanData?.loanToValue} />
                    <AssetParameter active title="Liquidation Threshold" value={loanData?.liquidationThreshold} />
                    <AssetParameter title="Liquidation Penalty" value={loanData?.liquidationPenalty}/>
                </div>
                <p className="pt-6   text-sm text-blackSecondary">
                    Lending protocols determine which assets are able to be used
                    as collateral, the minimum amount of collateral required, and
                    other asset parameters.{" "}
                    <Link href={"/"} className="underline">
                    Learn more.
                    </Link>
                </p>
                </div>
            </div>
            </div>
            <div className="p-6 border border-[#E2E2E2] flex-1 rounded-2xl">
            <LoanSummary />
            </div>
        </section>
        </main>
    )
}

export default StepTwo
