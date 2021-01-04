import React from "react";
import { ReactComponent as LeftFlam } from "../../SVGs/stick-control/left-flam.svg";
import "./sticking.css";

const Sticking = ({ sticking }) => {
  const stickingArray = Array.from(sticking, (letter) => {
    if (letter === "C") {
      return <LeftFlam className="left-flam" />;
    } else {
      return letter;
    }
  });

  return (
    <div className="sticking">
      {stickingArray.map((letter, i) => (
        <div key={i} className="letter">
          {letter}
        </div>
      ))}
    </div>
  );
};

export default Sticking;
