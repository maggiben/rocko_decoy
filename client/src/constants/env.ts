export const GEMINI_CLIENT_ID = process.env.NEXT_PUBLIC_GEMINI_CLIENT_ID;
export const COINBASE_CLIENT_ID = process.env.NEXT_PUBLIC_COINBASE_CLIENT_ID;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || "goerli";
export const INFURA_APIKEY = process.env.NEXT_PUBLIC_INFURA_APIKEY || "fde85b66d55f44e0bb36be6c88c7f1c3";
export const THIRDWEB_CLIENTID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID || "6991bf24125bd5b2e125077dc1e8c208";

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
export const IS_DEMO_MODE = process.env.NEXT_PUBLIC_IS_DEMO_MODE === 'false' || demoMode || sessionFlag;
