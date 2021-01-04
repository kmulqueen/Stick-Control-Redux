import React from "react";
import { useSelector } from "react-redux";
import Sticking from "../Sticking";
import Notation from "../Notation";
import Controls from "../Controls";

const Exercise = () => {
  const getCurrentExercise = useSelector((state) => state.getCurrentExercise);
  const { exercise, loading } = getCurrentExercise;

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : exercise ? (
        <>
          <h3>
            {exercise.section} - No. {exercise.exercise}
          </h3>
          <Notation rhythm={exercise.count} />
          <Sticking sticking={exercise.sticking} />
          <Controls />
        </>
      ) : (
        <>
          <h3>No exercise selected.</h3>
          <Controls />
        </>
      )}
    </>
  );
};

export default Exercise;
