import {
  GET_ALL_EXERCISES_REQUEST,
  GET_ALL_EXERCISES_SUCCESS,
  GET_ALL_EXERCISES_FAIL,
} from "../actionTypes/exerciseTypes";

export const getAllExercisesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_EXERCISES_REQUEST:
      return { loading: true };
    case GET_ALL_EXERCISES_SUCCESS:
      return { loading: false, exercises: action.payload };
    case GET_ALL_EXERCISES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
