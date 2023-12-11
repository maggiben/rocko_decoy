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
      ' Compound is a lending protocol built on the Ethereum network. It allows users to borrow and lend crypto assets in a permissionless and transparent manner.',
  },
  {
    id: '3',
    ques: 'Does Rocko charge a fee?',
    answer: () => (
      <>
        Yes, there will be a fee to use the Rocko platform. More info on fees
        will be shared closer to launch.
        {/* <Link to="https://rocko.co/why-defi" className="text-[#006AFF] underline decoration-1">
          here
        </Link> */}
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
        users can experience loss of funds in the event of software bugs or
        exploits. Learn more about the benefits and risks of DeFi borrowing{' '}
        <Link
          to="https://rocko.co/why-defi"
          className="text-[#545454] hover:text-[#545454] underline decoration-1 hover:decoration-1 hover:underline"
        >
          here
        </Link>
        .
      </>
    ),
  },
]

export default faqs
