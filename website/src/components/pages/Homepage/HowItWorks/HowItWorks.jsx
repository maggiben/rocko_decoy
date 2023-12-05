import React from 'react'
import howWork from '../../../../assets/images/how-work.png'
import DataCard from './DataCard'

function HowItWorks() {
  return (
    <section className="lg:py-[80px] py-[50px] border-b border-[#E2E2E2] bg-[#fff]">
      <div className="container mx-auto px-4">
        <div className="">
          <h2 className="tracking-normal text-[#141414] lg:text-[48px] md:text-[35px] text-[22px] lg:max-w-[891px] mb-[48px]">
            How it Works
          </h2>
          <div className="flex justify-between items-center  lg:gap-x-[100px] gap-y-[30px] flex-wrap lg:flex-wrap rounded-[24px] bg-[#FCFCFC]">
            <div className=" lg:max-w-[543px] lg:max-h-[731px] lg:shrink-0 lg:grow w-full">
              <img src={howWork} alt="how to work" className="w-full" />
            </div>
            <div className="lg:shrink-0 lg:grow">
              <DataCard
                title="Set Up Your Loan"
                description="Set up your loan to your preferences. Choose how much to borrow, which type of crypto asset to use as collateral, and where to receive the loan amount."
              />
              <DataCard
                title="Receive a Rocko Smart Wallet"
                description="Upon finalizing your loan, you'll automatically receive a Rocko smart wallet. It's programmed to automatically fulfill your loan based on the loan specifications you set."
              />
              <DataCard
                title="Transfer Collateral for Automatic Loan Fulfillment"
                description="Transfer the crypto collateral for your loan to your Rocko smart wallet and it will automatically withdraw your loan from Compound and transfer it to your specified account or wallet!"
              />
              <DataCard
                className="pb-0"
                title="Receive Loan"
                description="Receive your crypto loan and use it how you want! You can then manage and repay your loan at any time using the Rocko loan dashboard."
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
