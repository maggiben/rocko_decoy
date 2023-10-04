export const GEMINI_CLIENT_ID = process.env.REACT_APP_GEMINI_CLIENT_ID;
export const COINBASE_CLIENT_ID = process.env.REACT_APP_COINBASE_CLIENT_ID;
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const NETWORK = process.env.REACT_APP_NETWORK || "goerli";
export const INFURA_APIKEY = process.env.REACT_APP_INFURA_APIKEY || "fde85b66d55f44e0bb36be6c88c7f1c3";

let demoMode = false;
let sessionFlag = false;
if (typeof window !== 'undefined') {
    if (sessionStorage?.getItem('IS_DEMO_MODE') === 'true') {
        sessionFlag = true;
    } else {
        const params = new URLSearchParams(window.location.search);
        demoMode = !!params.get('demo_mode');
        if (demoMode) {
            sessionStorage.setItem('IS_DEMO_MODE', 'true');
             console.log('DEMO MODE ENABLED');
        }
    }

}
export const IS_DEMO_MODE = process.env.REACT_APP_IS_DEMO_MODE === 'true' || demoMode || sessionFlag;
