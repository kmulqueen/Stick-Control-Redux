import React from "react";
import { useDispatch } from "react-redux";
import { getRandomStickControlExercise } from "../../actions/exerciseActions";

const Controls = () => {
  const dispatch = useDispatch();

  const randomExerciseHandler = () => {
    dispatch(getRandomStickControlExercise());
  };

  return (
    <>
      <button onClick={randomExerciseHandler}>Random Exercise</button>
    </>
  );
};

export default Controls;
