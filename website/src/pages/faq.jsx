import React from 'react'
import Layout from '../layout'
import FAQ from '../components/pages/Homepage/FAQ'
import { faqPageData } from '../mock/data'

export default function FaqPage() {
  return (
    <Layout>
      <FAQ items={faqPageData} className="bg-[#fff] more-faq" />
    </Layout>
  )
}
