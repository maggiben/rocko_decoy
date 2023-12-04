import React from 'react'
import EyeIcon from '../../../assets/svg-icons/eye.svg'
import PaymentIcon from '../../../assets/svg-icons/payment.svg'
import PercentIcon from '../../../assets/svg-icons/percent.svg'
import VectorIcon from '../../../assets/svg-icons/vector.svg'
import loanAmount from '../../../assets/images/loan_amount.png'
import DataIconCard from './DataIconCard'

function ComprehensiveLoanDashboard() {
  return (
    <div className="relative lg:py-[72px] py-[50px] border-b border-[#E2E2E2]">
      <div className="container mx-auto px-4  ">
        <div className="flex justify-between items-center flex-wrap lg:flex-nowrap lg:gap-x-[40px] gap-y-[30px] lg:gap-y-[0] ">
          <div className="lg:max-w-[699px] w-full">
            <h2 className="tracking-normal text-[#141414] lg:text-[48px] md:text-[35px] text-[22px] lg:max-w-[426px]  mb-[48px]">
              Comprehensive Loan Dashboard
            </h2>
            <div className="flex justify-between items-start lg:gap-[30px] gap-[16px] flex-wrap">
              <DataIconCard
                className="md:max-w-[330px]"
                cardHeading="View Key Information"
                CardContent="View key information such as your current balance, interest rate, and collateral buffer."
                icon={PercentIcon}
              />
              <DataIconCard
                className="md:max-w-[330px]"
                cardHeading="Payment & Collateral Options"
                CardContent="Make partial or full repayments, or modify your collateral at anytime."
                icon={PaymentIcon}
              />
              <DataIconCard
                className="md:max-w-[330px]"
                cardHeading="Projected Values Calculator"
                CardContent="Before committing to a payment or collateral modification, see how it would impact your loan with Rocko’s projected values calculator."
                icon={VectorIcon}
              />
              <DataIconCard
                className="md:max-w-[330px]"
                cardHeading="Track Rewards"
                CardContent="Track any rewards earned from lending protocols like Compound."
                icon={EyeIcon}
              />
            </div>
          </div>
          <div className="lg:max-w-[560px] w-full  lg:absolute lg:right-0 ">
            <img src={loanAmount} alt="" className="w-full lg:h-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComprehensiveLoanDashboard
