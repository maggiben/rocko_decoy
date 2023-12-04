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
import { faqs } from '../mock/data' // eslint-disable-line
import getBorrowApr from '../utils/getBorrowApr.ts'

export default function Homepage() {
  const [borrowApr, setBorrowApr] = React.useState('...')
  useEffect(async () => {
    setBorrowApr(`${(await getBorrowApr()).toFixed(2)}%`)
  }, [])
  return (
    <Layout>
      <Header
        title={`Crypto-backed loans as low as ${borrowApr}¹`}
        subTitle="Receive USD² or USDC using your crypto holdings as collateral."
        description="¹Interest rates are offered by Compound lending protocol and fluctuate
        in real-time based on market forces. The rate displayed may delayed by
        up to 5 minutes. ²USD is only available to U.S. Coinbase or Gemini
        users at this time. All users can convert their USDC loan into USD or
        other fiat via crypto exchanges."
      />
      <div className="flex justify-center items-center bg-[#FCFCFC] lg:py-[100px] py-[50px] border-b border-[#E2E2E2]">
        <div>
          <span className="text-[#141414] lg:text-[64px] md:text-[40px] text-[25px] font-normal">
            $15M+
          </span>
          <p className="text-[#141414] text-[16px] font-normal">
            loans fulfilled through Rocko
          </p>
        </div>
      </div>
      <CryptoHolding />
      <SecurityFirstCard />
      <ComprehensiveLoanDashboard />
      <CollateralAssets />
      <HowItWorks />
      <InClassFeatures />
      <FAQ items={faqs} />
      <Header
        title="Be one of the first to get crypto-backed loan through Rocko"
        description="*USD only available to U.S. Coinbase or Gemini users at this time. All users can convert their USDC loan into USD or other fiat via crypto exchanges."
      />
      <div className="bg-[#081D21] text-center text-[#ffffff66]">
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
