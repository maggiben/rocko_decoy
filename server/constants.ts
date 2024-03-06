// URLs
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'
export const BACKEND_URL = process.env.BACKEND_URL; 
// todo move this to env
export const SLACK_WEBHOOK_URL = CLIENT_URL === "https://develop.testnet.rocko.co" ? 'https://hooks.slack.com/services/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' : 'https://hooks.slack.com/services/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'; // process.env.SLACK_WEBHOOK_URL;

// Databse
export const ROCKO_DB_HOST = process.env.ROCKO_DB_HOST;
export const ROCKO_DB_USER = process.env.ROCKO_DB_USER;
export const ROCKO_DB_PASSWORD = process.env.ROCKO_DB_PASSWORD;
export const ROCKO_DB_DATABASE = process.env.ROCKO_DB_DATABASE;

// Compliance
const sanc = ['cu', 'ir', 'kp', 'ru', 'sy', 'ua'];
const nonCompSanc = [
  'AF',
  'BY',
  'MM',
  'CF',
  'CD',
  'CI',
  'ET',
  'IQ',
  'LB',
  'LR',
  'LY',
  'ML',
  'NI',
  'SO',
  'SS',
  'SD',
  'VE',
  'YE',
  'ZW',
];
const balkans = ['AL', 'BA', 'ME', 'XK', 'MK', 'RS'];

export const BLACKLIST_COUNTRY_CODES = [...sanc, ...nonCompSanc, ...balkans].map(
    (c) => c.toUpperCase(),
  );

// Third Party Keys
export const VPNAPI_KEY = process.env.VPNAPI_KEY;
export const COINBASE_CLIENT_ID = process.env.COINBASE_CLIENT_ID;
export const COINBASE_CLIENT_SECRET = process.env.COINBASE_CLIENT_SECRET;
export const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
export const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID; 
