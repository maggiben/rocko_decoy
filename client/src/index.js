import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import ZeroDevWrapper from "./ZeroDevWrapper";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
} from "@thirdweb-dev/react";
import LoneProvider from "./context/loanContext/loanContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("LoneProvider", LoneProvider)
root.render(
  <React.StrictMode>
    <ZeroDevWrapper>
      <BrowserRouter>
        <ThirdwebProvider activeChain="goerli">
          <LoneProvider>
            <App />
          </LoneProvider>
        </ThirdwebProvider>
      </BrowserRouter>
    </ZeroDevWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
