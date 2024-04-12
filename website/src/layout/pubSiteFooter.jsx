import React from 'react'
import { Link } from 'gatsby'
import LogoIcon from '../assets/images/logo.png'

export default function PageFooter() {
  const companyFooterItems = [
    { labelText: 'About us', location: '/about' },
    { labelText: 'Contact', location: '/contact-us' },
  ]

  const learnFooterItems = [
    { labelText: 'FAQ', location: '/faq' },
    { labelText: 'Why DeFi', location: '/why-defi' },
    { labelText: 'Learn Resource Center', location: '/learn' },
    { labelText: "Rocko How To's", location: '/learn/#rocko-how-tos' },
  ]

  const legalFooterItems = [
    { labelText: 'Terms of Service', location: '/terms' },
    { labelText: 'Privacy Policy', location: '/privacy' },
  ]

  const cryptoFooterItems = [
    { labelText: 'Eth Loans', location: '/crypto-loan/eth-loan' },
  ]

  return (
    <div className="footer bg-[#fff] w-full lg:pt-[50px] pt-[50px] px-[16px]  pb-[32px]   text-center">
      <div className="flex justify-between w-full h-[268px]">
        <div className="w-full w-1/5">
          <Link to="/" className="w-64 h-52 inline-block">
            <img
              src={LogoIcon}
              alt="Rocko logo"
              className="sm-w-[100px] md:w-[100px]"
              style={{ maxWidth: '100px' }}
            />
          </Link>
          <p>© Copyright 2024</p>
        </div>
        <div className="w-full w-1/5 flex flex-col">
          <h4 className="text-[#141414] text-[16px] sm:text-[20px] font-normal leading-7 lg:max-w-[775px]">
            Company
          </h4>
          <div className="width-full">
            {companyFooterItems.map(item =>
              item.location ? (
                <Link
                  to={item.location}
                  key={item.labelText}
                  className="width-full block text-[#545454] text-[16px] hover:text-[#6b3493] duration-200 px-[0px]"
                >
                  {item.labelText}
                </Link>
              ) : null,
            )}
          </div>
        </div>
        <div className="w-full w-1/5">
          <h4 className="text-[#141414] w-4/5 text-[16px] sm:text-[20px] font-normal mx-auto leading-7 lg:max-w-[775px]">
            Learn
          </h4>
          <div className="width=full">
            {learnFooterItems.map(item =>
              item.location ? (
                <Link
                  to={item.location}
                  key={item.labelText}
                  className="items-start width-full block  text-[#545454] text-[16px] hover:text-[#6b3493] duration-200 px-[0px]"
                >
                  {item.labelText}
                </Link>
              ) : null,
            )}
          </div>
        </div>
        <div className="w-full w-1/5">
          <h4 className="text-[#141414] w-4/5 text-[16px] sm:text-[20px] font-normal mx-auto leading-7 lg:max-w-[775px]">
            Legal
          </h4>
          <div className="width=full">
            {legalFooterItems.map(item =>
              item.location ? (
                <Link
                  to={item.location}
                  key={item.labelText}
                  className="items-start width-full block text-[#545454] text-[16px] hover:text-[#6b3493] duration-200 px-[0px]"
                >
                  {item.labelText}
                </Link>
              ) : null,
            )}
          </div>
        </div>
        <div className="w-full w-1/5">
          <h4 className="text-[#141414] w-4/5 text-[16px] sm:text-[20px] font-normal mx-auto leading-7 lg:max-w-[775px]">
            Crypto-Backed Loans
          </h4>
          <div className="width=full">
            {cryptoFooterItems.map(item =>
              item.location ? (
                <Link
                  to={item.location}
                  key={item.labelText}
                  className="items-start width-full block text-[#545454] text-[16px] hover:text-[#6b3493] duration-200 px-[0px]"
                >
                  {item.labelText}
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
