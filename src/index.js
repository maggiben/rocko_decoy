import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from '@auth0/auth0-react';
import { getConfig } from "./config";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
} from "@thirdweb-dev/react";
// import { Ethereum } from "@thirdweb-dev/chains";
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Auth0Provider
        {...providerConfig}
      >
        <BrowserRouter>
          <ThirdwebProvider activeChain="avalanche-fuji">
            <App />
          </ThirdwebProvider>
        </BrowserRouter>
      </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
