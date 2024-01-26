import axios from 'axios';

type LogLevel = 'info' | 'error' | 'warn';

const logger = (message: string, level: LogLevel = 'info'): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log({ message, level });
  } else {
    axios
      .post(
        '/api/logger',
        {
          message,
          level,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log('Log sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending log:', error);
      });
  }
};

export default logger;
