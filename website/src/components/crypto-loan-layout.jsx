import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Envelope from '../assets/images/envelope.svg'
import Input from './Input'
import Title from './Title'
import FormWrapper from './shared/FormWrapper'
import PayDownDebtIcon from '../assets/svg-icons/pay_down_debt_icon.svg'
import HouseIcon from '../assets/svg-icons/house_icon.svg'
import BusinessIcon from '../assets/svg-icons/business_icon.svg'
import MuchMoreIcon from '../assets/svg-icons/much_more_icon.svg'
import HowItWorksIcon from '../assets/svg-icons/rocko_how_it_works_icon.svg'

export default function CryptoLoanTemplate(
  { pageData } = {
    title: '',
    name: '',
    ticker: '',
    icon: <span />,
  },
) {
  useEffect(() => {
    document.title = pageData?.title

    const metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    metaDescription.content = `Learn about ${pageData?.ticker}-Backed loans and how to use Rocko to get one`
    document.head.appendChild(metaDescription)

    return () => {
      document.head.removeChild(metaDescription)
    }
  }, [])

  return (
    <>
      <div className="banner bg-[#081D21] lg:pt-[120px] py-[50px] px-[16px]  lg:pb-[120px]  text-center">
        <div className="max-w-[894px] w-full mx-[auto] text-center">
          <div className="flex justify-center mx-[auto]">{pageData?.icon}</div>
          <div className="rounded-full h-[16px] w-[38px] bg-[#15292c00] overflow-hidden mx-[auto] mb-[16px]">
            {' '}
          </div>
          <h2 className="defi text-[#fff] lg:text-[48px] lg:leading-[56px]  font-medium sm:-text-[30px] text-[25px]">
            {pageData?.title}
          </h2>
          <h4 className=" text-[#fff] text-[24px] pt-[10px]">
            Use your {pageData?.name} ({pageData?.ticker}) as collateral for a
            loan so you can get liquidity without having to sell. Use Rocko to
            easily borrow from popular DeFi protocols and get the most out of
            your crypto holdings.
          </h4>
        </div>
      </div>
      <div className="max-w-[1242px] w-full lg:pt-[80px] pt-[20px] pb-[0] m-[auto] px-[15px] mx-auto">
        <h2 className="defi lg:text-[40px] md:text-[35px] text-[22px] text-[#141414] leading-[56px] font-normal lg:mb-[24px] mb-[16px]">
          What are {pageData?.ticker} Loans?
        </h2>
        <div className="flex flex-wrap">
          <div className="w-1/2 pr-4">
            <p className="text-[#141414] lg:max-w-[775px] lg:text-[18px] text-[16px] leading-8 font-normal mb-[20px]">
              An {pageData?.name} loan (also referred to as {pageData?.name}
              -backed loan, {pageData?.ticker}-backed loan, {pageData?.name}{' '}
              loan, {pageData?.ticker} loan, crypto loan, or crypto-backed loan)
              is where you supply your {pageData?.ticker} as collateral for a
              loan, usually in the form of USD (or other fiat currency), a
              stablecoin (such as USD), or another crypto asset. An{' '}
              {pageData?.ticker}
              -backed loan allows borrowers to get liquidity of their{' '}
              {pageData?.ticker} without having to sell it. This means they will
              benefit from any price appreciation of {pageData?.ticker} even
              while they have the loan outstanding. Additionally, it can help
              borrowers avoid taxes which could be incurred when selling{' '}
              {pageData?.ticker}.
            </p>
            <p className="text-[#141414] lg:max-w-[775px] lg:text-[18px] text-[16px] leading-8  font-normal">
              {pageData?.ticker}-backed loans have grown in popularity in recent
              years and provide crypto owners a new source of liquidity for a
              variety of things.
            </p>
          </div>
          <div className="w-1/2 pl-8">
            <div className="px-[24px] py-[32px] bg-[#F9F9F9] border border-[#E2E2E2] rounded-[20px] mt-[56px]  md:gap-[24px] md:flex items-center w-full">
              <div className="h-[96px] w-[96px] mx-[auto] mb-[16px] md:mb-[0]">
                <Envelope />
              </div>
              <div className="">
                <h4 className="text-[24px] font-normal leading-8 text-[#141414] mb-[16px]  md:!text-left text-center">
                  Be one of the first to get a crypto-backed loan from Rocko
                </h4>
                <div className="md:flex items-center md:gap-[10px]">
                  <div className="md:max-w-[267px] w-full mb-[16px] md:mb-[0]">
                    <Input
                      placeholder="Enter Email Address"
                      className="w-full !py-[14px] outline-0 rounded-full !bg-[#fff] text-[#141414] text-[14px] font-normal placeholder-[#141414]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="md:max-w-[215px] w-full bg-[#006AFF] py-[14px] px-[24.6px] text-sm font-semibold rounded-full text-white hover:bg-[#6b3493] duration-500 uppercase"
                  >
                    Join the waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1242px] w-full lg:pt-[40px] pt-[20px] pb-[0] m-[auto] px-[15px]">
        <h2 className="defi lg:text-[40px] md:text-[35px] text-[22px] text-[#141414] leading-[56px] font-normal lg:mb-[24px] mb-[16px]">
          What Can You Do With a {pageData?.ticker}-Backed Loan?
        </h2>
        <div className="flex flex-wrap">
          <div className="w-1/2 pr-4">
            <div className="py-[25px]">
              <PayDownDebtIcon />
            </div>
            <h4 className="text-[#141414] w-4/5 text-[16px] sm:text-[20px] font-normal leading-7 lg:max-w-[775px]">
              Pay Down Higher-Rate Debt
            </h4>
            <p className="text-[#141414] lg:text-[18px] text-[16px] leading-8  font-normal lg:pt-[10px] pt-[10px] pb-[24px]">
              You can use your crypto loan to pay off your existing debt
              including including including including credit cards, student
              loans, or Crypto-backed loans provide a new source of liquidity
              for strategic refinancing.
            </p>
          </div>
          <div className="w-1/2 px-4">
            <div className="py-[25px]">
              <HouseIcon />
            </div>
            <h4 className="text-[#141414] w-4/5 text-[16px] sm:text-[20px] font-normal leading-7 lg:max-w-[775px]">
              Small and Large Purchases
            </h4>
            <p className="text-[#141414] lg:text-[18px] text-[16px] leading-8  font-normal lg:pt-[10px] pt-[10px] pb-[24px]">
              Whether you need funds for everyday purchases like groceries, gas,
              or utilities or you want to make a large purchase such as a new
              car, down payment on a house, or family vacation, crypto-backed
              loans can help cover the costs.
            </p>
          </div>
          <div className="w-1/2 pr-4">
            <div className="py-[25px]">
              <BusinessIcon />
            </div>
            <h4 className="text-[#141414] w-4/5 text-[16px] sm:text-[20px] font-normal leading-7 lg:max-w-[775px]">
              Starting or Expanding a Business
            </h4>
            <p className="text-[#141414] lg:text-[18px] text-[16px] leading-8  font-normal lg:pt-[10px] pt-[10px] pb-[24px]">
              For aspiring entrepreneurs, a crypto-backed loan may be provide
              the first capital to start a new business. Whether it’s product
              development, hiring staff, or purchasing inventory, crypto loans
              can be a method to access capital without a lengthy application
              process.
            </p>
          </div>
          <div className="w-1/2 px-4">
            <div className="py-[25px]">
              <MuchMoreIcon />
            </div>
            <h4 className="text-[#141414] w-4/5 text-[16px] sm:text-[20px] font-normal leading-7 lg:max-w-[775px]">
              And Much More
            </h4>
            <p className="text-[#141414] lg:text-[18px] text-[16px] leading-8  font-normal lg:pt-[10px] pt-[10px] pb-[0px]">
              For aspiring entrepreneurs, a crypto-backed loan may be provide
              the first capital to start a new business. Whether it’s product
              development, hiring staff, or purchasing inventory, crypto loans
              can be a method to access capital without a lengthy application
              process.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1242px] w-full lg:pt-[40px] pt-[20px] pb-[0] m-[auto] px-[15px]">
        <h2 className="defi lg:text-[40px] md:text-[35px] text-[22px] text-[#141414] leading-[56px] font-normal lg:mb-[24px] mb-[16px]">
          How Do DeFi Loans Work?
        </h2>
        <p className="text-[#141414] lg:text-[18px] text-[16px leading-8  font-normal mb-[20px]">
          DeFi lenders, usually referred to as DeFi lending protocols, are a
          novel concept for finance as they operate without the control of a
          centralized entity. Instead, they rely on smart contracts which
          contain self-executing code that enforces the logic of the protocol.
          For example, by supplying one type of crypto as collateral to a
          specific smart contract address, the same individual would be allowed
          to borrow a different type of crypto from a different address — with
          no credit check or lengthy application required. This innovative
          system allows individuals to interact with DeFi protocols in a
          permissionless fashion and without having to trust third-party
          intermediaries. Additionally, this may allow borrowers to avoid many
          traditional fees on loans when they borrow using a DeFi lending
          protocol.
        </p>
        <p className="text-[#141414] lg:text-[18px] text-[16px leading-8  font-normal">
          There are a variety DeFi lending protocols across blockchain networks
          with different offerings. For instance, some offer floating-rate
          interest loans where the rates can fluctuate each second. These loans
          typically have an undefined loan term so borrowers can keep the loan
          out for as little or as long as they like. Other lending protocols
          offer fixed-rate loans with defined loan terms. DeFi can be confusing
          but Rocko is designed to help consumers easily navigate this new
          financial world and quickly access competitive rate loans from popular
          DeFi protocols.
        </p>
      </div>
      <div className="max-w-[1242px] w-full lg:pt-[40px] pt-[20px] pb-[80px] m-[auto] px-[15px]">
        <h2 className="defi lg:text-[40px] md:text-[35px] text-[22px] text-[#141414] leading-[56px] font-normal lg:mb-[24px] mb-[16px]">
          Using Rocko to Get a Crypto Loan
        </h2>
        <div className="flex flex-wrap">
          <div className="w-1/2 pr-4">
            <p className="text-[#141414] lg:text-[18px] text-[16px leading-8  font-normal mb-[20px]">
              Rocko is a new platform that enables individuals to easily borrow
              from DeFi protocols. Users can set up their loan in minutes —
              without needing any DeFi expertise or a prior Ethereum wallet.
              With Rocko, you can compare DeFi protocols and interest rates and
              choose the best option for you.
            </p>
            <p className="text-[#141414] lg:text-[18px] text-[16px leading-8  font-normal mb-[20px]">
              With Rocko, you can set up your ideal loan and choose the amount,
              how much collateral to post, and where to receive the funds. Once
              a loan is finalized, you'll receive a non-custodial Rocko smart
              wallet that automatically interacts with the DeFi protocol to
              fullfill and transfer the loan to wallet or account you specified.
              Because Rocko wallet are non-custodial, only you have access to
              the private key for your wallet and can control any funds held
              inside. For added convenience, Rocko allows users to link their
              accounts at centralized exchanges, such as Coinbase, to simplify
              the process of supplying the collateral and receiving the loan.
            </p>
            <p className="text-[#141414] lg:text-[18px] text-[16px leading-8  font-normal">
              Rocko also provides a loan management dashboard and tools like sms
              and email alerts so you can stay on top of important metrics and
              better manage your loan and collateral. Learn more about Rocko on
              our{' '}
              <Link
                to="/"
                className="!text-[#2C3B8D] hover:!text-[#2C3B8D] underline decoration-1 hover:decoration-1 hover:underline"
              >
                homepage.
              </Link>
            </p>
          </div>
          <div className="w-1/2 pl-16">
            <HowItWorksIcon />
          </div>
        </div>
      </div>
      <div className="banner bg-[#081D21] lg:pt-[98px] pt-[50px] px-[16px]  pb-[32px]   text-center">
        <Title title="Be one of the first to get a crypto-backed loan using Rocko" />
        <FormWrapper className="lg:mt-[32px] mt-[24px]">
          <Input
            placeholder="Type your email here"
            className="!bg-[#fff] text-[16px] font-normal mb-[32px] max-w-[448px] w-full outline-0 mx-[auto] text-[#141414] placeholder-[#141414]"
          />
          <button
            type="submit"
            className=" uppercase text-[#006AFF] bg-white py-[14px] px-[32px] text-sm font-semibold rounded-full"
          >
            Join the waitlist
          </button>
        </FormWrapper>
      </div>
    </>
  )
}
