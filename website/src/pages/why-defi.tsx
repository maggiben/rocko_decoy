import React from 'react'
import Layout from '../layout'
import Banner from '../assets/images/banner.png'
import Envelope from '../assets/images/envelope.svg'
import DefiOffers from '../components/pages/Homepage/defiOffers'
import Input from '../components/Input'

export default function WhyDefi() {
  const data = [
    {
      id: '1.',
      title: 'Transparency',
      descriptions:
        'DeFi protocols are built on top of public blockchains which means all of their transactions are publicly visible. Because of this, borrowers and lenders can audit protocols and verify key metrics and their financial health at any time. This is in stark contrast to centralized platforms where lenders and borrowers of the platform may not have insight into its financial health, counterparty risk, or other key metrics. Unlike many centralized lending platforms, many of today’s most popular DeFi protocols survived the tumultuous period of 2022 as their code wouldn’t allow excessive risk.',
    },
    {
      id: '2.',
      title: 'Permissionless',
      descriptions:
        'DeFi protocols are permissionless meaning anyone can use them. This is key to the ethos of crypto in that a more open, fair, and inclusive financial system can be created and by doing so, value will flow to the users rather than traditional financial institutions. Today, DeFi lending protocols allow users to borrow with no defined loan terms, no hidden fees, and no cumbersome onboarding process. You can repay your loan or move your assets quickly and without asking for permission.',
    },
    {
      id: '3.',
      title: 'Lower Cost',
      descriptions:
        'DeFi protocols operate through smart contracts which are self-executing agreements that enforce the logic in their code. This means that essentially all functions are automated which significantly reduces the operational costs — allowing protocols to pass on cost savings to their users.',
    },
    {
      id: '4.',
      title: 'Non-Custodial',
      descriptions:
        'When borrowing from a DeFi protocol, crypto used as collateral is stored in non-custodial smart contracts. That means borrowers do not have to trust another person or company to hold their assets — they just need to trust the code, which is public and can’t be changed. In fact, many DeFi protocols undergo public audits of their code to verify their security and that the code does what it’s supposed to.',
    },
  ]
  const smartData = [
    {
      id: '1.',
      title: 'Smart-Contract Risk',
      descriptions:
        'Since DeFi protocols operate strictly based on their software code, any bug, flaw in the code, or malicious design, can lead to the protocols not working as designed, or malicious actors stealing funds held inside the smart contracts. While many DeFi protocols undergo extensive auditing to reduce the likelihood of a software bug or potential exploit, there is no guaranteed method to fully eliminate this risk. Users should research DeFi protocols that they intend to use so they can better understand the risks.',
    },
    {
      id: '2.',
      title: 'Regulatory Risk',
      descriptions:
        'For the most part, DeFi protocols do not currently operate under any regulatory body or government oversight. While there has been much discussion among various governments on how to regulate DeFi, much of how and when that will occur is unknown. Future changes could impact DeFi protocols and crypto assets held in them.',
    },
    {
      id: '3.',
      title: 'Lending model & interest rate risk',
      descriptions:
        'The models used for lending and determining interest rates vary based on the DeFi protocols. For instance, some allow for interest rates to spike when there is significant demand to borrow which could cause the borrower’s interest expense to unexpectedly increase. Prospective borrowers should research DeFi protocols lending and interest rate models to understand how they work and what the risks are before borrowing.',
    },
  ]
  return (
    <Layout>
      <div className="max-w-[675px] w-full lg:py-[80px] py-[40px] m-[auto] px-[15px]">
        <h2 className="defi lg:text-[64px] md:text-[35px] text-[22px] text-[#141414] leading-[56px] font-normal lg:mb-[40px] mb-[16px]">
          Why Defi?
        </h2>
        <div>
          <img src={Banner} alt="defi-banner" />
        </div>
        <div className="content">
          <p className="text-[#141414] lg:text-[18px] text-[16px leading-8  font-normal lg:pt-[44px] pt-[20px]">
            Decentralized Finance, or DeFi, is a new financial system being
            developed on public blockchains such as Ethereum. It offers many
            banking-type services such as the ability to earn interest on
            assets, borrow assets, and trade assets. It differs from traditional
            finance in that it is decentralized (meaning no central entity
            controls or manages it), peer-to-peer, and exclusively facilitates
            transactions involving digital assets.
          </p>
          <p className="text-[#141414] lg:text-[18px] text-[16px leading-8   font-normal lg:pt-[44px] pt-[20px]">
            Today, there are many DeFi protocols, or platforms, that offer
            banking-type services across different blockchains and with
            different value propositions. Asset-backed borrowing has emerged as
            a key use case with protocols allowing users to borrow using their
            crypto assets as collateral. For instance, users are able to borrow
            USDC from Compound using their Eth as collateral which allows them
            to get liquidity of their crypto holdings without having to sell.
          </p>
          <h3 className="defi text-[#141414] lg:text-[28px] md:text-[25px] text-[20px] leading-8 md:leading-9 font-normal md:my-[40px] my-[24px]">
            DeFi offers many benefits over traditional financial institutions
            including:
          </h3>
          {data.map((items, i) => {
            return (
              <>
                <DefiOffers
                  key={i}
                  description={items.descriptions}
                  title={items.title}
                  id={items.id}
                />
              </>
            )
          })}
          <h3 className="defi text-[#141414] lg:text-[28px] md:text-[25px] text-[20px] leading-8 md:leading-9 font-normal md:my-[40px] my-[24px]">
            While DeFi has many strong advantages over traditional finance, it's
            important to understand the risks when it comes to borrowing:
          </h3>
          {smartData.map((items, i) => {
            return (
              <>
                <DefiOffers
                  key={i}
                  description={items.descriptions}
                  title={items.title}
                  id={items.id}
                />
              </>
            )
          })}
          <p className="text-[#141414] lg:text-[18px] text-[16px leading-6 mf:leading-8 font-normal">
            Simply put, DeFi is an incredible innovation that has the power to
            transform all of our financial lives. While there are many benefits,
            it’s important to understand the risks before interacting with DeFi.
            Our mission is to help consumers access DeFi in a secure and simple
            manner, and get the most value from their crypto assets.
          </p>
        </div>
        <div className="px-[24px] py-[32px] bg-[#F9F9F9] border border-[#E2E2E2] rounded-[20px] mt-[56px]  md:gap-[24px] md:flex items-center w-full">
            <div className="h-[96px] w-[96px] mx-[auto] mb-[16px] md:mb-[0]" ><Envelope />
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
    </Layout>
  )
}
