import React from "react";
import { ReactComponent as LeftFlam } from "../../SVGs/stick-control/left-flam.svg";
import "../../dist/css/main.min.css";

const Sticking = ({ exercise }) => {
  return (
    <div className={`sticking sticking--${exercise.class}`}>
      <>
        <div className={`measure1 sticking--${exercise.class}`}>
          {exercise.measure1.sticking.split("").map((letter, i) => (
            <div key={i} className={`letter m1n${i + 1}`}>
              {letter === "C" ? <LeftFlam className="left-flam" /> : letter}
            </div>
          ))}
        </div>
        <div className={`measure2 sticking--${exercise.class}`}>
          {exercise.measure2.sticking.split("").map((letter, i) => (
            <div key={i} className={`letter m2n${i + 1}`}>
              {letter === "C" ? <LeftFlam className="left-flam" /> : letter}
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Sticking;
