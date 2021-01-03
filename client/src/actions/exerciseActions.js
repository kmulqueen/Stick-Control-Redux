import axios from "axios";
import {
  GET_ALL_STICK_CONTROL_EXERCISES_REQUEST,
  GET_ALL_STICK_CONTROL_EXERCISES_SUCCESS,
  GET_ALL_STICK_CONTROL_EXERCISES_FAIL,
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
