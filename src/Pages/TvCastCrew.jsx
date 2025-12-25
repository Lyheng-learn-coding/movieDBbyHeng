import React from "react";
import { useParams } from "react-router-dom";
import TvCastAndCrew from "../Features/TvSeries/TvCastAndCrew";

function TvCastCrew() {
  const { id: theId } = useParams();
  return (
    <>
      <TvCastAndCrew id={theId} />
    </>
  );
}

export default TvCastCrew;
