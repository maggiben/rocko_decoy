import axios from 'axios';
import { BACKEND_URL } from '@/constants/env';
import { publicIp } from 'public-ip';
import logger from '@/utility/logger';

export const useUserDB = () => {
  const addUser = (
    auth0_id: string,
    email: string,
    wallet_address: string,
    active: boolean,
  ) => {
    const userObject = {
      auth0_id,
      email,
      wallet_address,
      active: Number(active),
    };
    axios.post(`${BACKEND_URL}/addUser`, userObject).then((res) => {
      console.log(res.data);
    });
  };

  const getUserData = async (email: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users`, {
        email: email
      });
      return response.data;
    } catch (error) {
      logger(`Cannot Get UserData: ${JSON.stringify(error, null, 2)}`);
      return null;
    }
  };

  const getUserId = async (email: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/userid`, {
        email: email
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
      const response = await axios.post(`${BACKEND_URL}/vpn`, {
        ip: ip
      });

      return response;
    } catch (error: any) {
      return error.response;
    }
  };

  const isInActive = async (email: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users`, {
        email: email
      });

      return response.data.length > 0 ? response.data[0].inactive : null;
    } catch (error: any) {
      logger(`Cannot Get InActive Status: ${JSON.stringify(error, null, 2)}`);
      return null;
    }
  };

  const isReadOnly = async (email: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users`, {
        email: email
      });

      console.log(response)

      return response.data.length > 0 ? response.data[0].readonly : null;
    } catch (error: any) {
      logger(`Cannot Get ReadOnly Status: ${JSON.stringify(error, null, 2)}`);
      return null;
    }
  };

  return {
    addUser,
    getUserData,
    getUserId,
    isVPN,
    isInActive,
    isReadOnly,
  };
};
