import "./ReviewLoan.css";
import React, { useState } from "react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Link, useLocation } from "react-router-dom";
import {
  useAddress,
  useSigner,
  ConnectWallet,
  useSwitchChain,
  useChainId,
} from "@thirdweb-dev/react";
import { useLoan } from "../../../contract";
import { financial } from "../../../helper";

import "swiper/swiper-bundle.min.css";
SwiperCore.use([Navigation]);


function ReviewLoan() {
  const location = useLocation();
  const { loanAmount, APR, collateral, collateralNeededInUSD, bufferCollateral } = location.state;
  const loan = loanAmount.loanAmount;
  const apr = APR.APR;
  const collateralNeeded = collateral.collateralNeeded;
  const collateralUSD = collateralNeededInUSD.collateralNeededInUSD;
  const buffer = bufferCollateral.bufferCollateral;

  const signer = useSigner();
  const { approve, deposit, addCollateral, borrowLoan } = useLoan();
  const onFinalize = async () => {
    const depositResult = await deposit(collateralNeeded);
    if (depositResult) {
      const approveResult = await approve();
      const supplyResult = await addCollateral(collateralNeeded);
      const borrowResult = await borrowLoan(loan);
    }
  }

  return (
    <>
      <div className="reivewLoan_container">
        <Link to="/startloan">
          <div className="go_back">
            <img
              src="./assets/icons/leftarrow.png"
              alt="leftarrow"
              className="goback_icon"
            />
            <span>Go back to loan customization</span>
          </div>
        </Link>
        <div className="loan_detail_container">
          <div className="title">Finalize your loan with Compound Finance</div>
          <div style={{ paddingBottom: "40px" }}>
            You’re borrowing USDC and pledging Eth
          </div>
          <div>
            <div className="summary_container">
              <div className="label" style={{ textAlign: "left" }}>
                Loan summary
              </div>
              <div className="input_form">
                <div className="summary_label_container">
                  <div className="label">Lending Protocol</div>
                  <div className="label">Loan amount</div>

                  <div className="label">Current APR</div>
                  <div className="label">Amount required for loan</div>
                  <div className="label">Collateral buffer</div>
                  <div className="label">Estimated time to receive loan</div>
                </div>
                <div className="summary_content_container">
                  <div className="content">Compound Finance</div>
                  <div className="content">{loan} USDC (~${loan})</div>

                  <div className="content">{financial(apr, 4)}%</div>
                  <div className="content">{financial(collateralNeeded, 4)} ETH (${financial(collateralUSD, 2)})</div>
                  <div className="content">{buffer}%</div>
                  <div className="content">15 minutes*</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="receive_container">
          <div className="label">Where do you want to receive your loan?</div>
          <div className="items">
            <div className="detail_item">
              <div
                className="label"
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <div className="label">
                  <input type="radio" name="radio" className="radio" />
                  <div>
                    <div>Coinbase or Gemini account</div>
                    <div style={{ fontSize: "13px !important" }}>
                      Recommended to minimize risk of funds being sent to an
                      incorrect address
                    </div>
                  </div>
                </div>
                <button className="btn">Sign in</button>
              </div>
            </div>
            <div className="detail_item">
              <div
                className="label"
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <div className="label">
                  <input type="radio" name="radio" className="radio" checked="checked" />

                  <div>
                    <div>Ethereum wallet</div>
                  </div>
                </div>
                <ConnectWallet
                  className="btn"
                  btnTitle="Connect"
                  theme="light"
                  style={{
                    background: "#3c6982",
                    color: "#495463",
                    height: "60px",
                    color: "white",
                    borderRadius: "25px"
                  }}
                />                
              </div>
            </div>
            <div className="detail_item">
              <div
                className="label"
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <div className="label">
                  <input type="radio" name="radio" className="radio" />

                  <div>
                    <div>Other exchange or wallet address</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail_item">
              <div
                className="label"
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <div className="label">
                  <input
                    type="radio"
                    name="radio"
                    className="radio"
                    disabled
                    style={{ opacity: "0" }}
                  />

                  <div style={{ opacity: 0.6 }}>
                    <div style={{ fontWeight: 700 }}>Enter wallet address</div>
                    <div style={{ paddingBottom: "15px" }}>
                      {" "}
                      Caution: Please ensure this address is correct as
                      inputting an incorrect address could lead to lost funds.
                    </div>
                    <input className="input_number" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: "14px" }}>
            <div
              className="flex"
              style={{
                gap: "10px",
                alignItems: "center",
              }}>
              <div className="dot"></div>
              <div>
                By finalizing your loan request, you will receive a Rocko wallet
                that will help facilitate and manager your loan. Rocko will have
                no access or control over funds inside your wallet.
              </div>
            </div>
            <div className="flex" style={{ gap: "10px", alignItems: "center" }}>
              <div className="dot"></div>
              <div>
                If your Rocko wallet does not receive the required amount, your
                loan may not be fulfilled.
              </div>
            </div>
            <div className="flex" style={{ gap: "10px", alignItems: "center" }}>
              <div className="dot"></div>
              <div>
                Rocko’s service fee will be taken out of the initial amount
                transferred to your Rocko wallet. More info on Rocko’s service
                fee can be found <span className="text_underline">here.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="finalize_container">
          <button 
            className="btn_finalize" 
            disabled={(signer ? false : true)}
            onClick={onFinalize}
          >Finalize loan request</button>
        </div>
      </div>
    </>
  );
}

export default ReviewLoan;
