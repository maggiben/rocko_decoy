export const GEMINI_CLIENT_ID = process.env.NEXT_PUBLIC_GEMINI_CLIENT_ID;
export const COINBASE_CLIENT_ID = process.env.NEXT_PUBLIC_COINBASE_CLIENT_ID;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || "goerli";
export const INFURA_APIKEY = process.env.NEXT_PUBLIC_INFURA_APIKEY || "";
export const THIRDWEB_CLIENTID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENTID || "";

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

console.log("deploy test PR#75, env.ts")