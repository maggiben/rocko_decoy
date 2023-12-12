import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import ComprehensiveLoanDashboard from '../components/pages/Homepage/ComprehensiveLoanDashboard'
import CryptoHolding from '../components/pages/Homepage/CryptoHolding/CryptoHolding'
import FAQ from '../components/pages/Homepage/FAQ'
import HowItWorks from '../components/pages/Homepage/HowItWorks/HowItWorks'
import InClassFeatures from '../components/pages/Homepage/InClassFeatures/InClassFeatures'
import SecurityFirstCard from '../components/pages/Homepage/SecurityFirstCard'
import Header from '../components/pages/Homepage/Header'
import CollateralAssets from '../components/pages/Homepage/CollateralAssets/CollateralAssets'
import Layout from '../layout'
import faqs from '../mock/data'
import getBorrowApr from '../utils/getBorrowApr.ts'

export default function Homepage() {
  const [borrowApr, setBorrowApr] = React.useState('...')

  const handleGetBorrowerApr = async () => {
    const apr = await getBorrowApr()
    setBorrowApr(`${apr.toFixed(2)}%`)
  }

  useEffect(() => {
    handleGetBorrowerApr()
  }, [])

  return (
    <Layout>
      <Header
        title={`Crypto-backed loans as low as ${borrowApr}¹`}
        subTitle="Receive USD² or USDC using your crypto holdings as collateral. Be one of the first to get early access."
        description="¹Interest rates are offered by Compound lending protocol and fluctuate
        in real-time based on market forces. The rate displayed may delayed by
        up to 5 minutes."
        content="²USD is only available to U.S. Coinbase or Gemini
        users at this time. All users can convert their USDC loan into USD or
        other fiat via crypto exchanges."
      />
      <section className="bg-[#FCFCFC] lg:py-[100px] py-[50px] border-b border-[#E2E2E2]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-x-[8px] md:!flex-nowrap flex-wrap  ">
            <div className="md:border-l-[1px] border-[#E2E2E2] lg:pl-[40px] md:pl-[16px] md:max-w-[330px] w-full mb-[20px] md:mb-[0]">
              <span className="text-[#141414] lg:text-[64px] md:text-[40px] text-[25px] font-normal leading-7 md:leading-[64px]">
                $15
                <span className="lg:text-[40px] md-[25px] text-[16px]">M</span>
              </span>
              <p className="text-[#141414] text-[16px] font-normal leading-7">
                loans fulfilled through Rocko
              </p>
            </div>
            <div className="md:border-l-[1px] border-[#E2E2E2] lg:pl-[40px] md:pl-[16px] md:max-w-[330px] w-full mb-[20px] md:mb-[0]">
              <span className="text-[#141414] lg:text-[64px] md:text-[40px] text-[25px] font-normal leading-7 md:leading-[64px]">
                5.45%
              </span>
              <p className="text-[#141414] text-[16px] font-normal leading-7">
                average APR since launch
              </p>
            </div>
            <div className="md:border-l-[1px] border-[#E2E2E2] lg:pl-[40px] md:pl-[16px] md:max-w-[330px] w-full ">
              <span className="text-[#141414] lg:text-[64px] md:text-[40px] text-[25px] font-normal leading-7 md:leading-[64px]">
                $18,000
              </span>
              <p className="text-[#141414] text-[16px] font-normal leading-7">
                Average loan size
              </p>
            </div>
          </div>
        </div>
      </section>

      <CryptoHolding />
      <SecurityFirstCard />
      <ComprehensiveLoanDashboard />
      <CollateralAssets />
      <HowItWorks />
      <InClassFeatures />
      <FAQ items={faqs} />
      <Header
        title="Be one of the first to get a crypto-backed loan using Rocko"
        // description="*USD only available to U.S. Coinbase or Gemini users at this time. All users can convert their USDC loan into USD or other fiat via crypto exchanges."
      />
      <div className="bg-[#081D21] text-center text-[#ffffff66] py-5">
        <Link
          to="/terms"
          variant="custom"
          className="lg:mb-[32px] mb-[20px] uppercase"
        >
          Terms of Service
        </Link>{' '}
        |{' '}
        <Link
          to="/privacy"
          variant="custom"
          className="lg:mb-[32px] mb-[20px] uppercase"
        >
          Privacy Policy
        </Link>
      </div>
    </Layout>
  )
}
