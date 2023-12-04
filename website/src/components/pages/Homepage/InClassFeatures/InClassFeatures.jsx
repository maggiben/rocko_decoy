import React from 'react'
import group from '../../../../assets/images/coin-group.png'
import USDCIcon from '../../../../assets/coins/USDC.svg'
import USDIcon from '../../../../assets/coins/USD.svg'
import GUSDIcon from '../../../../assets/coins/GUSD.svg'
import GUSDIconV2 from '../../../../assets/coins/GUSD2.svg'
import RangeIcon from '../../../../assets/svg-icons/range.svg'
import coinOverlap from '../../../../assets/coins/coin-overlap.png'
import CloseBtn from '../CloseBtn'
import CoinCard from './CoinCard'
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
            <h2 className="lg:text-[40px] text-[25px] text-white font-medium mb-[12px] mt-[24px] text-center tracking-normal">
              Quick Loan Process
            </h2>
            <p className="text-center text-[20px] text-[#FFFFFF99] max-w-[675px] m-auto">
              Set up your crypto-backed loan in minutes with Rocko&apos;s
              simple-to-use interface.
            </p>
          </div>
          <div className="relative flex flex-col  gap-4 sm:gap-auto items-start gap-y-[40px] lg:flex-now-wrap sm:flex-wrap">
            <div className="flex  gap-4  sm:gap-x-10 justify-between w-full lg:flex-nowrap sm:flex-wrap">
              <FeatureCard
                title="Receive USD* or USDC"
                description="If you're a U.S Coinbase or Gemini user, choose to automatically receive your loan in USD so it can be used for many more use cases such as paying down higher-rate debt, buying a car, and more."
                className="bg-[#F9F9F9]"
              >
                <div>
                  <div className="flip-card-front flex  items-start gap-x-[24px]">
                    <CoinCard
                      coinIcon={USDIcon}
                      coinShortName="USD"
                      coinName="US Dollar"
                      selectedCoin=""
                    />
                    <CoinCard
                      coinIcon={USDCIcon}
                      coinShortName="USDC"
                      coinName="USD Coin"
                      selectedCoin=""
                    />
                  </div>
                  <p className="text-[#0F2E35] lg:text-[40px] md:text-[25px] text-[18px] font-medium my-[40px]">
                    Receive USD1 or USDC
                  </p>
                </div>
              </FeatureCard>
              <FeatureCard
                title="Coinbase & Gemini Integrations"
                description="Link your Coinbase or Gemini account to further simplify getting your crypto loan or to receive it in USD. "
                className="bg-[#F5FCFC]"
              >
                <div>
                  <div className="flip-card-front  flex  items-start gap-x-[24px]">
                    <GUSDIcon height={80} width={80} />
                    <GUSDIconV2 height={80} width={80} />
                  </div>
                  <div className="text-[#0F2E35] lg:text-[40px] md:text-[25px] text-[18px] font-medium my-[40px]">
                    Coinbase & Gemini Integrations
                  </div>
                </div>
              </FeatureCard>
              <FeatureCard
                title="Powerful Loan Management Tools"
                description="Manage risk with powerful loan management tools like collateral and APR alerts"
                className="bg-[#E5F0FF]"
              >
                <div>
                  <p className="leading-[48px] text-[#0F2E35] lg:text-[40px] md:text-[25px] text-[18px] font-medium mb-[40px]">
                    Powerful Loan Management Tools
                  </p>
                  <RangeIcon className="mb-[40px] w-full" height={91} />
                </div>
              </FeatureCard>
            </div>
            <div className="flex flex-col md:flex-row gap-4  sm:gap-x-10 justify-between w-full">
              <FeatureCard
                title="Audited DeFi Protocols Only"
                description="Only lending protocols that have undergone third-party security audits are available through Rocko’s interface."
                className="bg-[#F5FCFC]"
              >
                <div>
                  <img
                    className="mb-[40px]"
                    src={coinOverlap}
                    height={80}
                    alt=""
                  />
                  <p className="leading-[48px] text-[#0F2E35] lg:text-[40px] md:text-[25px] text-[18px] font-medium my-[82px]">
                    Audited DeFi Protocols Only
                  </p>
                </div>
              </FeatureCard>
              <FeatureCard
                title="Two-Factor Authentication"
                description="Set up two-factor authentication to increase the security of your account."
                className="bg-[#F9F9F9]"
              >
                <div>
                  <p className="leading-[48px] text-[#0F2E35] lg:text-[40px] md:text-[25px] text-[18px] font-medium mb-[40px]">
                    Two-Factor Authentication
                  </p>
                  <div className="h-[80px] flex gap-4 mb-[124px]">
                    <span className="w-full text-[40px] bg-white flex justify-center items-inherit">
                      .
                    </span>
                    <span className="w-full text-[40px] bg-white flex justify-center items-inherit">
                      .
                    </span>
                    <span className="w-full text-[40px] bg-white flex justify-center items-inherit">
                      .
                    </span>
                    <span className="w-full text-[40px] bg-white flex justify-center items-inherit">
                      3
                    </span>
                  </div>
                </div>
              </FeatureCard>
              <FeatureCard
                title="Covered Network Fees"
                description="Rocko will pay gas fees necessary to deploy your wallet and fulfill your loan**"
                className="bg-[#0F2E35]"
              >
                <div>
                  <div className="mb-[40px] gap-4 sm:gap-auto flex p-6 justify-between items-center rounded-full max-w-xs bg-[#1C373C]">
                    <CloseBtn
                      icon={<CloseIcon fill="#E11900" height={24} width={24} />}
                      className="bg-[#FED7D2]"
                    />
                    <p className="text-[20px] sm:text-[32px] text-[#FFF] font-600 leading-6">
                      Network Fees
                    </p>
                  </div>
                  <div className="mb-[124px]">
                    <p className="leading-[48px] text-[#FFF] lg:text-[40px] md:text-[25px] text-[18px] font-medium">
                      Covered Network Fees
                    </p>
                    <span className="text-xs text-[#545454]">(gas costs*)</span>
                  </div>
                </div>
              </FeatureCard>
            </div>
            <p className="text-[10px] font-400">
              1USD is only available to U.S. Coinbase or Gemini users at this
              time. All users can convert their USDC loan into USD or other fiat
              via crypto exchanges.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InClassFeatures
