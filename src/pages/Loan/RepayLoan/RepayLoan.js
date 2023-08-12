import React, { useState, useRef, useEffect } from "react";
import "./RepayLoan.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { financial } from "../../../helper";
import { useLoan } from "../../../contract";
import RepaySlider from "../../../components/Slider/RepaySlider";

import axios from "axios";
import { url } from "../../../config";

function RepayLoan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { fullyRepaid, collateral, amount, id, loanAmount } = location.state;

  const { approveUSDC, addLoan, borrowCollateral, addCollateral, claimReward } =
    useLoan();

  const [isStart, setIsStart] = useState(false);
  const [step, setStep] = useState(1);

  const step1Validator = async () => {
    const approveResult = await approveUSDC();
    return approveResult != null;
  };

  const step2Validator = async () => {
    console.log(amount);
    const result = await addLoan(financial(amount, 6));
    return result != null;
  };

  const step3Validator = async () => {
    if (!fullyRepaid) return false;

    const repayResult = await borrowCollateral(collateral);
    if (repayResult) {
      const rewardResult = await claimReward();
      return rewardResult != null;
    } else {
      return false;
    }
  };

  const finalizeRepay = async () => {
    await axios
      .post(`${url}/updateLoan`, {
        amount: fullyRepaid ? 0 : loanAmount - amount,
        active: !fullyRepaid,
        id: id,
      })
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const OnContinueRepay = async () => {
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
        if (fullyRepaid) {
          const step3Result = await step3Validator();
          if (step3Result) setStep(4);
          break;
        } else {
          finalizeRepay();
          break;
        }
      default:
        finalizeRepay();
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
              <span>Cancel loan repayment</span>{" "}
            </Link>
          </div>
          <div className="loan_detail_container">
            <div className="title">Repay your loan to Compound Finance</div>
            <div style={{ paddingBottom: "40px" }}>
              You’re borrowing <span style={{ fontWeight: "700" }}>USDC</span>{" "}
              and pledging <span style={{ fontWeight: "700" }}>ETH</span>
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
                      <div className="content">
                        {amount && financial(amount, 2)} USDC
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
                    status of your loan on the next page
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
                <div className="stepTitle">Repaying loan...</div>
                <div className="stepDetail">Estimated time remaining: ...</div>
              </>
            )}
            {step > 3 && (
              <>
                <div className="stepTitle">Loan delivered!</div>
                <div className="stepDetail">
                  Your loan has been repaid and your collateral has been
                  returned to your connected account or wallet.{" "}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                {fullyRepaid ? (
                  <>
                    <div className="stepTitle">Repaying loan...</div>
                    <div className="stepDetail">
                      Estimated time remaining: ...
                    </div>
                  </>
                ) : (
                  <>
                    <div className="stepTitle">Loan delivered!</div>
                    <div className="stepDetail">
                      Your loan has been repaid.{" "}
                    </div>
                  </>
                )}
              </>
            )}
            {step === 1 && (
              <>
                <div className="stepTitle">Repaying loan...</div>
                <div className="stepDetail">Estimated time remaining: ...</div>
              </>
            )}
          </div>
          <RepaySlider step={step} fullyRepaid={fullyRepaid} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "150px",
            }}>
            <button
              className="btnContinue"
              onClick={async () => {
                await OnContinueRepay();
              }}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RepayLoan;
