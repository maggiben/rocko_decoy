'use client';

import Card from '@/components/Card';
import CardDataRow from '@/components/Card/CardDataRow';
import Divider from '@/components/Divider';
import Collateral from '@/components/pages/BorrowMore/Collateral';
import CollateralParameters from '@/components/pages/BorrowMore/CollateralParameters';
import BorrowMoreModal from '@/components/chips/BorrowMoreModal/BorrowMoreModal';
import ModalContainer from '@/components/chips/ModalContainer/ModalContainer';
import CurrentBalance, {
  Balance,
} from '@/components/pages/BorrowMore/CurrentBalance';
import Rewards from '@/components/pages/BorrowMore/Rewards';
import React, { useState } from 'react';
import CoinRow from '@/components/pages/BorrowMore/CoinRow';

const currentBalance: Balance = {
  symbol: 'USDC',
  balance: '1,012.13',
  dateOpened: 'March 11, 2023',
  interestAccrued: '12.13 USDC',
  currentApr: '3.84%',
  averageApr: '3.84%',
};

export default function BorrowerMorePage() {
  const [openModalFor, setOpenModalFor] = useState('');

  return (
    <main className="w-full px-[28px] sm:px-[42px] py-[40px] mx-auto">
      <p className="text-base">Loan with Compound Finance</p>
      {openModalFor === 'Borrow More' && (
        <ModalContainer>
          <BorrowMoreModal
            setOpenModalFor={setOpenModalFor}
            currentBalance=""
            collateral=""
            continueLink="/borrow-more/borrow-payment"
          />
        </ModalContainer>
      )}
      <div className="mt-[28px]">
        <CoinRow />
      </div>
      <section className="flex gap-4 lg:gap-10 my-6 flex-col sm:flex-row ">
        <div className="w-full flex flex-col gap-6">
          <CurrentBalance
            borrowMoreClick={() => setOpenModalFor('Borrow More')}
            data={currentBalance}
          />
          <Collateral />
        </div>
        <div className="flex flex-col w-full sm:max-w-sm gap-6">
          <CollateralParameters />
          <Rewards />
        </div>
      </section>
    </main>
  );
}
