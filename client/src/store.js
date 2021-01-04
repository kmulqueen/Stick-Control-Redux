import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllExercisesReducer,
  getRandomExerciseReducer,
  getCurrentExerciseReducer,
} from "./reducers/exerciseReducer";

const reducer = combineReducers({
  getAllExercises: getAllExercisesReducer,
  getCurrentExercise: getCurrentExerciseReducer,
  getRandomExercise: getRandomExerciseReducer,
});

const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
