import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sticking from "../Sticking";
import Notation from "../Notation";
import Controls from "../Controls";
import { getRandomStickControlExercise } from "../../actions/exerciseActions";

const Exercise = () => {
  const dispatch = useDispatch();

  const getCurrentExercise = useSelector((state) => state.getCurrentExercise);
  const { exercise, loading } = getCurrentExercise;

  useEffect(() => {
    if (!exercise && !loading) {
      dispatch(getRandomStickControlExercise());
    }
    console.log(exercise);
  }, [exercise, dispatch]);

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
      ) : null}
    </>
  );
};

export default Exercise;
