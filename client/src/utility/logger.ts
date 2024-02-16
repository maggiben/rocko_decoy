import axios from 'axios';

type LogLevel = 'info' | 'error' | 'warn';

const messageCleaner = (message: string): string =>
  message
    .replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      'redacted@user.email',
    )
    .replace(/Bearer\s[^\s]+/g, 'Bearer [REDACTED]"');

const logger = (message: string, level: LogLevel = 'info'): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log({ message, level });
  } else {
    axios
      .post(
        '/api/logger',
        {
          message: messageCleaner(message),
          level,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('Log:', response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error sending log:', error);
      });
  }
};

export default logger;
