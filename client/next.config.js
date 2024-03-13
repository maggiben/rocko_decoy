/** @type {import('next').NextConfig} */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;

const connectSrc = [
  BACKEND_URL,
  `https://${NETWORK}.infura.io`,
  `https://${NETWORK === 'mainnet' ? 'ethereum' : NETWORK}.rpc.thirdweb.com`,
  'https://ipv6.icanhazip.com',
  'https://ipv4.icanhazip.com',
  'https://api.ipify.org',
  'https://api6.ipify.org',
  'https://backend-vikp.onrender.com',
  'https://broadcast-server.tor.us',
  'wss://broadcast-server.tor.us',
  'https://fittest-ultra-aura.ethereum-sepolia.quiknode.pro',
  'https://meta-aa-provider.onrender.com',
];

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data:;
    connect-src 'self' ${connectSrc.join(' ')};
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          // TODO experiment with this to see if weird Download prompt goes away
          // https://linear.app/rocko/issue/ROC-342
          //   {
          //     key: 'Content-Type',
          //     value: 'application/javascript',
          //   },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'app.rocko.co',
          },
        ],
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value:
              'https://app.rocko.co, https://*.testnet.rocko.co, http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
