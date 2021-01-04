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
  const [exerciseNumber, setExerciseNumber] = useState(1);
  const [exerciseSection, setExerciseSection] = useState(
    "Single Beat Combinations"
  );

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

  const exerciseSearchHandler = (e) => {
    e.preventDefault();

    switch (exerciseSection) {
      case "Single Beat Combinations":
        const singleBeatExercise = singleBeatCombinations.find(
          (exercise) => exercise.exercise.toString() === exerciseNumber
        );
        dispatch(setCurrentStickControlExercise(singleBeatExercise));
        break;
      case "Flam Beats":
        const flamExercise = flamBeats.find(
          (exercise) => exercise.exercise.toString() === exerciseNumber
        );
        dispatch(setCurrentStickControlExercise(flamExercise));
        break;

      default:
        dispatch(setCurrentStickControlExercise(singleBeatCombinations[0]));
        setExerciseNumber(1);
        setExerciseSection("Single Beat Combinations");
        break;
    }
  };

  const exerciseInvertHandler = () => {
    const currentExercise = { ...exercise };
    currentExercise.sticking = invertSticking(currentExercise.sticking);
    currentExercise.inverted = !currentExercise.inverted;
    dispatch(setCurrentStickControlExercise(currentExercise));
  };

  // Functions
  function invertSticking(sticking) {
    const inverted = Array.from(sticking, (letter) => {
      switch (letter) {
        case "R":
          letter = "L";
          return letter;
        case "L":
          letter = "R";
          return letter;
        case "F":
          letter = "C";
          return letter;
        case "C":
          letter = "F";
          return letter;
        default:
          return letter;
      }
    });
    const invertedFormatted = inverted.join("");
    return invertedFormatted;
  }

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
      <h3>Search</h3>
      <form onSubmit={exerciseSearchHandler}>
        <label htmlFor="searchExerciseNumber">Exercise Number: </label>
        <input
          type="number"
          name="searchExerciseNumber"
          min="1"
          max={exerciseSection === "Single Beat Combinations" ? "72" : "192"}
          value={exerciseNumber}
          onChange={(e) => setExerciseNumber(e.target.value)}
        />
        <label htmlFor="searchExerciseSection">Exercise Section: </label>
        <select
          name="searchExerciseSection"
          onChange={(e) => setExerciseSection(e.target.value)}
        >
          <option>Single Beat Combinations</option>
          <option>Flam Beats</option>
        </select>
        <button type="submit">Search</button>
      </form>
      <h3>Invert</h3>
      <button onClick={exerciseInvertHandler}>Invert Exercise</button>
    </>
  );
};

export default Controls;
