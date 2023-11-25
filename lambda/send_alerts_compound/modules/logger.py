import logging

def create_logger(level="INFO"):
  # Set up logging
  logger = logging.getLogger('log')
  console_handler = logging.StreamHandler()

  # Set logging level
  if level == "INFO":
    logger.setLevel(logging.INFO)
    console_handler.setLevel(logging.INFO)
  else:
    logger.setLevel(logging.DEBUG)
    console_handler.setLevel(logging.DEBUG)

  formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
  console_handler.setFormatter(formatter)
  logger.addHandler(console_handler)

  return logger
