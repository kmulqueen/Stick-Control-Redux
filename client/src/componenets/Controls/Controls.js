import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStickControlExercises,
  setCurrentStickControlExercise,
} from "../../actions/exerciseActions";

const Controls = () => {
  const dispatch = useDispatch();
  // Redux state
  const getCurrentExercise = useSelector((state) => state.getCurrentExercise);
  const getAllExercises = useSelector((state) => state.getAllExercises);
  const { exercise, loading: exerciseLoading } = getCurrentExercise;
  const { exercises, loading: allExercisesLoading } = getAllExercises;

  // Component state
  const [singleBeatCombinations, setSingleBeatCombinations] = useState([]);
  const [flamBeats, setFlamBeats] = useState([]);

  // Event handlers
  const randomExerciseHandler = () => {
    const randomIndex = Math.floor(Math.random() * exercises.length);
    const randomExercise = exercises[randomIndex];
    dispatch(setCurrentStickControlExercise(randomExercise));
  };

  const randomSingleBeatExerciseHandler = () => {
    const randomIndex = Math.floor(
      Math.random() * singleBeatCombinations.length
    );
    const randomSingleBeatExercise = singleBeatCombinations[randomIndex];
    dispatch(setCurrentStickControlExercise(randomSingleBeatExercise));
  };

  const randomFlamBeatExerciseHandler = () => {
    const randomIndex = Math.floor(Math.random() * flamBeats.length);
    const randomFlamBeatExercise = flamBeats[randomIndex];
    dispatch(setCurrentStickControlExercise(randomFlamBeatExercise));
  };

  const previousExerciseHandler = () => {
    const currentExercise = { ...exercise };

    switch (currentExercise.section) {
      case "Single Beat Combinations":
        if (currentExercise.exercise !== 1) {
          dispatch(
            setCurrentStickControlExercise(
              singleBeatCombinations[currentExercise.exercise - 2]
            )
          );
        }
        break;
      case "Flam Beats":
        if (currentExercise.exercise !== 1) {
          dispatch(
            setCurrentStickControlExercise(
              flamBeats[currentExercise.exercise - 1]
            )
          );
        }
        break;

      default:
        dispatch(setCurrentStickControlExercise(singleBeatCombinations[0]));
        break;
    }
  };

  const nextExerciseHandler = () => {
    const currentExercise = { ...exercise };

    switch (currentExercise.section) {
      case "Single Beat Combinations":
        if (currentExercise.exercise !== 72) {
          dispatch(
            setCurrentStickControlExercise(
              singleBeatCombinations[currentExercise.exercise]
            )
          );
        }
        break;
      case "Flam Beats":
        if (currentExercise.exercise !== 192) {
          dispatch(
            setCurrentStickControlExercise(
              flamBeats[currentExercise.exercise + 1]
            )
          );
        }
        break;

      default:
        dispatch(setCurrentStickControlExercise(singleBeatCombinations[0]));
        break;
    }
  };

  // Get all exercises if exercises state is empty
  useEffect(() => {
    if (!exercises && !allExercisesLoading) {
      dispatch(getAllStickControlExercises());
    }
  }, [exercises, allExercisesLoading, dispatch]);

  // Set initial exercise
  useEffect(() => {
    if (exercises && !exercise && !exerciseLoading) {
      dispatch(setCurrentStickControlExercise(exercises[0]));
    }
  }, [exercises, exercise, exerciseLoading, dispatch]);

  // Set state for single beat combinations & flam beats
  useEffect(() => {
    if (exercises) {
      setSingleBeatCombinations(exercises.slice(0, 72));
      setFlamBeats(exercises.slice(71));
    }
  }, [exercises]);

  return (
    <>
      <h3>Random</h3>
      <button onClick={randomExerciseHandler}>Random Exercise</button>
      <button onClick={randomSingleBeatExerciseHandler}>
        Random Single Beat Combination Exercise
      </button>
      <button onClick={randomFlamBeatExerciseHandler}>
        Random Flam Beat Exercise
      </button>
      <h3>Sequential</h3>
      <button onClick={previousExerciseHandler}>Previous Exercise</button>
      <button onClick={nextExerciseHandler}>Next Exercise</button>
    </>
  );
};

export default Controls;
