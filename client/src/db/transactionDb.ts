/* eslint-disable import/prefer-default-export */
import axiosInterceptor from '@/utility/axiosInterceptor';
import { BACKEND_URL } from '@/constants/env';
import logger from '@/utility/logger';

export const getTransactions = async (user: string) => {
  console.log('user: ', user);
  if (user) {
    try {
      const response = await axiosInterceptor.get(
        `${BACKEND_URL}/comp/transactions?user=${user}`,
      );
      return response.data;
    } catch (error) {
      logger(JSON.stringify(error, null, 2), 'error');
      return null;
    }
  }
};
