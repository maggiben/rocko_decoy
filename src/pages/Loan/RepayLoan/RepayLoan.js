import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./RepayLoan.css";
function RepayLoan() {
  const location = useLocation();

  const [amount, setAmount] = useState(0);
  useEffect(() => {
    console.log(location);
    if (location.state && location.state.amount)
      setAmount(location.state.amount);
  });

  return (
    <div className="reivewLoan_container">
      <div className="go_back">
        <img
          src="./assets/icons/leftarrow.png"
          alt="leftarrow"
          className="goback_icon"
        />
        <Link to="/dashboard">
          <span>Cancel loan repayment</span>{" "}
        </Link>
      </div>

      <div className="loan_detail_container">
        <div className="title">Repay your loan to Compound Finance</div>
        <div style={{ paddingBottom: "40px" }}>
          You’re borrowing <span style={{ fontWeight: "700" }}>USDC</span> and
          pledging <span style={{ fontWeight: "700" }}>Eth</span>
        </div>
        <div>
          <div className="summary_container">
            <div className="label" style={{ textAlign: "left" }}>
              Payment summary
            </div>
            <div className="payment_summary">
              <div className="payment_summary_container">
                <div className="summary_label_container">
                  <div className="label">Lending Protocol</div>
                  <div className="label">Payment amount</div>
                  <div className="label">
                    Estimated time to receive collateral
                  </div>
                </div>
                <div className="summary_content_container">
                  <div className="content">Compound Finance</div>
                  <div className="content">{amount && amount}</div>
                  <div className="content">15 minutes*</div>
                </div>
              </div>
              <div>
                *Interest accrues every second so if you are delayed in repaying
                your loan, your total amount due may increase by the time it is
                repaid and you will be required to pay the additional interest
                in order to collect the full amount of your collateral
              </div>
            </div>
            <div
              style={{
                marginBlock: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "40px",
                alignItems: "center",
                gap: "40px",
              }}>
              <button className="btn"> Continue</button>
              <div>
                By pressing “continue”, you will be asked to approve the
                transaction within your Ethereum wallet. You can track the
                status of your loan on the next page
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepayLoan;
