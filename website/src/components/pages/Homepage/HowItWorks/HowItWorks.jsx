import React from 'react'
import HowWork from '../../../../assets/images/how-work.svg'
import DataCard from './DataCard'

function HowItWorks() {
  return (
    <section className="lg:py-[80px] py-[50px] border-b border-[#E2E2E2] bg-[#fff]">
      <div className="container mx-auto px-4">
        <div className="">
          <h2 className="tracking-normal text-[#141414] lg:text-[48px] md:text-[35px] text-[22px] lg:max-w-[891px] mb-[48px]">
            How it Works
          </h2>
          <div className="flex justify-between items-center  xl:gap-x-[100px] md:gap-x-[30px] gap-y-[30px] flex-wrap xl:!flex-nowrap rounded-[24px] bg-[#FCFCFC]">
            <div className=" lg:max-w-[543px] lg:max-h-[731px] lg:shrink-0 lg:grow w-full">
              {/* <img src={howWork} alt="how to work" className="w-full" /> */}
              <HowWork className="w-full" />
            </div>
            <div className="lg:shrink-0 lg:grow [&>*:nth-child(3)]:before:top-[41px] [&>*:nth-child(3)]:-mt-[40px] [&>*:nth-child(4)]:-mt-[40px] [&>*:nth-child(2)]:pb-[100px] [&>*:nth-child(3)]:pb-[100px] [&>*:nth-child(4)]:before:top-[40px]">
              <DataCard
                title="Set Up Your Loan"
                description="Choose how much to borrow, which type of crypto asset to use as collateral, how much collateral to post, and where to receive the loan amount."
              />
              <DataCard
                title="Receive a Rocko Smart Wallet"
                description="Upon finalizing your loan, you'll receive a Rocko smart wallet which will automatically fulfill your loan based on your specifications."
              />
              <DataCard
                title="Transfer Collateral for Automatic Loan Fulfillment"
                description="Once you transfer the crypto collateral to your Rocko smart wallet, it will automatically deposit the collateral in Compound and transfer your loan to your specified account or wallet."
              />
              <DataCard
                className="pb-0"
                title="Receive Your Loan!"
                description="You can manage and repay your loan at any time using the Rocko loan dashboard. Upon fully repaying your loan, you'll automatically receive your collateral back."
                isNext={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
