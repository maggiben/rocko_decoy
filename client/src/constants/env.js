const params = new URLSearchParams(window.location.search);
const demoMode = params.get('demo_mode');
if (demoMode === 'true') {
  sessionStorage.setItem('IS_DEMO_MODE', 'true');
  console.log('DEMO MODE ENABLED');
}

const IS_DEMO_MODE = process.env.REACT_APP_IS_DEMO_MODE === 'true' || !!demoMode || !!sessionStorage.getItem('IS_DEMO_MODE') ;

const GEMINI_CLIENT_ID = process.env.REACT_APP_GEMINI_CLIENT_ID;
const COINBASE_CLIENT_ID = process.env.REACT_APP_COINBASE_CLIENT_ID;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WITHDRAWAL_ADDRESS = process.env.REACT_APP_WITHDRAWAL_ADDRESS;

const NETWORK = process.env.REACT_APP_NETWORK;

module.exports = {
    IS_DEMO_MODE,
    COINBASE_CLIENT_ID,
    GEMINI_CLIENT_ID,
    BACKEND_URL,
    WITHDRAWAL_ADDRESS,
    NETWORK
}