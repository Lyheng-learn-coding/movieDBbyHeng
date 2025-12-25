import React from "react";

import { useParams } from "react-router-dom";
import ShowInfo from "../Components/ShowInfo.jsx";
function TvInfoPage() {
  const { id: theId } = useParams();

  return (
    <>
      <ShowInfo
        id={theId}
        url={`https://api.themoviedb.org/3/tv/${theId}?api_key=e7647e37d4a34ff0aad4bee7f30b20de&append_to_response=aggregate_credits,reviews`}
      />
    </>
  );
}

export default TvInfoPage;
