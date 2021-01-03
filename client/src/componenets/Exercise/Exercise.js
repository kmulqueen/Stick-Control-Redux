import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sticking from "../Sticking";
import Notation from "../Notation";
import { getAllStickControlExercises } from "../../actions/exerciseActions";

const Exercise = () => {
  const dispatch = useDispatch();
  const getAllExercises = useSelector((state) => state.getAllExercises);
  const { exercises } = getAllExercises;
  useEffect(() => {
    dispatch(getAllStickControlExercises());
  }, [dispatch]);

  return (
    <>
      {exercises ? (
        <>
          <Notation rhythm={exercises[0].count} />
          <Sticking sticking={exercises[0].sticking} />
        </>
      ) : null}
    </>
  );
};

export default Exercise;
