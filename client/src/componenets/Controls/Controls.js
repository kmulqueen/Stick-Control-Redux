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
  const [mixMeasure1Number, setMixMeasure1Number] = useState(1);
  const [mixMeasure1Section, setMixMeasure1Section] = useState(
    "Single Beat Combinations"
  );
  const [mixMeasure2Number, setMixMeasure2Number] = useState(1);
  const [mixMeasure2Section, setMixMeasure2Section] = useState(
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
    switch (exercise.section) {
      case "Single Beat Combinations":
        if (exercise.exercise !== 1) {
          dispatch(
            setCurrentStickControlExercise(
              singleBeatCombinations[exercise.exercise - 2]
            )
          );
        }
        break;
      case "Flam Beats":
        if (exercise.exercise !== 1) {
          dispatch(
            setCurrentStickControlExercise(flamBeats[exercise.exercise - 1])
          );
        }
        break;

      default:
        dispatch(setCurrentStickControlExercise(singleBeatCombinations[0]));
        break;
    }
  };

  const nextExerciseHandler = () => {
    switch (exercise.section) {
      case "Single Beat Combinations":
        if (exercise.exercise !== 72) {
          dispatch(
            setCurrentStickControlExercise(
              singleBeatCombinations[exercise.exercise]
            )
          );
        }
        break;
      case "Flam Beats":
        if (exercise.exercise !== 192) {
          dispatch(
            setCurrentStickControlExercise(flamBeats[exercise.exercise + 1])
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
          (exercise) =>
            exercise.section === exerciseSection &&
            exercise.exercise.toString() === exerciseNumber.toString()
        );
        dispatch(setCurrentStickControlExercise(singleBeatExercise));
        break;
      case "Flam Beats":
        const flamExercise = flamBeats.find(
          (exercise) =>
            exercise.section === exerciseSection &&
            exercise.exercise.toString() === exerciseNumber.toString()
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
    const currentExercise = JSON.parse(JSON.stringify(exercise));
    currentExercise.sticking = invertSticking(currentExercise.sticking);
    currentExercise.measure1.sticking = invertSticking(
      currentExercise.measure1.sticking
    );
    currentExercise.measure2.sticking = invertSticking(
      currentExercise.measure2.sticking
    );
    currentExercise.inverted = !currentExercise.inverted;
    dispatch(setCurrentStickControlExercise(currentExercise));
  };

  const measure1InvertHandler = () => {
    const currentExercise = JSON.parse(JSON.stringify(exercise));
    currentExercise.measure1.sticking = invertSticking(
      currentExercise.measure1.sticking
    );
    currentExercise.measure1.inverted = !currentExercise.measure1.inverted;
    dispatch(setCurrentStickControlExercise(currentExercise));
  };
  const measure2InvertHandler = () => {
    const currentExercise = JSON.parse(JSON.stringify(exercise));
    currentExercise.measure2.sticking = invertSticking(
      currentExercise.measure2.sticking
    );
    currentExercise.measure2.inverted = !currentExercise.measure2.inverted;
    dispatch(setCurrentStickControlExercise(currentExercise));
  };

  const mixExercisesHandler = (e) => {
    e.preventDefault();
    // Initialize exercise variables
    let exercise1, exercise2;

    // Create exercise1
    // If no exercise number was given choose random exercise
    if (!mixMeasure1Number || mixMeasure1Number === "") {
      switch (mixMeasure1Section) {
        case "Any":
          const randomIndexAnyExercise = Math.floor(
            Math.random() * exercises.length
          );
          const randomAnyExercise = exercises[randomIndexAnyExercise];
          exercise1 = { ...randomAnyExercise };
          break;
        case "Single Beat Combinations":
          const randomIndexSBCExercise = Math.floor(
            Math.random() * singleBeatCombinations.length
          );
          const randomSBCExercise =
            singleBeatCombinations[randomIndexSBCExercise];
          exercise1 = { ...randomSBCExercise };
          break;
        case "Flam Beats":
          const randomIndexFlamExercise = Math.floor(
            Math.random() * flamBeats.length
          );
          const randomFlamExercise = exercises[randomIndexFlamExercise];
          exercise1 = { ...randomFlamExercise };
          break;
        default:
          exercise1 = { ...exercises[0] };
          break;
      }
    } else {
      switch (mixMeasure1Section) {
        case "Any":
          // Get exercise at specified index from either SBC or FB
          // If number is below 73, exercise can come from either single or flam beats
          if (mixMeasure1Number < 73) {
            const randomSelection = Math.round(Math.random());
            if (randomSelection === 0) {
              const selectedSBCExercise =
                singleBeatCombinations[mixMeasure1Number - 1];
              exercise1 = { ...selectedSBCExercise };
            } else {
              const selectedFBExercise = flamBeats[mixMeasure1Number];
              exercise1 = { ...selectedFBExercise };
            }
          } else {
            // Can only be from FB
            const anyExercise = flamBeats[mixMeasure1Number];
            exercise1 = { ...anyExercise };
          }
          break;
        case "Single Beat Combinations":
          // Get exercise at specified index from SBC
          const sbcExercise = singleBeatCombinations[mixMeasure1Number - 1];
          exercise1 = { ...sbcExercise };
          break;
        case "Flam Beats":
          // Get exercise at specified index from FB
          const flamExercise = flamBeats[mixMeasure1Number];
          exercise1 = { ...flamExercise };
          break;
        default:
          exercise1 = { ...exercises[0] };
          break;
      }
    }

    // Create exercise2
    // If no exercise number was given choose random exercise
    if (!mixMeasure2Number || mixMeasure2Number === "") {
      switch (mixMeasure2Section) {
        case "Any":
          const randomIndexAnyExercise = Math.floor(
            Math.random() * exercises.length
          );
          const randomAnyExercise = exercises[randomIndexAnyExercise];
          exercise2 = { ...randomAnyExercise };
          break;
        case "Single Beat Combinations":
          const randomIndexSBCExercise = Math.floor(
            Math.random() * singleBeatCombinations.length
          );
          const randomSBCExercise =
            singleBeatCombinations[randomIndexSBCExercise];
          exercise2 = { ...randomSBCExercise };
          break;
        case "Flam Beats":
          const randomIndexFlamExercise = Math.floor(
            Math.random() * flamBeats.length
          );
          const randomFlamExercise = exercises[randomIndexFlamExercise];
          exercise2 = { ...randomFlamExercise };
          break;
        default:
          exercise2 = { ...exercises[0] };
          break;
      }
    } else {
      switch (mixMeasure2Section) {
        case "Any":
          // Get exercise at specified index from either SBC or FB
          // If number is below 73, exercise can come from either single or flam beats
          if (mixMeasure2Number < 73) {
            const randomSelection = Math.round(Math.random());

            if (randomSelection === 0) {
              const selectedSBCExercise =
                singleBeatCombinations[mixMeasure2Number - 1];
              exercise2 = { ...selectedSBCExercise };
            } else {
              const selectedFBExercise = flamBeats[mixMeasure2Number];
              exercise2 = { ...selectedFBExercise };
            }
          } else {
            // Can only be from FB
            const anyExercise = flamBeats[mixMeasure2Number];
            exercise2 = { ...anyExercise };
          }
          break;
        case "Single Beat Combinations":
          // Get exercise at specified index from SBC
          const sbcExercise = singleBeatCombinations[mixMeasure2Number - 1];
          exercise2 = { ...sbcExercise };
          break;
        case "Flam Beats":
          // Get exercise at specified index from FB
          const flamExercise = flamBeats[mixMeasure2Number];
          exercise2 = { ...flamExercise };
          break;
        default:
          exercise2 = { ...exercises[0] };
          break;
      }
    }

    // Create new exercise
    const newExercise = {
      section: "Mix Exercise",
      exercise: `${exercise1.section} No. ${exercise1.exercise} & ${exercise2.section} No. ${exercise2.exercise}`,
      measure1: { ...exercise1.measure1 },
      measure2: { ...exercise2.measure2 },
      sticking: exercise1.measure1.sticking + exercise2.measure2.sticking,
      count: exercise1.measure1.count.concat("|", exercise2.measure2.count),
      inverted: false,
    };

    // Create class based off of count
    switch (newExercise.count) {
      // 4/4 Time
      case "1+2+3+4+|1+2+3+4+":
        newExercise.class = "sc-sbc";
        break;
      case "1+2+3+4+|F+aF+aF+aF+a":
        newExercise.class = "sc-mix-sbc-flams-4-4";
        break;
      case "1+2+3+4+|Fe+aFe+aFe+aFe+a":
        newExercise.class = "sc-mix-sbc-flams-16s-4-4";
        break;
      case "1+2+3+4+|F+aF+aFeFaFeFa":
        newExercise.class = "sc-mix-sbc-flams-flams-taps-16s-4-4";
        break;
      case "1+2+3+4+|Fe+aFe+aFeFaFeFa":
        newExercise.class = "sc-mix-sbc-flams-16s-flams-taps-16s-4-4";
        break;
      // 2/4 Time
      case "F+aF+a|F+aF+a":
        newExercise.class = "sc-flams";
        break;
      case "F+aF+a|Fe+aFe+a":
        newExercise.class = "sc-flams-mix";
        break;
      case "F+aF+a|FeFaFeFa":
        newExercise.class = "sc-flams-mix-taps";
        break;
      case "Fe+aFe+a|F+aF+a":
        newExercise.class = "sc-mix-flams-16s-flams-2";
        break;
      case "Fe+aFe+a|Fe+aFe+a":
        newExercise.class = "sc-flams-16s";
        break;
      case "Fe+aFe+a|FeFaFeFa":
        newExercise.class = "sc-mix-flams-16s-flams-taps-16s-2";
        break;
      case "FeFaFeFa|F+aF+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-2";
        break;
      case "FeFaFeFa|Fe+aFe+a":
        newExercise.class = "sc-flams-taps-16s-flams-16s";
        break;
      case "FeFaFeFa|FeFaFeFa":
        newExercise.class = "sc-flams-taps-16s";
        break;
      // 4/4 + 2/4
      case "1+2+3+4+|F+aF+a":
        newExercise.class = "sc-mix-sbc-flams-4-2";
        break;
      case "1+2+3+4+|Fe+aFe+a":
        newExercise.class = "sc-mix-sbc-flams-16s-4-2";
        break;
      case "1+2+3+4+|FeFaFeFa":
        newExercise.class = "sc-mix-sbc-flams-taps-16s-4-2";
        break;
      case "F+aF+aF+aF+a|F+aF+a":
        newExercise.class = "sc-mix-flams-flams-4-2";
        break;
      case "F+aF+aF+aF+a|Fe+aFe+a":
        newExercise.class = "sc-mix-flams-flams-16s-4-2";
        break;
      case "F+aF+aF+aF+a|FeFaFeFa":
        newExercise.class = "sc-mix-flams-flams-taps-16s-4-2";
        break;
      case "Fe+aFe+aFe+aFe+a|F+aF+a":
        newExercise.class = "sc-mix-flams-16s-flams-4-2";
        break;
      case "Fe+aFe+aFe+aFe+a|Fe+aFe+a":
        newExercise.class = "sc-mix-flams-16s-flams-16s-4-2";
        break;
      case "Fe+aFe+aFe+aFe+a|FeFaFeFa":
        newExercise.class = "sc-mix-flams-16s-flams-taps-16s-4-2";
        break;
      case "FeFaFeFaFeFaFeFa|F+aF+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-4-2";
        break;
      case "FeFaFeFaFeFaFeFa|Fe+aFe+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-16s-4-2";
        break;
      case "FeFaFeFaFeFaFeFa|FeFaFeFa":
        newExercise.class = "sc-mix-flams-taps-16s-flams-taps-16s-4-2";
        break;
      // 2/4 + 4/4
      case "F+aF+a|1+2+3+4+":
        newExercise.class = "sc-mix-flams-sbc-2-4";
        break;
      case "F+aF+a|F+aF+aF+aF+a":
        newExercise.class = "sc-mix-flams-flams-2-4";
        break;
      case "F+aF+a|Fe+aFe+aFe+aFe+a":
        newExercise.class = "sc-mix-flams-flams-16s-2-4";
        break;
      case "F+aF+a|FeFaFeFaFeFaFeFa":
        newExercise.class = "sc-mix-flams-flams-taps-16s-2-4";
        break;
      case "Fe+aFe+a|1+2+3+4+":
        newExercise.class = "sc-mix-flams-16s-sbc-2-4";
        break;
      case "Fe+aFe+a|F+aF+aF+aF+a":
        newExercise.class = "sc-mix-flams-16s-flams-2-4";
        break;
      case "Fe+aFe+a|Fe+aFe+aFe+aFe+a":
        newExercise.class = "sc-mix-flams-16s-flams-16s-2-4";
        break;
      case "Fe+aFe+a|FeFaFeFaFeFaFeFa":
        newExercise.class = "sc-mix-flams-16s-flams-taps-16s-2-4";
        break;
      case "FeFaFeFa|1+2+3+4+":
        newExercise.class = "sc-mix-flams-taps-16s-sbc-2-4";
        break;
      case "FeFaFeFa|F+aF+aF+aF+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-2-4";
        break;
      case "FeFaFeFa|Fe+aFe+aFe+aFe+a":
        newExercise.class = "sc-mix-flams-taps-16s-flams-16s-2-4";
        break;
      case "FeFaFeFa|FeFaFeFaFeFaFeFa":
        newExercise.class = "sc-mix-flams-taps-16s-flams-taps-16s-2-4";
        break;
      default:
        return;
    }
    // Set new exercise to current exercise
    dispatch(setCurrentStickControlExercise(newExercise));
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
      <button onClick={measure1InvertHandler}>Invert Measure 1</button>
      <button onClick={measure2InvertHandler}>Invert Measure 2</button>
      <h3>Mix Exercises</h3>
      <p>*Remove number from 'Exercise' field(s) to pick a random exercise</p>
      <form onSubmit={mixExercisesHandler}>
        <label htmlFor="mixExerciseMeasure1Number">Measure 1 Exercise: </label>
        <input
          type="number"
          min="1"
          max={mixMeasure1Section === "Single Beat Combinations" ? "72" : "192"}
          name="mixExerciseMeasure1Number"
          value={mixMeasure1Number}
          onChange={(e) => setMixMeasure1Number(e.target.value)}
        />
        <label htmlFor="mixExerciseMeasure1Section">Measure 1 Section: </label>
        <select
          name="mixExerciseMeasure1Section"
          onChange={(e) => setMixMeasure1Section(e.target.value)}
        >
          <option>Single Beat Combinations</option>
          <option>Flam Beats</option>
          <option>Any</option>
        </select>
        <label htmlFor="mixExerciseMeasure2Number">Measure 2 Exercise: </label>
        <input
          type="number"
          min="1"
          max={mixMeasure2Section === "Single Beat Combinations" ? "72" : "192"}
          name="mixExerciseMeasure2Number"
          value={mixMeasure2Number}
          onChange={(e) => setMixMeasure2Number(e.target.value)}
        />
        <label htmlFor="mixExerciseMeasure2Section">Measure 2 Section: </label>
        <select
          name="mixExerciseMeasure2Section"
          onChange={(e) => setMixMeasure2Section(e.target.value)}
        >
          <option>Single Beat Combinations</option>
          <option>Flam Beats</option>
          <option>Any</option>
        </select>
        <button type="submit">Mix Exercises</button>
      </form>
    </>
  );
};

export default Controls;
