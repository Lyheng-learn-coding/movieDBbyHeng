import React from "react";
import IronMan from "/src/assets/IronMan.jpg";
import DisplayMovieCard from "./DisplayMovieCard";
import MainHeroSection from "./MainHeroSection";
function HeroSection() {
  return (
    <>
      <MainHeroSection
        url="https://api.themoviedb.org/3/trending/movie/week?api_key=e7647e37d4a34ff0aad4bee7f30b20de"
        mediaType="movie"
      />
      <section className="w-full h-full mt-[30px] ">
        <div className="relative text-white backdrop-blur-[20px]">
          <img src={IronMan} alt="" className="w-full h-[400px] object-cover" />
          <div className="absolute z-20 top-30 xl:pl-30 pl-5">
            <h1 className="xl:text-[3rem] text-[2.5rem] font-bold">Welcome.</h1>
            <h2 className="xl:text-[2rem] text-[1.7rem] font-medium">
              Millions of movies, TV shows and people to discover. Explore now.
            </h2>
          </div>
        </div>
        <DisplayMovieCard
          sectionTitle="Trending"
          url="https://api.themoviedb.org/3/trending/movie/day?api_key=e7647e37d4a34ff0aad4bee7f30b20de"
          class1="xl:px-30 md:px-20 px-10 "
        />
      </section>
    </>
  );
}

export default HeroSection;
