import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import ComprehensiveLoanDashboard from '../components/pages/Homepage/ComprehensiveLoanDashboard'
import CryptoHolding from '../components/pages/Homepage/CryptoHolding/CryptoHolding'
import FAQ from '../components/pages/Homepage/FAQ'
import HowItWorks from '../components/pages/Homepage/HowItWorks/HowItWorks'
// import RockoStats from '../components/pages/Homepage/RockoStats'
import InClassFeatures from '../components/pages/Homepage/InClassFeatures/InClassFeatures'
import SecurityFirstCard from '../components/pages/Homepage/SecurityFirstCard'
import Header from '../components/pages/Homepage/Header'
import CollateralAssets from '../components/pages/Homepage/CollateralAssets/CollateralAssets'
import Seo from '../components/seo'
import Layout from '../layout'
import faqs from '../mock/data'
import getBorrowApr from '../utils/getBorrowApr.ts'

export function Head() {
  return <Seo />
}

export default function Homepage() {
  const [borrowApr, setBorrowApr] = React.useState('...')
  const inBrowser = typeof window !== 'undefined'
  const handleGetBorrowerApr = async () => {
    if (inBrowser) {
      const apr = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
      }).format((await getBorrowApr()) / 100)
      sessionStorage.setItem('borrowApr', apr)
      setBorrowApr(apr)
    }
  }

  useEffect(() => {
    handleGetBorrowerApr()
  }, [])

  return (
    <Layout>
      <Header
        title={`Crypto-backed loans as low as ${
          (inBrowser && sessionStorage.getItem('borrowApr')) || borrowApr
        }¹`}
        subTitle="Receive USD² or USDC using your crypto holdings as collateral. Be one of the first to get early access."
        description="¹Interest rates are offered by Compound III lending protocol and fluctuate
        in real-time based on market forces. The rate displayed may be delayed."
        content="²USD is only available to U.S. Coinbase or Gemini
        users at this time. All users can convert their USDC loan into USD or
        other fiat via crypto exchanges."
      />
      {/* <RockoStats /> */}
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
