import { BACKEND_URL } from '@/constants/env';
import logger from '@/utility/logger';
import axiosInterceptor from './axiosInterceptor';

// Transaction compliance check
const transactionComp = async ({
  transactionHash,
  destinationAddress = '0xX',
}: {
  transactionHash: string;
  destinationAddress?: string;
}) => {
  try {
    const transactionCompliance = await axiosInterceptor.post(
      `${BACKEND_URL}/comp/transaction`,
      {
        transaction_hash: transactionHash,
        destination_address: destinationAddress,
      },
    );

    return transactionCompliance;
  } catch (e) {
    logger(`Failed to send transaction to compliance: ${e}`);
  }
  return null;
};

export default transactionComp;
