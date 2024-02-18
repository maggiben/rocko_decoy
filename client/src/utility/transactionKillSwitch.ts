import axios from 'axios';
import logger from './logger';
import { BACKEND_URL } from '@/constants/env';

const getTransactionBlocked = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/killswitch`);
    return !!response.data.transactions_blocked;
  } catch (error: any) {
    logger(`Kill Switch active: ${JSON.stringify(error, null, 2)}`, 'error');
    return !!error?.response?.data.transactions_blocked;
  }
};

export default getTransactionBlocked;
