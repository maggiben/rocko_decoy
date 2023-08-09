import React, { useState } from "react";
import "./Dashboard.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Dashboard = ({ step }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="titleContainer">
        <div className="title">Loan dashboard</div>
        <div className="titleDetail">
          You have 3 loans outstanding for 5000 USDC
        </div>
      </div>
      <div className="loansContainer">
        <div className="header">
          <div
            style={{
              padding: "10px",
              paddingLeft: "20px",
              paddingRight: "40px",
              fontSize: "20px",
              fontWeight: "700",
              borderRight: "1px solid #B7B4B4",
            }}>
            Active loans
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "400",
              padding: "10px",
              paddingLeft: "20px",
            }}>
            Closed loans
          </div>
        </div>
        <div className="loans">
          <div className="eachLoan">
            <div className="loanDetails">
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}>
                Compound - ETH:USDC
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ marginBottom: "5px" }}>Balance</div>
                  <div>Current APR</div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      marginBottom: "5px",
                    }}>
                    $1012
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "700" }}>
                    3.84%
                  </div>
                </div>
              </div>
            </div>
            <div className="manageLoan">
              <div>Opened: March 11, 2023</div>
              <Link to="/manage">
                {" "}
                <button className="btn">Manage loan</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="btnContainer">
          <button className="btn" onClick={() => navigate("/startloan")}>
            Start new loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
