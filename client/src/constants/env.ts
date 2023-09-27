let demoMode;

if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  demoMode = params.get('demo_mode');
  if (demoMode === 'true') {
    sessionStorage.setItem('IS_DEMO_MODE', 'true');
    console.log('DEMO MODE ENABLED');
  }
}
export const IS_DEMO_MODE = process.env.REACT_APP_IS_DEMO_MODE === 'true' || !!demoMode || !!sessionStorage.getItem('IS_DEMO_MODE') ;

export const GEMINI_CLIENT_ID = process.env.REACT_APP_GEMINI_CLIENT_ID;
export const COINBASE_CLIENT_ID = process.env.REACT_APP_COINBASE_CLIENT_ID;
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const WITHDRAWAL_ADDRESS = process.env.REACT_APP_WITHDRAWAL_ADDRESS;

export const NETWORK = process.env.REACT_APP_NETWORK || "goerli";