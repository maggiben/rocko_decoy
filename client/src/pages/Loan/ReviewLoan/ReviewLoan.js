import "./ReviewLoan.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import Modal from "react-modal";
import axios from "axios";
import {
  useAddress,
  useSigner,
  ConnectWallet,
  useSwitchChain,
  useChainId,
} from "@thirdweb-dev/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLoan } from "../../../contract";
import { financial } from "../../../helper";

import "swiper/swiper-bundle.min.css";
import { url } from "../../../config";
import Slider from "../../../components/Slider/Slider";
SwiperCore.use([Navigation]);

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

function ReviewLoan() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(0);
  const [apr, setAPR] = useState(0);
  const [collateralNeeded, setCollateralNeeded] = useState(0);
  const [collateralUSD, setCollateralUSD] = useState(0);
  const [buffer, setBuffer] = useState(0);

  useEffect(() => {
    if (location.state) {
      const {
        loanAmount,
        APR,
        collateral,
        collateralNeededInUSD,
        bufferCollateral,
      } = location.state;

      console.log(location.state)
      console.log(loanAmount)
      
      setLoan(loanAmount.loanAmount);
      setAPR(APR.APR);
      setCollateralNeeded(collateral.collateralNeeded);
      setCollateralUSD(collateralNeededInUSD.collateralNeededInUSD);
      setBuffer(bufferCollateral.bufferCollateral);
    } else {
      navigate('/startloan');
    }
  }, [])
  // above 5 params + time

  const signer = useSigner();
  const { approveWETH, deposit, addCollateral, borrowLoan } = useLoan();
  const { user } = useAuth0();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [step, setStep] = useState(1);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const step1Validator = async () => {
    const depositResult = await deposit(collateralNeeded);
    if (depositResult) {
      const approveResult = await approveWETH();
      return approveResult != null;
    } else {
      return false;
    }
  };

  const step2Validator = async () => {
    const supplyResult = await addCollateral(collateralNeeded);
    return supplyResult;
  };

  const step3Validator = async () => {
    const borrowResult = await borrowLoan(loan);
    return borrowResult;
  };

  const continueInModal = () => {
    setIsStart(true);
    closeModal();
  };

  const finalizeLoan = () => {
    const loanObject = {
      user: user.email,
      loan: loan,
      apr: apr,
      collateralNeeded: collateralNeeded.toString(),
      collateralUSD: collateralUSD.toString(),
      buffer: buffer,
      active: true,
    };
    console.log("loanObject", loanObject);
    axios.post(`${url}/add`, loanObject).then((res) => {
      console.log(res);
      console.log(res.data);
      navigate("/dashboard");
    });
  };

  const OnContinue = async () => {
    switch (step) {
      case 1:
        const step1Result = await step1Validator();
        if (step1Result) setStep(2);
        break;
      case 2:
        const step2Result = await step2Validator();
        if (step2Result) setStep(3);
        break;
      case 3:
        const step3Result = await step3Validator();
        if (step3Result) setStep(4);
        break;
      default:
        finalizeLoan();
        break;
    }
  };

  return (
    <>
      {!isStart && (
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
            <div className="title">
              Finalize your loan with Compound Finance
            </div>
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
                    <div className="content">
                      {loan} USDC (~${loan})
                    </div>

                    <div className="content">{financial(apr, 4)}%</div>
                    <div className="content">
                      {financial(collateralNeeded, 4)} ETH ($
                      {financial(collateralUSD, 2)})
                    </div>
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
                    <input
                      type="radio"
                      name="radio"
                      className="radio"
                      checked="checked"
                    />

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
                      minWidth: "200px",
                      color: "#495463",
                      height: "60px",
                      color: "white",
                      borderRadius: "25px",
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
                      <div style={{ fontWeight: 700 }}>
                        Enter wallet address
                      </div>
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
                  By finalizing your loan request, you will receive a Rocko
                  wallet that will help facilitate and manager your loan. Rocko
                  will have no access or control over funds inside your wallet.
                </div>
              </div>
              <div
                className="flex"
                style={{ gap: "10px", alignItems: "center" }}>
                <div className="dot"></div>
                <div>
                  If your Rocko wallet does not receive the required amount,
                  your loan may not be fulfilled.
                </div>
              </div>
              <div
                className="flex"
                style={{ gap: "10px", alignItems: "center" }}>
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
              disabled={signer ? false : true}
              onClick={openModal}>
              Finalize loan request
            </button>
          </div>
        </div>
      )}
      {isStart && (
        <div>
          <div className="stepContainer">
            {step === 2 && (
              <>
                <div className="stepTitle">Depositing collateral...</div>
                <div className="stepDetail">
                  Estimated time remaining: less than 10 minutes
                </div>
              </>
            )}
            {step >= 3 && (
              <>
                <div className="stepTitle">Loan delivered!</div>
                <div className="stepDetail">
                  Your loan has been fulfilled and you can access your funds in
                  the exchange account or wallet address provided.{" "}
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <div className="stepTitle">Transferring collateral...</div>
                <div className="stepDetail">Estimated time remaining: ...</div>
              </>
            )}
          </div>
          <Slider step={step} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "150px",
            }}>
            <button
              className="btnContinue"
              onClick={async () => {
                await OnContinue();
              }}>
              Continue
            </button>
          </div>
        </div>
      )}
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
            Loan finalized!
          </div>
          <div
            style={{
              width: "408px",
              marginBottom: "80px",
              fontSize: "18px",
              fontWeight: "500",
              textAlign: "center",
            }}>
            Please approve the collateral withdrawal request in your Ethereum
            wallet. You can track the status of your loan on the next page
          </div>
          <button
            className="btnContinue"
            onClick={() => {
              continueInModal();
            }}>
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ReviewLoan;
