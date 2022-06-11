import React from "react";
import "./scoreBoard.css";

const ScoreBoard = ({ score, distance }) => {
  return (
    <div>
      <h2>Score Board</h2>
      <h3>Total Kilometer: 1500</h3>
      <h3>Distance: {distance == 0 ? distance : distance - 1000}</h3>
      <h3>Total Kilometer Left: {1500 - distance + 1000}</h3>
      <h3>Your Total Score: {score}</h3>
    </div>
  );
};

export default ScoreBoard;
