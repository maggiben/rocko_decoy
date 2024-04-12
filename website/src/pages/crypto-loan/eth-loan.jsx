import React from 'react'
import Layout from '../../layout'
import CryptoLoanTemplate from '../../components/crypto-loan-layout'
import EthIcon from '../../assets/coins/ETH.svg'

const pageData = {
  title: 'Ethereum Loans',
  name: 'Ethereum',
  ticker: 'ETH',
  icon: <EthIcon />,
}

export default function EthPage() {
  return (
    <Layout>
      <CryptoLoanTemplate pageData={pageData} />
    </Layout>
  )
}
