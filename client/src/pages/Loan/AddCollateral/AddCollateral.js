import React, { useState, useRef, useEffect } from "react";
import "./AddCollateral.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { financial } from "../../../helper";
import { useLoan } from "../../../contract/single";
import AddSlider from "../../../components/Slider/AddSlider";

import axios from "axios";

function AddCollateral() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [id, setId] = useState(0);
  const [collateral, setCollateral] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isAdd, setIsAdd] = useState(0);

  useEffect(() => {
    if (location.state) {
      const { id, collateral, amount, isAdd } = location.state;
    
      setId(id);
      setCollateral(collateral);
      setAmount(amount);
      setIsAdd(isAdd);
    } else {
      navigate('/dashboard');
    }
  })

  const { approveWETH, deposit, addCollateral, wethToETH, borrowCollateral } = useLoan();

  const [isStart, setIsStart] = useState(false);
  const [step, setStep] = useState(1);

  const step1Validator = async () => {
    if (isAdd) {
      const depositResult = await deposit(amount);
      if (!depositResult) return false;
      const approveResult = await approveWETH();
      return approveResult != null;
    } else {
      const result = await borrowCollateral(amount);
      return result != null;
    }
  };

  const step2Validator = async () => {
    if (isAdd) {
      const result = await addCollateral(amount);
      return result != null;
    } else {
      const result = await wethToETH(amount);
      return result != null;
    }
  };

  const finalize = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/updateCollateral`, {
        id: id,
        active: true,
        collateral: isAdd ? (Number(collateral) + Number(amount)) : (Number(collateral) - Number(amount)),
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

        // setStep(2);
        break;
      case 2:
        const step2Result = await step2Validator();
        if (step2Result) setStep(3);

        // setStep(3);
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
            {isAdd ? (
              <>
                <div className="title">Add your collateral to Compound Finance</div>
                <div style={{ paddingBottom: "40px" }}>
                  You’re adding <span style={{ fontWeight: "700" }}>ETH</span> as collateral for your loan
                </div>
              </>
            ) : (
              <>
                <div className="title">Withdraw your collateral from Compound Finance</div>
                <div style={{ paddingBottom: "40px" }}>
                  You’re withdrawing <span style={{ fontWeight: "700" }}>ETH</span> as collateral
                </div>
              </>
            )}
            <div>
              <div className="summary_container">
                <div className="label" style={{ textAlign: "left" }}>
                  Summary
                </div>
                <div className="payment_summary">
                  <div className="payment_summary_container">
                    <div className="summary_label_container">
                      <div className="label">Lending Protocol</div>
                      <div className="label">Payment amount</div>
                    </div>
                    <div className="summary_content_container">
                      <div className="content">Compound Finance</div>
                      <div className="content">
                        {amount && financial(amount, 4)} ETH
                      </div>
                    </div>
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
                {isAdd ? ( <div className="stepTitle">Adding collateral...</div> ) 
                : ( <div className="stepTitle">Withdrawing collateral...</div> )}
                <div className="stepDetail">Estimated time remaining: ...</div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="stepTitle">Collateral added!</div>
                <div className="stepDetail">
                  Your collateral has been added and increased your collateral buffer.
                </div>
              </>
            )}
            {step === 1 && (
              <>
                {isAdd ? ( <div className="stepTitle">Adding collateral...</div> ) 
                : ( <div className="stepTitle">Withdrawing collateral...</div> )}
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
