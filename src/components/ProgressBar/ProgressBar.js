import React, { useState } from "react";
import "./ProgressBar.css";
const ProgressBar = ({ step, min, max }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const handleMinChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    const value = parseFloat(event.target.value);
    const newMinVal = Math.min(value, maxValue);
    setMinValue(newMinVal);
  };

  return (
    <div style={{ width: "85%" }}>
      <input
        type="range"
        value={minValue}
        min={0}
        max={1000}
        step={step}
        onChange={handleMinChange}
        style={{
          width: "100%",
          height: "25px",
          borderRadius: "10px",
          // background: "#05B516",
          outline: "none",
          opacity: "0.7",
          transition: ".2s",
          hover: {
            opacity: "1",
          },
        }}
      />
    </div>
  );
};

export default ProgressBar;
