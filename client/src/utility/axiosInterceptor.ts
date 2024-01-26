import axios from 'axios';

const axiosInterceptor = axios.create();

// TODO parse oauth token
const getAccessToken = () => 'super-cali-fragil-istic-expi-ali-doscious';

axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request sent with Bearer Auth');
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInterceptor;
