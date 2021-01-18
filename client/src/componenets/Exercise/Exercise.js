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
              {exercise.section} - No. {exercise.exercise}
              {exercise.inverted &&
              exercise.measure1.inverted &&
              exercise.measure2.inverted
                ? " - Inverted & Measure 1 Inverted & Measure 2 Inverted"
                : exercise.inverted && exercise.measure1.inverted
                ? " - Inverted & Measure 1 Inverted"
                : exercise.inverted && exercise.measure2.inverted
                ? " - Inverted & Measure 2 Inverted"
                : exercise.measure1.inverted && exercise.measure2.inverted
                ? " - Measure 1 Inverted & Measure 2 Inverted"
                : exercise.inverted
                ? " - Inverted"
                : exercise.measure1.inverted
                ? " - Measure 1 Inverted"
                : exercise.measure2.inverted
                ? " - Measure 2 Inverted"
                : null}
            </h3>
          ) : (
            <h3>
              {exercise.section} - {exercise.exercise}
              {exercise.inverted &&
              exercise.measure1.inverted &&
              exercise.measure2.inverted
                ? " - Inverted & Measure 1 Inverted & Measure 2 Inverted"
                : exercise.inverted && exercise.measure1.inverted
                ? " - Inverted & Measure 1 Inverted"
                : exercise.inverted && exercise.measure2.inverted
                ? " - Inverted & Measure 2 Inverted"
                : exercise.measure1.inverted && exercise.measure2.inverted
                ? " - Measure 1 Inverted & Measure 2 Inverted"
                : exercise.inverted
                ? " - Inverted"
                : exercise.measure1.inverted
                ? " - Measure 1 Inverted"
                : exercise.measure2.inverted
                ? " - Measure 2 Inverted"
                : null}
            </h3>
          )}

          <Notation rhythm={exercise.count} />
          <Sticking exercise={exercise} />
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
