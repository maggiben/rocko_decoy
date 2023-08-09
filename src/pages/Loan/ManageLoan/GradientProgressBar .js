import React from "react";

const GradientProgressBar = ({ percentage1 = 10, percentage2 = 70 }) => {
  const style = {
    width: "0",
    height: "0",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "10px solid black",
  };
  return (
    <div
      className="progress-bar"
      style={{
        borderRadius: "5px",
        width: "100%",
        height: "10px",
        position: "relative",
      }}>
      <div
        style={{
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(to right, #b52b2c,#c3692f,#dcd856,#6fc536)",
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${percentage1}%`,
          top: "15px",
          color: "#000",
        }}>
        <div style={style}></div>
        <div style={{ position: "absolute", left: "-18px", paddingTop: "3px" }}>
          liquidation
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: `${percentage2}%`,
          top: "15px",
          color: "#000",
        }}>
        <div style={style}></div>
        <div
          style={{
            position: "absolute",
            left: "-18px",
            paddingTop: "3px",
            textAlign: "center",
          }}>
          Collateral butter
        </div>
      </div>
    </div>
  );
};

export default GradientProgressBar;
