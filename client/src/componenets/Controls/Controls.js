import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRandomStickControlExercise,
  getAllStickControlExercises,
} from "../../actions/exerciseActions";

const Controls = () => {
  const dispatch = useDispatch();
  const getCurrentExercise = useSelector((state) => state.getCurrentExercise);
  const getAllExercises = useSelector((state) => state.getAllExercises);
  const { exercise } = getCurrentExercise;
  const { exercises, loading: allExercisesLoading } = getAllExercises;

  const randomExerciseHandler = () => {
    dispatch(getRandomStickControlExercise());
  };

  // Get all exercises if exercises state is empty
  useEffect(() => {
    if (!exercises && !allExercisesLoading) {
      dispatch(getAllStickControlExercises());
    }
  }, [exercises, allExercisesLoading, dispatch]);

  // Set initial exercise if exercises state is not empty
  useEffect(() => {
    if (exercises) {
      console.log("exercises now has length");
    }
  }, [exercises]);

  return (
    <>
      <button onClick={randomExerciseHandler}>Random Exercise</button>
    </>
  );
};

export default Controls;
