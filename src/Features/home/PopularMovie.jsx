import React from "react";
import DisplayMovieCard from "./DisplayMovieCard";

function PopularMovie() {
  return (
    <>
      <section className=" ">
        <DisplayMovieCard
          sectionTitle="What's Popular"
          url="https://api.themoviedb.org/3/movie/popular?api_key=e7647e37d4a34ff0aad4bee7f30b20de"
          class1="xl:px-30 md:px-20 px-10 "
        />
      </section>
    </>
  );
}

export default PopularMovie;
