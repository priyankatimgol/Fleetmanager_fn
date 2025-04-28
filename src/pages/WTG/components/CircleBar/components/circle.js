import React from "react";
import { Line, Circle } from "rc-progress";

const Circles = ({ percent, valType, strokeColor, trailColor, height, width }) => {
  const circleStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '135px'
  };

  const textStyle = {
    position: "absolute",
    fontSize: "24px",
    fontWeight: "bold",
  };

  return (
    <div style={circleStyle}>
      <Circle
        percent={percent}
        strokeWidth={10}
        strokeColor={strokeColor}
        trailColor={trailColor}
        trailWidth={6}
        height={height}
        width={width}
        style={{ transform: "rotate(270deg)" }}
      />
      <div style={textStyle}>{percent}{valType === 'percent' ? '%' : ''}</div>
    </div>
  );
};

export default Circles;
