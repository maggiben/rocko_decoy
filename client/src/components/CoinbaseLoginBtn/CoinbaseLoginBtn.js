import {
    COINBASE_CLIENT_ID,
    BACKEND_URL
} from '../../constants/env';

const COINBASE_REDIRECT_URI = `${BACKEND_URL}/cb-callback`;
const COINBASE_SCOPES = [
    'wallet:user:read',
    'wallet:accounts:read',
    'wallet:addresses:read',
    'wallet:transactions:send',
    // 'wallet:transactions:send:bypass-2fa'
].join(",");

const CURRENCY_SELECT = [
    'WBTC',
    'ETH',
    'UNI',
    'COMP',
    'USDC'
].join(",")

const SPEND_LIMIT_AMOUNT = "1"; // need to get app aproved to be more than 1



export default function CoinbaseLoginBtn() {
    const handleLogin = () => {
    const params = new URLSearchParams({
            response_type: 'code',
            client_id: COINBASE_CLIENT_ID,
            redirect_uri: COINBASE_REDIRECT_URI,
            scope: COINBASE_SCOPES,
            account_currency: CURRENCY_SELECT,

            'meta[send_limit_amount]': SPEND_LIMIT_AMOUNT,
            // 'meta[send_limit_currency]': 'USD',
            // 'meta[send_limit_period]': 'day'
        });

        const authUrl = `https://www.coinbase.com/oauth/authorize?${params.toString()}`;
            
        // window.location.href = authUrl;
        window.open(authUrl,"Coinbase Oauth",'height=600,width=800,left=10,top=10,titlebar=no,toolbar=no,menubar=no,location=no,directories=no,status=no');
    };

    return <button className="py-[10px] px-6 bg-[#2C3B8D] rounded-full text-sm font-semibold text-white" onClick={handleLogin}>Continue</button>;
}
