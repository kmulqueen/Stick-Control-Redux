import {
  GET_ALL_STICK_CONTROL_EXERCISES_REQUEST,
  GET_ALL_STICK_CONTROL_EXERCISES_SUCCESS,
  GET_ALL_STICK_CONTROL_EXERCISES_FAIL,
  GET_RANDOM_STICK_CONTROL_EXERCISE_REQUEST,
  GET_RANDOM_STICK_CONTROL_EXERCISE_SUCCESS,
  GET_RANDOM_STICK_CONTROL_EXERCISE_FAIL,
  GET_CURRENT_STICK_CONTROL_EXERCISE_REQUEST,
  GET_CURRENT_STICK_CONTROL_EXERCISE_SUCCESS,
  GET_CURRENT_STICK_CONTROL_EXERCISE_FAIL,
} from "../actionTypes/exerciseTypes";

export const getAllExercisesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_STICK_CONTROL_EXERCISES_REQUEST:
      return { loading: true };
    case GET_ALL_STICK_CONTROL_EXERCISES_SUCCESS:
      return { loading: false, exercises: action.payload };
    case GET_ALL_STICK_CONTROL_EXERCISES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getCurrentExerciseReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_STICK_CONTROL_EXERCISE_REQUEST:
      return {
        loading: true,
      };
    case GET_CURRENT_STICK_CONTROL_EXERCISE_SUCCESS:
      return {
        loading: false,
        exercise: action.payload,
      };
    case GET_CURRENT_STICK_CONTROL_EXERCISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getRandomExerciseReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RANDOM_STICK_CONTROL_EXERCISE_REQUEST:
      return {
        loading: true,
      };
    case GET_RANDOM_STICK_CONTROL_EXERCISE_SUCCESS:
      return {
        loading: false,
        exercise: action.payload,
      };
    case GET_RANDOM_STICK_CONTROL_EXERCISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
