import { loneContext } from '@/context/loanContext/loanContext';
import { ContextValues } from '@/types/type';
import { useContext } from 'react';

const useLoanData = (): ContextValues => useContext<ContextValues>(loneContext);

export default useLoanData;
