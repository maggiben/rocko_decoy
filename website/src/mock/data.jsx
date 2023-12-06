import { Link } from 'gatsby'
import React from 'react'

const faqs = [
  {
    id: '1',
    ques: 'Is Rocko a lender?',
    answer: () =>
      'No, Rocko is not a lender. Rocko is a technology platform that simplifies borrowing from popular Defi protocols like Compound.',
  },
  {
    id: '2',
    ques: 'What is Compound?',
    answer: () =>
      'Compound is a lending protocol built on the Ethereum network. It allows users to borrow and lend crypto assets in permissionelss and transparent manner.',
  },
  {
    id: '3',
    ques: 'Does Rocko charge a fee?',
    answer: () => (
      <>
        Yes, Rocko charges a service fee on all loans facilitated by Rocko
        wallets. The service fee is based on the loan amount and helps Rocko
        cover operational costs as well as network fees from facilitating your
        loan. More info on fees can be found{' '}
        <Link to="/" className="text-[#006AFF]">
          here
        </Link>
        .
      </>
    ),
  },
  {
    id: '4',
    ques: 'Which crypto assets can I use as collateral for my loan?',
    answer: () =>
      'Rocko only supports Ether (ETH) as collateral at this time but is working to support new collateral assets.',
  },
  {
    id: '5',
    ques: 'What are the benefits and risks of crypto loans from DeFi protocols vs. traditional loans?',
    answer: () => (
      <>
        Generally, DeFi protocols can offer greater transparency, more flexible
        loan terms, and lower rates than many traditional lenders. However,
        users can suffer from loss of funds in the event of software bugs or
        exploits. Learn more about the benefits and risks of DeFi borrowing{' '}
        <Link to="/" className="text-[#006AFF]">
          here
        </Link>
        .
      </>
    ),
  },
]

export default faqs
