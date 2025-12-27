import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import noImage from "/src/assets/noImage.png";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";

function SearchItems() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [activeTab, setActiveTab] = useState("movie");
  const url = `https://api.themoviedb.org/3/search/multi?api_key=e7647e37d4a34ff0aad4bee7f30b20de&language=en-US&query=${query}`;
  const { data, loading, error } = useFetch(url);

  if (loading) {
    return (
      <>
        <Navbar isLoading={true} />
      </>
    );
  }

  if (error) {
    return (
      <p className="text-center text-2xl mt-50">something went wrong {error}</p>
    );
  }

  const allResults = Array.isArray(data) ? data : [];

  const movies = allResults.filter((item) => item.media_type === "movie");
  const tvShows = allResults.filter((item) => item.media_type === "tv");
  const people = allResults.filter((item) => item.media_type === "person");

  let filteredResults;

  if (activeTab === "movie") {
    filteredResults = movies;
  } else if (activeTab === "tv") {
    filteredResults = tvShows;
  } else {
    filteredResults = people;
  }

  return (
    <>
      <section className="flex flex-row justify-center  gap-8 mt-30 mb-10 w-full max-w-[1600px] m-auto xl:px-20 px-2.5">
        <div className="no-scrollbar flex md:flex-col flex-row md:w-[350px] w-full md:h-full h-[100px] md:mt-0  mt-17 md:rounded-xl bg-white border border-gray-300 md:sticky fixed top-0 overflow-x-auto">
          <h1 className="bg-[#01b4e4] p-5 rounded-t-xl text-lg text-white hidden md:block">
            Search Result
          </h1>

          <div
            onClick={() => setActiveTab("movie")}
            className={`md:mt-2.5 flex  justify-between items-center px-2.5 hover:bg-[#ebebeb] transition-all duration-200 cursor-pointer ${
              activeTab === "movie" ? "bg-[#ebebeb]" : ""
            }`}
          >
            <button className="p-2.5 ">Movies</button>
            <span className="rounded-xl bg-gray-300 py-1 px-2">
              {movies.length}
            </span>
          </div>
          <div
            onClick={() => setActiveTab("tv")}
            className={` flex  justify-between items-center px-2.5 hover:bg-[#ebebeb] transition-all duration-200 cursor-pointer ${
              activeTab === "tv" ? "bg-[#ebebeb]" : ""
            }`}
          >
            <button className="p-2.5 ">TV Series</button>
            <span className="rounded-xl bg-gray-300 py-1 px-2">
              {tvShows.length}
            </span>
          </div>
          <div
            onClick={() => setActiveTab("person")}
            className={`flex  justify-between items-center px-2.5 hover:bg-[#ebebeb] transition-all duration-200 cursor-pointer ${
              activeTab === "person" ? "bg-[#ebebeb]" : ""
            }`}
          >
            <button className="p-2.5 ">People</button>
            <span className="rounded-xl bg-gray-300 py-1 px-2">
              {people.length}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full md:mt-0 mt-20">
          {filteredResults.length > 0 ? (
            filteredResults.map((m) => (
              <MovieCard
                key={m.id}
                poster={
                  m.poster_path || m.profile_path
                    ? `https://image.tmdb.org/t/p/w500${
                        m.poster_path || m.profile_path
                      }`
                    : null
                }
                title={m.title || m.name}
                date={m.release_date || m.first_air_date}
                overview={
                  m.overview ||
                  (m.known_for
                    ? `Known for: ${m.known_for
                        .map((k) => k.title || k.name)
                        .join(", ")}`
                    : "")
                }
                movieId={m.id}
                type={m.media_type}
              />
            ))
          ) : (
            <p>No results found for "{query}" in this category</p>
          )}
        </div>
      </section>
    </>
  );
}

function MovieCard({ movieId, poster, title, date, overview, type }) {
  const posterImg = poster ? poster : noImage;
  return (
    <>
      <div className="flex  w-full gap-2.5 h-auto">
        <div className="flex gap-2.5 shadow-lg rounded-xl w-full">
          <div className="h-full w-[150px]">
            <Link to={`/showinfosearch/${type}/${movieId}`}>
              <img src={posterImg} alt="" className="size-full rounded-l-xl" />
            </Link>
          </div>
          <div className="p-2.5 w-full">
            <h1 className="text-sm">{title}</h1>
            <p className="text-[#ccc]">{date}</p>

            <p className="overviewSeachMovie mt-5  max-w-full line-clamp-3">
              {overview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchItems;
