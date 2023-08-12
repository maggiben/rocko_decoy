import React, { useState, useRef, useEffect } from "react";
import "./AddCollateral.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { financial } from "../../../helper";
import { useLoan } from "../../../contract";
import AddSlider from "../../../components/Slider/AddSlider";

import axios from "axios";
import { url } from "../../../config";

function AddCollateral() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, collateral, amount } = location.state;

  const { approveWETH, deposit, addCollateral } = useLoan();

  const [isStart, setIsStart] = useState(false);
  const [step, setStep] = useState(1);

  const step1Validator = async () => {
    const depositResult = await deposit(amount);
    if (depositResult) {
      const approveResult = await approveWETH();
      return approveResult != null;
    } else {
      return false;
    }
  };

  const step2Validator = async () => {
    const result = await addCollateral(amount);
    return result != null;
  };

  const finalize = async () => {
    await axios
      .post(`${url}/updateCollateral`, {
        id: id,
        active: true,
        collateralNeeded: collateral + amount,
      })
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
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
      default:
        finalize();
        break;
    }
  };

  return (
    <div className="reivewLoan_container">
      {!isStart && (
        <>
          <div className="go_back">
            <img
              src="./assets/icons/leftarrow.png"
              alt="leftarrow"
              className="goback_icon"
            />
            <Link to="/dashboard">
              <span>Cancel add collateral</span>{" "}
            </Link>
          </div>
          <div className="loan_detail_container">
            <div className="title">Add your collateral to Compound Finance</div>
            <div style={{ paddingBottom: "40px" }}>
              You’re adding <span style={{ fontWeight: "700" }}>ETH</span> as collateral
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
                        Estimated time to add collateral
                      </div>
                    </div>
                    <div className="summary_content_container">
                      <div className="content">Compound Finance</div>
                      <div className="content">
                        {amount && financial(amount, 4)} ETH
                      </div>
                      <div className="content">15 minutes*</div>
                    </div>
                  </div>
                  <div>
                    *Interest accrues every second so if you are delayed in
                    repaying your loan, your total amount due may increase by
                    the time it is repaid and you will be required to pay the
                    additional interest in order to collect the full amount of
                    your collateral
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
                  <button
                    className="btn"
                    onClick={() => {
                      setIsStart(true);
                    }}>
                    {" "}
                    Continue
                  </button>
                  <div>
                    By pressing “continue”, you will be asked to approve the
                    transaction within your Ethereum wallet. You can track the
                    status of your collateral on the next page
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isStart && (
        <div>
          <div className="stepContainer">
            {step === 2 && (
              <>
                <div className="stepTitle">Adding collateral...</div>
                <div className="stepDetail">
                    Your ETH is converted to WETH 
                    and it's approved to Compound protocol.{" "}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="stepTitle">Collateral added!</div>
                <div className="stepDetail">
                  Your collateral has been added. 
                  Please check your liquidation price which is lower than before.{" "}
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <div className="stepTitle">Adding collateral...</div>
                <div className="stepDetail">Estimated time remaining: ...</div>
              </>
            )}
          </div>
          <AddSlider step={step} />
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
    </div>
  );
}

export default AddCollateral;
