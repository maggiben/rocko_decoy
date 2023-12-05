import React from 'react'
import { Link } from 'gatsby'
import DataCard from './DataCard'
import VectorIcon from '../../../../assets/svg-icons/vector.svg'
import CreditCardIcon from '../../../../assets/svg-icons/credit_card.svg'
import HomeIcon from '../../../../assets/svg-icons/home.svg'
import loanAmountPage from '../../../../assets/images/loan-amt-page.png'
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
        <p className="text-blackSecondary lg:text-[18px] text-[16px]">
          Learn more about the benefits and risks of DeFi borrowing{' '}
          <Link
            to="/"
            className="text-[#006AFF] text-[18px] underline-offset-1"
          >
            here.
          </Link>
        </p>
        <div className="flex justify-between items-center border-b lg:py-[64px] py-[30px] lg:gap-20 gap-y-[20px]  sm:flex-wrap lg:flex-nowrap ">
          <PictureCard className="min-h-[300px] sm:min-h-[250px] max-w-[100%]">
            <img
              src={loanAmountPage}
              alt=""
              className="absolute right-0 bottom-0"
            />
          </PictureCard>
          <DataCard
            className="max-w-[660px]"
            heading="DeFi borrowing made easy — for everyone"
            content="Decentralized Finance (DeFi) lending protocols are applications that run on blockchain networks like Ethereum and allow users to borrow or lend crypto assets. Rocko’s simple-to-use platform reduces the time and complexity so consumers of all levels can easily borrow cash1 or USDC from popular DeFi protocols — starting with Compound."
          />
        </div>
        <div className="flex justify-between items-center border-b lg:gap-20 lg:py-[64px] py-[30px] gap-y-[20px]  sm:flex-wrap lg:flex-nowrap">
          <DataCard
            className="ms:order-last lg:order-first"
            heading="Borrow up to 82% of the value of your Ether — with flexible loan terms2"
            content="Use Rocko to access better loan-to-value ratios, more competitive rates, and more flexible loan terms than offered by many traditional lenders. Take out your loan for as little or as long as you like.3 And, with no monthly minimum payments!"
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
              <TextCard text="Other Investments" icon={VectorIcon} />
            </div>
          </PictureCard>
          <DataCard
            heading="Use your loan how you want "
            content="With Rocko, you can quickly get funds with no credit check required. Use your loan to purchase real estate, pay down higher-rate debt, make other investments, and much more."
          />
        </div>
        <p className="text-[#141414] text-[10px] ">
          1Interest rates are offered by Compound lending protocol and fluctuate
          in real-time based on market forces. Learn more about floating
          interest rates here.
        </p>
        <p className="text-[#141414] text-[10px]">
          2Loans offered by Compound are open-ended meaning borrowers can repay
          at any time as long as the loan-to-value ratio for their loan remains
          below the liquidation threshold. Learn more here.
        </p>
      </div>
    </section>
  )
}

export default CryptoHolding
