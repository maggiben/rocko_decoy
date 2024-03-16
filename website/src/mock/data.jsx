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
    answer: () => <>More info on fees will be shared closer to launch.</>,
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
          to="/why-defi"
          className="text-[#545454] hover:text-[#545454] underline decoration-1 hover:decoration-1 hover:underline"
        >
          here
        </Link>
        .
      </>
    ),
  },
]

const faqPageData = [
  {
    id: '1',
    ques: 'Is Rocko a lender?',
    answer: () =>
      'No, Rocko is not a lender. Rocko is a technology platform that simplifies borrowing from popular Defi protocols like Compound.',
  },

  {
    id: '3',
    ques: 'Does Rocko charge a fee?',
    answer: () => <>More info on fees will be shared closer to launch.</>,
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
          to="/why-defi"
          className="!text-[#2C3B8D] hover:!text-[#2C3B8D] underline decoration-1 hover:decoration-1 hover:underline"
        >
          here
        </Link>
        .
      </>
    ),
  },
  {
    id: '6',
    ques: 'Which DeFi protocols can I borrow from using Rocko?',
    answer: () =>
      'All Rocko users can borrow USDC. Rocko users with a Coinbase or Gemini account in the U.S. can opt to have their USDC loan automatically converted into USD. Rocko is working to provide this feature to more users.',
  },
  {
    id: '7',
    ques: 'Do all loans require over-collateralization?',
    answer: () =>
      'Yes, Compound III currently requires all loans to be over-collateralized, meaning that the value of the collateral pledged is more than the loan. This is not expected to change.',
  },
  {
    id: '8',
    ques: 'Is a credit check required?',
    answer: () =>
      'No. No credit check is required to receive a loan using Rocko.',
  },
  {
    id: '9',
    ques: 'Will getting a DeFi loan using Rocko impact my credit score?',
    answer: () => 'No, it will not impact your credit score.',
  },
  {
    id: '10',
    ques: 'Was it the maximum amount I can borrow?',
    answer: () =>
      'The maximum amount you can borrow is determined by the value of your collateral and Compound’s available liquidity for the loan asset. Generally, the amount of available liquidity for USDC is in the millions of dollars.',
  },
  {
    id: '11',
    ques: 'How is the interest rate determined?',
    answer: () => (
      <>
        Lending protocols like Compound use formulas based on supply and demand
        to calculate interest rates. Learn more{' '}
        <Link
          to="https://rocko.co/learn/what-is-a-floating-interest-rate-in-defi"
          className="!text-[#2C3B8D] hover:!text-[#2C3B8D] underline decoration-1 hover:decoration-1 hover:underline"
        >
          here
        </Link>
        .
      </>
    ),
  },
  {
    id: '12',
    ques: 'What happens if I don’t repay my loan?',
    answer: () => (
      <>
        If your loan exceeds the maximum allotted loan-to-value ratio, whether
        through not repaying it or another reason, your collateral will be
        liquidated (i.e. sold for USDC) and Compound will take a fee. To learn
        more about liquidation and how to avoid it, read more{' '}
        <Link
          to="https://rocko.co/learn/defi-loans-what-is-collateral-liquidation/"
          className="!text-[#2C3B8D] hover:!text-[#2C3B8D] underline decoration-1 hover:decoration-1 hover:underline"
        >
          here
        </Link>{' '}
        .
      </>
    ),
  },
  {
    id: '13',
    ques: 'What are the tax implications of getting a DeFi loan through Rocko?',
    answer: () =>
      'Generally, using your crypto as collateral for a loan is not considered a taxable event as long as your crypto is not sold or exchanged. The tax implications for wrapping tokens — such as ETH for WETH — is unclear, as the IRS has not issued specific guidelines on this topic. This content is for informational purposes only and is not tax or legal advice. Please consult your tax advisor for further guidance.',
  },
  {
    id: '14',
    ques: 'Does Rocko custody or have control over my funds?',
    answer: () =>
      'No, Rocko smart wallets are non-custodial meaning only you have control over any funds held inside. When you deposit collateral for a loan, it is held in a smart contract for that specific DeFi lending protocol.',
  },
  {
    id: '15',
    ques: 'Can I export my private key?',
    answer: () =>
      'Yes, you are able to export your private key through your account sign-in modal.',
  },
]

export { faqs, faqPageData }
