import React from 'react'
import { Link } from 'gatsby'
import DataCard from './DataCard'
import VectorIcon from '../../../../assets/svg-icons/vector.svg'
import CreditCardIcon from '../../../../assets/svg-icons/credit_card.svg'
import HomeIcon from '../../../../assets/svg-icons/home.svg'
import LoanAmount from '../../../../assets/images/loan-amount.svg'
import coinGroup from '../../../../assets/images/coin-group.png'

import TextCard from './TextCard'
import PictureCard from '../PictureCard'

function CryptoHolding() {
  return (
    <section className="lg:py-[80px] py-[50px]">
      <div className=" container mx-auto px-4">
        <h2 className="text-[#141414] lg:text-[48px] md:text-[35px] text-[22px] font-normal tracking-normal">
          {' '}
          Get cash without having to sell your crypto holdings
        </h2>
        {/* <p className="text-blackSecondary lg:text-[18px] text-[16px]">
          Learn more about the benefits and risks of DeFi borrowing{' '}
          <Link
            to="/why-defi"
            className="text-[#006AFF] text-[18px] underline-offset-1"
          >
            here.
          </Link>
        </p> */}
        <div className="flex justify-between items-center border-b lg:py-[64px] py-[30px] lg:gap-20 gap-y-[20px]  sm:flex-wrap lg:flex-nowrap ">
          <PictureCard className="min-h-[300px] sm:min-h-[250px] max-w-[100%]">
            {/* <img
              src={loanAmountPage}
              alt=""
              className="absolute right-0 bottom-0"
            /> */}
            <LoanAmount className="absolute  xl:right-[-163px] xl:!bottom-[-100px] w-full h-full md:w-[600px] md:h-[514px]" />
          </PictureCard>
          <DataCard
            className="max-w-[660px]"
            heading="DeFi borrowing made easy — for everyone"
            label="Learn more about the benefits and risks of DeFi borrowing"
            link="here."
            content="Decentralized Finance (DeFi) lending protocols are applications that run on blockchain networks like Ethereum and allow users to borrow or lend crypto assets. Rocko’s simple-to-use platform reduces the time and complexity so consumers of all levels can easily borrow cash¹ or USDC from popular DeFi protocols — starting with Compound."
          />
        </div>
        <div className="flex justify-between items-center border-b lg:gap-20 lg:py-[64px] py-[30px] gap-y-[20px]  sm:flex-wrap lg:flex-nowrap">
          <DataCard
            className="ms:order-last lg:order-first"
            heading="Borrow up to 83% of the value of your Ether — with flexible loan terms²"
            content={
              <p>
                Use Rocko to access better loan-to-value ratios, more
                competitive rates, and more flexible loan terms than offered by
                many traditional lenders. Take out your loan for as little or as
                long as you like.<sup>3</sup> And, with no monthly minimum
                payments!
              </p>
            }
          />
          <PictureCard className="min-h-[300px] sm:min-h-[250px] flex justify-between items-center className='max-w-[100%]' lg:order-last sm:order-first ">
            <img src={coinGroup} alt="" height={104} />
          </PictureCard>
        </div>
        <div className="flex justify-between items-center  lg:gap-20 lg:py-[64px] py-[30px]  gap-y-[20px]  sm:flex-wrap lg:flex-nowrap">
          <PictureCard className="min-h-[420px] sm:min-h-[250px] max-w-[100%]">
            <h4 className="text-white font-medium text-[20px] lg:mb-[44px] mb-[18px]">
              Use your loan for things like:
            </h4>
            <div className="w-full ">
              <TextCard text="Real Estate Purchases" icon={HomeIcon} />
              <TextCard
                text="Paying Down Higher-Rate Debt"
                icon={CreditCardIcon}
              />
              <TextCard text="And Much More" icon={VectorIcon} />
            </div>
          </PictureCard>
          <DataCard
            heading="Use your loan how you want "
            content="With Rocko, you can quickly get funds with no credit check required. Use your loan to purchase real estate, pay down higher-rate debt, make everyday purchases, and much more."
          />
        </div>
        <p className="text-[#141414] text-[10px] ">
          <sup>1</sup>USD is only available to U.S. Coinbase or Gemini users at
          this time. All users can convert their USDC loan into USD or other
          fiat via crypto exchanges.
        </p>
        <p className="text-[#141414] text-[10px]">
          <sup>2</sup>The max loan-to-value ratio is set by Compound. Interest
          rates are offered by Compound lending protocol and fluctuate in
          real-time based on market forces. Learn more about floating interest
          rates{' '}
          <Link
            to="/learn/what-is-a-floating-interest-rate-in-defi/"
            className="text-[#141414] underline decoration-1"
          >
            here
          </Link>
          .
        </p>
        <p className="text-[#141414] text-[10px]">
          <sup>3</sup>Loans offered by Compound are open-ended meaning borrowers
          can repay at any time as long as the loan-to-value ratio for their
          loan remains below the liquidation threshold. Learn more{' '}
          <Link
            to="/why-defi"
            className="text-[#141414] underline decoration-1"
          >
            here
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

export default CryptoHolding
