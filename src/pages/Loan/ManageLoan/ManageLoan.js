import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GradientProgressBar from "../../../components/GradientProgressBar/GradientProgressBar ";
import "./ManageLoan.css";
import axios from "axios";
import { useLoan } from "../../../contract";
import { getInterest } from "../../../utils";
import { financial } from "../../../helper";
import { useCompPrice } from "../../../hooks/usePrice";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    width: "fit-content",
    height: "fit-content",
    border: "1px solid",
  },
};

function ManageLoan() {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const navigate = useNavigate();
  const location = useLocation();
  const { loanInfo } = location.state;
  const loanAmount = loanInfo.loan.loan;
  const collateral = loanInfo.loan.collateralNeeded;
  const buffer = loanInfo.loan.buffer;
  const time = loanInfo.loan.time;

  const [price, setPrice] = useState(0);
  const [APR, setAPR] = useState(0);
  const [interest, setInterest] = useState(0);
  const [thresold, setThresold] = useState(0);
  const [liquidationprice, setLiquidationPrice] = useState(0);
  const [liquidationpercent, setLiquidationPercent] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [reward, setReward] = useState(0);
  const [rewardrate, setRewardRate] = useState(0);
  const highestETHPrice = 4891.7;
  const { compprice } = useCompPrice();

  const [selectedOption, setSelectedOption] = useState("option1");
  const [amount, setAmount] = useState(0);
  const [currentBalence, setCurrentBalence] = useState(1012.13);

  const {
    getETHPrice,
    getBorrowAPR,
    getPenalty,
    getThreshold,
    getRewardAmount,
    getRewardRate,
    approveUSDC,
    addLoan,
    borrowCollateral,
    addCollateral,
    claimReward,
  } = useLoan();

  useEffect(() => {
    getETHPrice()
      .then((value) => setPrice(value))
      .catch((e) => console.log(e));

    getBorrowAPR()
      .then((value) => setAPR(value))
      .catch((e) => console.log(e));

    getPenalty()
      .then((value) => setPenalty(value))
      .catch((e) => console.log(e));

    getThreshold()
      .then((value) => setThresold(value))
      .catch((e) => console.log(e));

    getRewardAmount()
      .then((value) => setReward(value))
      .catch((e) => console.log(e));

    getRewardRate()
      .then((value) => setRewardRate(value))
      .catch((e) => console.log(e));

    const value = getInterest(loanAmount, APR, time);
    setInterest(value);

    const priceValue = loanAmount / thresold / collateral;
    setLiquidationPrice(priceValue);

    const percent = (liquidationprice / highestETHPrice) * 100;
    setLiquidationPercent(percent);
  });

  const [isToggled, setToggle] = useState(false);
  const handleClick = () => setToggle(!isToggled);

  const OnAddCollateral = () => {};

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const goToRepay = () => {
    if (selectedOption == "option1") {
      navigate("/repay", {
        state: { fullyRepaid: true, amount: loanAmount + interest },
      });
    } else {
      if (amount < 50 || amount > (loanAmount + interest))
        return;

      navigate("/repay", {
        state: { fullyRepaid: false, amount: amount },
      });
    }
  };

  return (
    <div className="reivewLoan_container">
      <div className="go_back">
        <Link to="/dashboard">
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
            Compound - ETH: USDC
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
                {financial(loanAmount + interest, 2)} USDC{" "}
                <span style={{ fontSize: "20px" }}>
                  (${financial(loanAmount + interest, 2)})
                </span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "20px", width: "50%" }}>
                <div style={{ width: "50%" }}>
                  <p>Interest accrued</p>
                  <p>Current APR</p>
                </div>
                <div style={{ width: "50%", fontWeight: "700" }}>
                  <p>{financial(interest, 2)} USDC</p>
                  <p>{financial(APR, 2)}%</p>
                </div>
              </div>
              <div style={{ textAlign: "center", maxWidth: "30%" }}>
                <button
                  className="btn"
                  onClick={openModal}>
                  Make payment
                </button>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "12px",
                  }}>
                  There is no payment due date for this loan. You can repay it
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
                    <p>
                      {financial(collateral, 6)} ETH ($
                      {financial(price * collateral, 2)}){" "}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <p>Liquidation price</p>
                  </div>
                  <div style={{ width: "50%", fontWeight: "700" }}>
                    <p>${financial(liquidationprice, 2)}</p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <p>Collateral buffer</p>
                  </div>
                  <div style={{ width: "50%", fontWeight: "700" }}>
                    <p>{buffer}%</p>
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
                  <GradientProgressBar
                    liquidationPrice={liquidationprice}
                    currentPrice={price}
                    percentage1={liquidationpercent}
                    percentage2={(price / highestETHPrice) * 100}
                  />
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
                  <button className="btn" onClick={() => OnAddCollateral()}>
                    Add collateral
                  </button>
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
                      {financial(reward, 6)} Comp{" "}
                      <span style={{ fontSize: "16px", fontWeight: "500" }}>
                        (~${financial(reward * compprice, 2)})
                      </span>
                    </p>
                    <p>{financial(rewardrate, 2)}%</p>
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
      <Modal
        className="Modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}>
        <div
          style={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            style={{
              marginBottom: "20px",
              fontSize: "26px",
              fontWeight: "700",
              textAlign: "center",
            }}>
            Choose payment amount
          </div>
          <div
            style={{
              width: "408px",
              marginBottom: "80px",
              fontSize: "18px",
              fontWeight: "500",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBlock: "15px",
              }}>
              <input
                type="radio"
                name="radio"
                className="radio"
                checked={selectedOption === "option1"}
                value="option1"
                onChange={handleRadioChange}
              />

              <div>
                <div style={{ fontSize: "20px" }}>{financial(loanAmount + interest, 2)}</div>
                <div style={{ fontSize: "16px" }}>Current balance</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}>
              <input
                type="radio"
                name="radio"
                className="radio"
                checked={selectedOption === "option2"}
                value="option2"
                onChange={handleRadioChange}
              />
              <div style={{ fontSize: "24px", fontWeight: "600" }}>
                Other amount
              </div>
            </div>
            {selectedOption === "option2" && (
              <input
                className="input_number"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ marginTop: "10px", marginLeft: "75px" }}
              />
            )}
          </div>

          <button className="btnContinue" onClick={goToRepay}>
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ManageLoan;
