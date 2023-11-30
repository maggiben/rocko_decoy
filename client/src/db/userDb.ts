import axios from 'axios';
import { BACKEND_URL } from '@/constants/env';
import { publicIp } from 'public-ip';

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
      const response = await axios.get(`${BACKEND_URL}/users?email=${email}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getUserId = async (email: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/userid?email=${email}`);

      return response.data.length > 0 ? response.data[0].id : -1;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const isVPN = async () => {
    try {
      const ip = await publicIp();
      const response = await axios.get(`${BACKEND_URL}/vpn?ip=${ip}`);

      return response;
    } catch (error: any) {
      return error.response;
    }
  };

  return {
    addUser,
    getUserData,
    getUserId,
    isVPN,
  };
};
