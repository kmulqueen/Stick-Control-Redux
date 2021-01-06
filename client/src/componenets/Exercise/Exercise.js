import React from "react";
import { useSelector } from "react-redux";
import Sticking from "../Sticking";
import Notation from "../Notation";
import Controls from "../Controls";

const Exercise = () => {
  const getCurrentExercise = useSelector((state) => state.getCurrentExercise);
  const getAllExercises = useSelector((state) => state.getAllExercises);
  const { loading: allLoading } = getAllExercises;
  const { exercise, loading } = getCurrentExercise;

  return (
    <>
      {loading || allLoading ? (
        <h3>Loading...</h3>
      ) : exercise ? (
        <>
          {exercise.section !== "Mix Exercise" ? (
            <h3>
              {exercise.section} - No. {exercise.exercise}{" "}
              {exercise.inverted ? "- Inverted" : null}
            </h3>
          ) : (
            <h3>
              {exercise.section} - {exercise.exercise}{" "}
              {exercise.inverted ? "- Inverted" : null}
            </h3>
          )}

          <Notation rhythm={exercise.count} />
          <Sticking sticking={exercise.sticking} />
          <Controls />
        </>
      ) : !exercise && !loading ? (
        <>
          <h3>No exercise selected.</h3>
          <Controls />
        </>
      ) : null}
    </>
  );
};

export default Exercise;
