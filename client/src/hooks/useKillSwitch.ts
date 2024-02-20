'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import logger from '@/utility/logger';
import { BACKEND_URL } from '@/constants/env';

export default () => {
  const [loansPaused, setLoansPaused] = useState(false);
  const [transactionsPaused, setTransactionsPaused] = useState(false);
  const getKillSwitch = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/comp/platform-status`);
      setLoansPaused(!!response.data.loan_booking_blocked);
      setTransactionsPaused(!!response.data.transactions_blocked);
    } catch (error: any) {
      logger(`Kill Switch active: ${JSON.stringify(error, null, 2)}`, 'error');
      setLoansPaused(!!error?.response?.data.loan_booking_blocked);
      setTransactionsPaused(!!error?.response?.data.transactions_blocked);
    }
  }, [setLoansPaused, setTransactionsPaused]);

  useEffect(() => {
    getKillSwitch();
  });

  return { loansPaused, transactionsPaused };
};
