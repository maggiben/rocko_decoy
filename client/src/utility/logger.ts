type LogLevel = 'info' | 'error' | 'warn';

const logger = (message: string, level: LogLevel = 'info'): void => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log({ message, level });
  } else {
    fetch('/api/logger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, level }),
    });
  }
};

export default logger;
