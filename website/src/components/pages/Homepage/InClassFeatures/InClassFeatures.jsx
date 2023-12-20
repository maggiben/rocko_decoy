import React from 'react'
import group from '../../../../assets/images/coin-group.png'
import GUSDIcon from '../../../../assets/coins/GUSD2.svg'
import UsdIcon from '../../../../assets/coins/USD.svg'
import USDC from '../../../../assets/coins/USDC.svg'
import Coinbase from '../../../../assets/coins/GUSD.svg'
import Powerful from '../../../../assets/svg-icons/powerful.svg'
import Audited from '../../../../assets/svg-icons/audited.svg'
import Helpful from '../../../../assets/svg-icons/helpful.svg'
import CloseBtn from '../CloseBtn'
import FeatureCard from './FeatureCard'
import CloseIcon from '../CloseIcon'

function InClassFeatures() {
  return (
    <section className="lg:py-[80px] py-[50px] border-b border-[#E2E2E2]">
      <div className="container mx-auto px-4">
        <h2 className="tracking-normal text-[#141414] lg:text-[48px] md:text-[35px] text-[22px]  lg:mb-[80px] mb-[50px]">
          Best-in-Class Features
        </h2>
        <div className="w-full">
          <div className="bg-[#081D21] rounded-[20px] lg:py-[100px] py-[50px] px-[15px]  mb-[40px]">
            <div className="max-w-[462px] m-auto">
              <img src={group} alt="group" />
            </div>
            <h2 className="lg:text-[28px] text-[25px] text-white font-medium mb-[12px] mt-[24px] text-center tracking-normal">
              Quick Loan Process
            </h2>
            <p className="text-center text-[20px] text-[#FFFFFF99] max-w-[675px] m-auto">
              Set up your crypto-backed loan in minutes with Rocko&apos;s
              simple-to-use interface.
            </p>
          </div>
          <div className="relative flex flex-col  gap-4 sm:gap-auto items-start gap-y-[40px] lg:flex-now-wrap sm:flex-wrap">
            <div className="flex  gap-4  sm:gap-x-8 lg:justify-between justify-center w-full lg:flex-nowrap sm:flex-wrap">
              <FeatureCard
                title="Receive USD¹ or USDC"
                description="If you’re a U.S Coinbase or Gemini user, choose to automatically receive your loan in USD so it can be more easily used for real estate, paying down higher-rate debt, buying a car, and more."
                className="bg-[#F9F9F9]"
                image={
                  <div className="flex items-center ">
                    <UsdIcon className="relative z-10" />
                    <USDC height={40} width={40} className="ml-[-5px]" />
                  </div>
                }
              />
              <FeatureCard
                title="Coinbase & Gemini Integrations"
                description="Link your Coinbase or Gemini account to further simplify getting your crypto loan or to receive it in USD. "
                className="bg-[#F5FCFC]"
                image={
                  <div className="flex items-center gap-[8px]">
                    <Coinbase />
                    <GUSDIcon height={40} width={40} />
                  </div>
                }

                // pngimage={'Coinbase'}
              />
              <FeatureCard
                title="Powerful Loan Management Tools"
                description="Manage risk with powerful loan management tools like collateral and APR alerts"
                className="bg-[#E5F0FF]"
                image={<Powerful />}
              />
            </div>
            <div className="flex  gap-4  sm:gap-x-10 lg:justify-between justify-center w-full lg:flex-nowrap sm:flex-wrap justify">
              <FeatureCard
                title="Audited DeFi Protocols Only"
                description="Only lending protocols that have undergone third-party security audits are available through Rocko’s interface."
                className="bg-[#F5FCFC]"
                image={<Audited />}
              />
              <FeatureCard
                title="Helpful Customer Support"
                description="Rocko’s customer support team is here to answer your critical questions and help in "
                className="bg-[#F9F9F9]"
                image={<Helpful />}
              />
              <FeatureCard
                title="Automated loan fulfillment"
                description="Your Rocko wallet is programmed to fulfill your loan for you — saving you time and complexity"
                className="bg-[#D5F7FF80] text-[#141414]"
                image={
                  <div className="mb-[24px] gap-2 sm:gap-auto flex px-3 py-[7.5px] max-w-[211px] w-full items-center  rounded-full  bg-[#BCF2FF]">
                    <CloseBtn
                      className="p-0 !h-[20px] !w-[20px]"
                      icon={<CloseIcon fill="#05944F" height={20} width={20} />}
                    />
                    <p className="text-[16.046px]  text-[#141414] font-semibold">
                      Reduced complexity
                    </p>
                  </div>
                }
              />
            </div>
          </div>
          <p className="text-[10px] font-400 lg:mt-[40px] mt-[20px]">
            <sup>1</sup>USD is only available to U.S. Coinbase or Gemini users
            at this time. All users can convert their USDC loan into USD or
            other fiat via crypto exchanges.
          </p>
          <p className="text-[10px] font-400">
            <sup>2</sup>Up to $100. Users will be responsible for covering any
            fees in excess of $100.
          </p>
        </div>
      </div>
    </section>
  )
}

export default InClassFeatures
