import React from 'react'
import Layout from '../layout'
import FAQ from '../components/pages/Homepage/FAQ'
import { faqPageData } from '../mock/data'
import Seo from '../components/seo'

export function Head() {
  return (
    <Seo
      title="FAQ for Rocko"
      description="Frequently asked questions on Rocko, crypto-backed loans, DeFi, and more."
    />
  )
}

export default function FaqPage() {
  return (
    <Layout>
      <FAQ items={faqPageData} className="bg-[#fff] more-faq" />
    </Layout>
  )
}
