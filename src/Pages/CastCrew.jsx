import React from "react";
import { useParams } from "react-router-dom";
import CastAndCrew from "../Features/MovieInfo/CastAndCrew";
function CastCrew() {
  const { id: theId } = useParams();
  return (
    <>
      <CastAndCrew id={theId} />
    </>
  );
}

export default CastCrew;
