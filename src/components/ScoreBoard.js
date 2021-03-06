import React from "react";
import "./scoreBoard.css";
import Swal from "sweetalert2";

const ScoreBoard = ({ score, distance, currentDistance }) => {
  let totalKmLeft;
  totalKmLeft = 1500 - distance;

  const gameOver = () => {
    Swal.fire({
      icon: "error",
      title: "GAME OVER...",
      text: `Your Score is : ${score}`,
      confirmButtonText: "Play Again",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(" ", " ", window.location.reload());
      }
    });
  };

  if (totalKmLeft < 1) {
    gameOver();
  }

  return (
    <div className="scoreBoard">
      <h2>Score Board</h2>
      <h3>Total Kilometer: 1500</h3>
      <h3>Distance: {distance}</h3>
      <h3>Current Distance: {currentDistance}</h3>
      <h3>Total Kilometer Left: {totalKmLeft < 0 ? 0 : totalKmLeft}</h3>
      <h3>Your Total Score: {score}</h3>
    </div>
  );
};

export default ScoreBoard;
