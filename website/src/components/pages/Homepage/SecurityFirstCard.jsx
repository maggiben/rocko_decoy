import React from 'react'
import VerifiedIcon from '../../../assets/svg-icons/verified.svg'
import walletIcon from '../../../assets/svg-icons/wallet.svg'
import AccountBalanceIcon from '../../../assets/svg-icons/account_balance.svg'
import DataIconCard from './DataIconCard'

function SecurityFirstCard() {
  return (
    <div className="bg-[#FCFCFC] lg:py-[100px] py-[50px] border-b border-t border-[#E2E2E2]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start lg:gap-[30px] md:gap-[25px] gap-[20px] sm:flex-wrap lg:flex-nowrap md:max-:flex">
          <div>
            <h2 className="lg:text-[48px] md:text-[35px] text-[22px] lg:max-w-[370px] max-w-[100%] tracking-normal text-[#141414]">
              Security-First Design
            </h2>
          </div>
          <div className="flex justify-between items-start lg:gap-[25px] gap-[20px] sm:flex-wrap md:flex-nowrap ">
            <DataIconCard
              className="sm:max-w-[272px]  max-w-[100%] w-full"
              cardHeading="Audited DeFi Protocols Only"
              CardContent="Rocko only supports lending protocols that have undergone third-party security audits."
              icon={VerifiedIcon}
            />
            <DataIconCard
              className="sm:max-w-[272px]  max-w-[100%] w-full"
              cardHeading="Non-Custodial"
              CardContent="Rocko wallets are non-custodial, meaning only you have access to any funds held in them. "
              icon={walletIcon}
            />
            <DataIconCard
              className="sm:max-w-[272px]  max-w-[100%] w-full"
              cardHeading="Passkeys Protection"
              CardContent="Leverage Passkeys for greater security when authorizing transactions."
              icon={AccountBalanceIcon}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityFirstCard
