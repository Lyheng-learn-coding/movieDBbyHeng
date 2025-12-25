import React from "react";
import { useParams } from "react-router-dom";
import CastCrewInfo from "../Features/MovieInfo/CastCrewInfo";
function CastInfoPage() {
  const { castcrewid: id } = useParams();

  return (
    <>
      <CastCrewInfo castcrewid={id} />
    </>
  );
}

export default CastInfoPage;
