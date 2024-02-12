import axiosInterceptor from '@/utility/axiosInterceptor';
import { BACKEND_URL } from '@/constants/env';
import { publicIp } from 'public-ip';
import logger from '@/utility/logger';

export const useUserDB = () => {
  const addUser = (email: string, wallet_address: string, active: boolean) => {
    const userObject = {
      email,
      wallet_address,
      active: Number(active),
    };
    axiosInterceptor.post(`${BACKEND_URL}/addUser`, userObject).then((res) => {
      console.log(res.data);
    });
  };

  const updateUser = async (email: string, phone: string) => {
    const userObject = {
      email,
      phone,
    };
    axiosInterceptor
      .post(`${BACKEND_URL}/updateUser`, userObject)
      .then((res) => {
        console.log(res.data);
      });
  };

  const getUserData = async (email: string) => {
    try {
      const response = await axiosInterceptor.post(`${BACKEND_URL}/users`, {
        email,
      });
      return response.data;
    } catch (error) {
      logger(`Cannot Get UserData: ${JSON.stringify(error, null, 2)}`);
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
      logger(`Cannot Get UserId: ${JSON.stringify(error, null, 2)}`);
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
      logger(`Cannot Get InActive Status: ${JSON.stringify(error, null, 2)}`);
      return null;
    }
  };

  const isReadOnly = async (email: string) => {
    try {
      const response = await axiosInterceptor.post(`${BACKEND_URL}/users`, {
        email,
      });

      console.log(response);

      return response.data.length > 0 ? response.data[0].readonly : null;
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
