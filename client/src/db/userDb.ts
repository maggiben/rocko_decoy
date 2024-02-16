/* eslint-disable import/prefer-default-export */
import { publicIp } from 'public-ip';
import axiosInterceptor from '@/utility/axiosInterceptor';
import { BACKEND_URL } from '@/constants/env';
import logger from '@/utility/logger';

export const useUserDB = () => {
  const addUser = (email: string, walletAddress: string, active: boolean) => {
    const userObject = {
      email,
      wallet_address: walletAddress,
      active: Number(active),
    };
    axiosInterceptor.post(`${BACKEND_URL}/addUser`, userObject).catch((e) => {
      logger(`Cannot addUser: ${JSON.stringify(e, null, 2)}`, 'error');
    });
  };

  const updateUser = async (email: string, phone: string) => {
    const userObject = {
      email,
      phone,
    };
    axiosInterceptor
      .post(`${BACKEND_URL}/updateUser`, userObject)
      .catch((e) => {
        logger(`Cannot updateUser: ${JSON.stringify(e, null, 2)}`, 'error');
      });
  };

  const getUserData = async (email: string) => {
    try {
      const response = await axiosInterceptor.post(`${BACKEND_URL}/users`, {
        email,
      });
      return response.data;
    } catch (error) {
      logger(`Cannot Get UserData: ${JSON.stringify(error, null, 2)}`, 'error');
      return null;
    }
  };

  const getUserId = async (email: string) => {
    try {
      const response = await axiosInterceptor.post(`${BACKEND_URL}/userid`, {
        email,
      });

      return response.data.length > 0 ? response.data[0].id : -1;
    } catch (error) {
      logger(`Cannot Get UserId: ${JSON.stringify(error, null, 2)}`, 'error');
      return null;
    }
  };

  const isVPN = async () => {
    try {
      const ip = await publicIp();
      const response = await axiosInterceptor.post(`${BACKEND_URL}/vpn`, {
        ip,
      });

      return response;
    } catch (error: any) {
      logger(`Cannot vpnRes: ${JSON.stringify(error, null, 2)}`, 'error');
      return error.response;
    }
  };

  const isInActive = async (email: string) => {
    try {
      const response = await axiosInterceptor.post(`${BACKEND_URL}/users`, {
        email,
      });

      return response.data.length > 0 ? response.data[0].inactive : null;
    } catch (error: any) {
      logger(
        `Cannot Get InActive Status: ${JSON.stringify(error, null, 2)}`,
        'error',
      );
      return null;
    }
  };

  const isReadOnly = async (email: string) => {
    try {
      const response = await axiosInterceptor.post(`${BACKEND_URL}/users`, {
        email,
      });

      return response?.data.length > 0 ? response?.data[0].readonly : null;
    } catch (error: any) {
      logger(`Cannot Get ReadOnly Status: ${JSON.stringify(error, null, 2)}`);
      return null;
    }
  };

  return {
    addUser,
    updateUser,
    getUserData,
    getUserId,
    isVPN,
    isInActive,
    isReadOnly,
  };
};
