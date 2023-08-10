import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css";

const Dashboard = ({ step }) => {
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState(null);
  const [loancount, setLoanCount] = useState(0);
  const [totalloan, setTotalLoan] = useState(0);

  useEffect(() => {
    const getLoanData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/loan");
        console.log("response", response.data);
        setLoanData(response.data);
        setLoanCount(response.data.length);

        let sumOfLoan = response.data.reduce((total, obj) => total + obj.loan, 0);
        console.log(sumOfLoan);
        setTotalLoan(sumOfLoan);
      } catch (error) {
        console.error(error);
      }
    };
    getLoanData();
  }, []);

  return (
    <div className="dashboard">
      <div className="titleContainer">
        <div className="title">Loan dashboard</div>
        <div className="titleDetail">
          You have {loancount} loans outstanding for {totalloan} USDC
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
          {loanData && loanData.map((loan) => {
            const date = new Date(loan.time);
            const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

            return (
              <div className="eachLoan" key={loan.id}>
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
                    <div style={{ marginLeft: "20px" }}>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          marginBottom: "5px",
                        }}>
                        ${loan.loan}
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: "700" }}>
                        {loan.apr}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="manageLoan">
                  {/* <div>Opened: March 11, 2023</div> */}
                  <div>Opened: {loan.time ? formattedDate : 'N/A'}</div>
                  <Link 
                    to="/manage"
                    state={{
                      loanInfo: {loan}
                    }}>
                    {" "}
                    <button className="btn">Manage loan</button>
                  </Link>
                </div>
              </div>
            );
          })}
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
