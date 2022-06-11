import React from "react";
import "./scoreBoard.css";

const ScoreBoard = ({ score, distance, currentDistance }) => {
  let totalKmLeft = 1500 - distance;

  if (totalKmLeft < 1) {
    return (
      <>
        <h1>GAME OVER</h1>
        <h3>Your Score is: {score}</h3>
        <p>Please Reload to start again...</p>
      </>
    );
  }

  return (
    <div>
      <h2>Score Board</h2>
      <h3>Total Kilometer: 1500</h3>
      <h3>Distance: {distance}</h3>
      <h3>Current Distance: {currentDistance}</h3>
      <h3>Total Kilometer Left: {totalKmLeft}</h3>
      <h3>Your Total Score: {score}</h3>
    </div>
  );
};

export default ScoreBoard;
