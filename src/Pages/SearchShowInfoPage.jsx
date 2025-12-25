import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import ShowInfo from "../Components/ShowInfo.jsx";
import { useParams } from "react-router-dom";
function SearchShowPage() {
  const { type, id } = useParams();
  const creditsParam = type === "tv" ? "aggregate_credits" : "credits";
  return (
    <>
      <ShowInfo
        id={id}
        url={`https://api.themoviedb.org/3/${type}/${id}?api_key=e7647e37d4a34ff0aad4bee7f30b20de&append_to_response=${creditsParam},reviews`}
      />
    </>
  );
}

export default SearchShowPage;
