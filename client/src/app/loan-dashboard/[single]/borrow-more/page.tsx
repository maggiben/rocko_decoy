'use client';

import { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import SummaryComp from '@/components/chips/SummaryComp/SummaryComp';
import Footer from '@/components/chips/Footer/Footer';
import ModalContainer from '@/components/chips/ModalContainer/ModalContainer';
import LoanFinalized from '@/components/chips/LoanFinalized/LoanFinalized';
import useLoanData from '@/hooks/useLoanData';

const BorrowPayment: FC = () => {
  const { single: loanId } = useParams();
  const [isFinalized, setIsFinalized] = useState(false);

  const { loanData } = useLoanData();

  const onContinue = () => {
    window.sessionStorage.setItem('loanData', JSON.stringify(loanData));

    setIsFinalized(true);
  };

  return (
    <>
      <div className="mb-[60px]">
        <SummaryComp
          title="Loan Increase"
          subTitle="You're borrowing more with your current loan"
          invoiceTitle="Summary"
          category="borrow_more"
        />
      </div>
      <Footer loanId={Number(loanId)} setIsFinalized={onContinue} />
      {isFinalized && (
        <ModalContainer>
          <LoanFinalized navType="add" />
        </ModalContainer>
      )}
    </>
  );
};

export default BorrowPayment;
