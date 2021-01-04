import axios from "axios";
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

export const getAllStickControlExercises = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STICK_CONTROL_EXERCISES_REQUEST });

    const res = await axios.get("/api/sc-exercises");

    dispatch({
      type: GET_ALL_STICK_CONTROL_EXERCISES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_STICK_CONTROL_EXERCISES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRandomStickControlExercise = () => async (dispatch) => {
  try {
    dispatch({ type: GET_RANDOM_STICK_CONTROL_EXERCISE_REQUEST });

    const res = await axios.get("/api/sc-exercises/random");

    dispatch({
      type: GET_RANDOM_STICK_CONTROL_EXERCISE_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: GET_CURRENT_STICK_CONTROL_EXERCISE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RANDOM_STICK_CONTROL_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
