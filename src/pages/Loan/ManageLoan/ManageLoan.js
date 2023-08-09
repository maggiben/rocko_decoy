import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import GradientProgressBar from "./GradientProgressBar ";
import "./ManageLoan.css";
import axios from "axios";
function ManageLoan() {
  const [isToggled, setToggle] = useState(false);

  useEffect(() => {
    // axios.get(`http://localhost:5000/get`).then((res) => {
    //   console.log(res);
    //   console.log(res.data);
    // });
  }, []);
  const handleClick = () => setToggle(!isToggled);
  return (
    <div className="reivewLoan_container">
      <div className="go_back">
        <Link to="/startloan">
          <img
            src="./assets/icons/leftarrow.png"
            alt="leftarrow"
            className="goback_icon"
          />
          <span>Go back to all loans</span>
        </Link>
      </div>

      <div className="compound-container">
        <div className="title">Loan with Compound Finance</div>

        <div className="">
          <div className="compound-label" style={{ textAlign: "left" }}>
            Compound - Eth: USDC
          </div>
          <div className="payment_container">
            <div style={{ paddingBottom: "30px" }}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "500",
                  lineHeight: "29px",
                }}>
                Current balance
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  lineHeight: "29px",
                }}>
                1,012.13 USDC{" "}
                <span style={{ fontSize: "20px" }}>($1,012.13)</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "20px", width: "50%" }}>
                <div style={{ width: "50%" }}>
                  <p>Interest accrued</p>
                  <p>Current APR</p>
                </div>
                <div style={{ width: "50%", fontWeight: "700" }}>
                  <p>Interest accrued</p>
                  <p>Current APR</p>
                </div>
              </div>
              <div style={{ textAlign: "center", maxWidth: "30%" }}>
                <button className="btn">Make payment</button>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "12px",
                  }}>
                  There is no payment due date for this loan. YOu can repay it
                  in part or in full at anytime.
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="collateral_container">
              <div style={{ fontSize: "24px", fontWeight: "700" }}>
                Collateral
              </div>
              <div style={{ width: "70%" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <p>Collateral posted</p>
                  </div>
                  <div style={{ width: "50%", fontWeight: "700" }}>
                    <p>1.841889238923 Eth ($2,791.49) </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <p>Liquidation price</p>
                  </div>
                  <div style={{ width: "50%", fontWeight: "700" }}>
                    <p>$1,301.55</p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <p>Collateral buffer</p>
                  </div>
                  <div style={{ width: "50%", fontWeight: "700" }}>
                    <p>101%</p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    width: "50%",
                    paddingTop: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "30px",
                  }}>
                  <GradientProgressBar value={100} />
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      width: "50%",
                      marginInline: "auto",
                      paddingTop: "50px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <p> Price alerts are off</p>
                    <label className="switch">
                      <input type="checkbox" onClick={handleClick} />
                      <span
                        className={`slider ${
                          isToggled ? "active" : ""
                        }`}></span>
                    </label>
                  </div>
                </div>
                <div style={{ textAlign: "center", maxWidth: "30%" }}>
                  <button className="btn">Add collateral</button>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "12px",
                    }}>
                    You can post additional collateral for this loan at anytime.
                    Doing so will decrease the possibility of liquidation.
                  </div>
                </div>
              </div>
            </div>
            <div className="rewards_container">
              <div>
                <div style={{ fontSize: "24px", fontWeight: "700" }}>
                  Rewards
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <p>Rewards earned</p>
                    <p>Rewards rate</p>
                  </div>
                  <div style={{ width: "50%", fontWeight: "700" }}>
                    <p>
                      0.0214 Comp{" "}
                      <span style={{ fontSize: "16px", fontWeight: "500" }}>
                        (~$0.07)
                      </span>
                    </p>
                    <p>2.54%</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "12px",
                }}>
                Compound protocol offers rewards in tis Comp token for usage of
                the protocol. Your Rocko wallet will automatically claim your
                rewards for you when your loan is repaid
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageLoan;
