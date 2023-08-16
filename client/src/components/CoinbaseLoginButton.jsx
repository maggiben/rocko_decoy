
const COINBASE_CLIENT_ID = process.env.REACT_APP_COINBASE_CLIENT_ID;
const COINBASE_REDIRECT_URI = process.env.REACT_APP_COINBASE_REDIRECT_URI;
const COINBASE_SCOPES = [
    'wallet:user:read',
    'wallet:accounts:read',
    'wallet:transactions:send'
].join(",");

const SPEND_LIMIT_AMOUNT = "1";

export default function LoginButton() {
    const handleLogin = () => {
        
        const redirectUri = encodeURIComponent(COINBASE_REDIRECT_URI);
        const scope = encodeURIComponent(COINBASE_SCOPES);

        const authUrl = `https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${COINBASE_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}&meta[send_limit_amount]=${SPEND_LIMIT_AMOUNT}`;

        window.location.href = authUrl;
    };

    return <button className="get_started_btn" onClick={handleLogin}>Login with Coinbase</button>;
}
