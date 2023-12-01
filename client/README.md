## Getting Started

First, run the development server:

```bash
- [install packages] yarn install
- [start] yarn dev
- [build] yarn build
- [eslint fix] yarn eslint:fix

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Environment variables

- [NEXT_PUBLIC_IS_DEMO_MODE] : if true, app will run in demo mode - otherwise(false), it will run in real mode

- [NEXT_PUBLIC_NETWORK] : Blockchain network which application will run on - if mainnet, it should be ethereum. if testnet, goerli

- [NEXT_PUBLIC_INFURA_APIKEY] : This is used to communicate with the Ethereum blockchain - infuraProvider will be used as wagmi provider

- [NEXT_PUBLIC_THIRDWEB_CLIENTID] : Used to access the enabled thirdweb infrastructure services and identify your application using an app bundle ID

- [NEXT_PUBLIC_ZERODEV_PROJECT_ID] : This is for ZeroDev dashboard configuration. Auth0 settings, whitelisted domains and Gas policies will be included in ZeroDev dashboard configuration.

- [NEXT_PUBLIC_BACKEND_URL] : Server URL

- [NEXT_PUBLIC_PAYMENT_BUFFER] : This is added to your payment to ensure the loan is fully repaid while accounting for interest that accrues each second.