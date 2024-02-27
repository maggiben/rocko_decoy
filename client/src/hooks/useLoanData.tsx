import { loanContext } from '@/context/loanContext/loanContext';
import { ContextValues } from '@/types/type';
import { useContext } from 'react';

const useLoanData = (): ContextValues => useContext<ContextValues>(loanContext);

export default useLoanData;
