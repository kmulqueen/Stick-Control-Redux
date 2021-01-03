import React, { useEffect, useState } from "react";
import stickings from "../../stickings.json";
import Sticking from "../Sticking";
import Notation from "../Notation";

const Exercise = () => {
  const [singleBeatCombinations, setSingleBeatCombinations] = useState(
    stickings.singleBeatCombinations
  );
  const [flamBeats, setFlamBeats] = useState(stickings.flamBeats);

  return (
    <>
      <Notation rhythm={singleBeatCombinations[0].count} />
      <Sticking sticking={singleBeatCombinations[0].sticking} />
    </>
  );
};

export default Exercise;
