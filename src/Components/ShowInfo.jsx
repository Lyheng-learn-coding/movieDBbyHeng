import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import useFetch from "../hook/useFetch";
import { FaArrowRight } from "react-icons/fa";
import noImage from "/src/assets/noImage.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

// this component use for both movie and tv series
function ShowInfo({ id, url }) {
  const { data: movie, loading, error } = useFetch(url);

  if (loading) {
    return (
      <>
        <Navbar isLoading={true} />
      </>
    );
  }

  if (error) {
    return <p className="text-center text-2xl">something went wrong {error}</p>;
  }

  return (
    <>
      <Navbar />
      <section className="max-w-[1600px] m-auto">
        <MovieDescription movie={movie} movieId={id} />
      </section>
      <Footer />
    </>
  );
}

function MovieDescription({ movie, movieId }) {
  const {
    backdrop_path,
    poster_path,
    genres,
    vote_average,
    overview,
    credits,
    aggregate_credits,
    reviews,
    status,
    original_language,
    budget,
    revenue,
  } = movie;

  // Handle differences between Movie and TV Series objects
  const isTvShow = !!movie.first_air_date || !!movie.name;
  const title = movie.title || movie.name;
  const original_title = movie.original_title || movie.original_name;
  const release_date = movie.release_date || movie.first_air_date;

  // Runtime for movies is a number, for TV it's an array of runtimes
  let runtime = movie.runtime;
  if (!runtime && movie.episode_run_time && movie.episode_run_time.length > 0) {
    runtime = movie.episode_run_time[0];
  }

  const imageUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : null;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : null;

  let genreNames = "";
  if (genres && Array.isArray(genres)) {
    genreNames = genres.map((g) => g.name).join(", ");
  }

  let duration = "N/A";
  if (runtime) {
    duration = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  }

  const percentage = Math.round(vote_average * 10);

  // Crew logic (Directors/Writers)
  let crewSource = [];
  if (credits && credits.crew) {
    crewSource = credits.crew;
  } else if (aggregate_credits && aggregate_credits.crew) {
    crewSource = aggregate_credits.crew;
  }

  const directors = crewSource
    .filter((p) => {
      let isDirector = p.job === "Director";
      if (!isDirector && p.jobs && Array.isArray(p.jobs)) {
        isDirector = p.jobs.some((j) => j.job === "Director");
      }
      return isDirector;
    })
    .slice(0, 1);

  const writers = crewSource
    .filter((p) => {
      if (p.job === "Director") {
        return false;
      }
      let isWriter = p.department === "Writing";
      if (!isWriter && p.jobs && Array.isArray(p.jobs)) {
        isWriter = p.jobs.some((j) => j.department === "Writing");
      }
      return isWriter;
    })
    .slice(0, 2);

  const displayCrew = [...directors, ...writers].slice(0, 3);

  // Cast logic: Prefer aggregate_credits for TV
  let castSource = [];
  if (
    aggregate_credits &&
    aggregate_credits.cast &&
    aggregate_credits.cast.length > 0
  ) {
    castSource = aggregate_credits.cast.map((actor) => ({
      ...actor,
      character:
        actor.roles && actor.roles.length > 0
          ? actor.roles[0].character
          : actor.character,
    }));
  } else if (credits && credits.cast) {
    castSource = credits.cast;
  }

  const cast = castSource.slice(0, 20);

  let movieReviews = [];
  if (reviews && reviews.results) {
    movieReviews = reviews.results;
  }

  const viewMoreLink = isTvShow
    ? `/viewmoretv/${movieId}`
    : `/viewmore/${movieId}`;

  return (
    <>
      <div
        className="bg-cover bg-no-repeat mt-17 py-10 relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="flex xl:flex-row flex-col w-full h-full p-5  sm:px-20 px-5 gap-7 after:absolute  after:bg-black/50 after:inset-0">
          <div className="  z-10">
            <img
              src={posterUrl}
              alt={title}
              className="rounded-xl object-cover xl:max-w-[500px]  h-[450px]  "
            />
          </div>

          <div className="text-white flex gap-2.5 flex-col z-10">
            <h1 className="text-2xl font-medium"> {title}</h1>
            <p className="text-xl font-light mb-2.5">
              {release_date} . <span>{genreNames}</span> .{" "}
              <span>{duration}</span>
            </p>

            <h2 className="bg-black rounded-full p-5 text-white text-2xl size-20 flex justify-center items-center font-medium border-2 border-white">
              {percentage}
              <sup className="text-[0.7rem]">%</sup>
            </h2>

            <h2 className="text-xl ">Overview</h2>
            <p className="text-xl font-light mb-2.5">{overview}</p>
            <div className="grid grid-cols-3 w-full">
              {displayCrew.map((person, index) => (
                <div key={index}>
                  <p className="font-bold">{person.name}</p>
                  <p>
                    {person.job ||
                      (person.jobs && person.jobs[0] && person.jobs[0].job)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-2.5 xl:px-20 w-full pt-5 mb-5">
        <h1 className="text-2xl font-medium">Top Billed Cast</h1>
        <div className="flex xl:flex-row flex-col">
          <div className="w-full">
            <div className="element-with-x-scroll pb-10 mt-5 flex overflow-x-auto snap-always snap-mandatory scroll-smooth gap-5 md:max-w-[1100px]   ">
              {cast.map((actor) => (
                <ActorList
                  key={actor.id}
                  actor={actor}
                  castcrewid={actor.id}
                  isTvShow={isTvShow}
                />
              ))}

              {/* View More Button linking to the new page */}
              <div className="snap-start shrink-0 w-[50%] md:w-1/7 flex items-center justify-center">
                <Link
                  to={viewMoreLink}
                  className="cursor-pointer font-bold text-lg hover:underline flex items-center gap-2.5"
                >
                  View More <FaArrowRight className="-mb-1" />
                </Link>
              </div>
            </div>

            {/* comment section for desktop  */}
            {movieReviews.length > 0 && (
              <ReviewComment
                class1="xl:block hidden"
                review={movieReviews[0]}
              />
            )}
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-2.5 xl:p-5  xl:mt-2.5 mt-10 md:pt-0 pt-2.5   shadow-left h-full w-full">
              <div>
                <h1 className="text-sm font-bold">Original Title</h1>
                <p className="text-sm">{original_title}</p>
              </div>
              <div>
                <h1 className="text-sm font-bold">Status</h1>
                <p className="text-sm">{status}</p>
              </div>
              <div>
                <h1 className="text-sm font-bold">Original Language</h1>
                <p className="text-sm">{original_language}</p>
              </div>
              {budget !== undefined && (
                <div>
                  <h1 className="text-sm font-bold">Budget</h1>
                  <p className="text-sm">$ {budget.toFixed(2)}</p>
                </div>
              )}
              {revenue !== undefined && (
                <div>
                  <h1 className="text-sm font-bold">Revenue</h1>
                  <p className="text-sm">$ {revenue.toFixed(2)}</p>
                </div>
              )}
            </div>

            {/* comment section for mobile */}
            {movieReviews.length > 0 && (
              <ReviewComment
                class2="xl:hidden block "
                review={movieReviews[0]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );

  function ReviewComment({ class1, class2, review }) {
    if (!review) return null;
    const { author, content, created_at, author_details } = review;

    let avatarPath = null;
    if (author_details && author_details.avatar_path) {
      avatarPath = author_details.avatar_path;
    }

    let avatarUrl = null;
    if (avatarPath) {
      if (avatarPath.startsWith("/http")) {
        avatarUrl = avatarPath.substring(1);
      } else {
        avatarUrl = `https://image.tmdb.org/t/p/w100_and_h100_face${avatarPath}`;
      }
    }

    return (
      <>
        <div
          className={`${class1} ${class2} w-auto border-t border-[#ccc] mt-10 `}
        >
          <h1 className="text-2xl font-medium mb-5 mt-10 ">Review Comment</h1>
          <div className="shadow-Com w-full p-10 pl-5 rounded-xl">
            <div className="profile flex gap-5 items-center mb-2.5">
              <img src={avatarUrl} className="size-10 block rounded-full" />
              <div className="flex flex-col ">
                <h1 className="text-2xl font-bold">A review by {author}</h1>
                <p className="font-light text-xl text-[1rem]">
                  {new Date(created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="xl:text-[1rem] text-[0.8rem] text-justify">
              {content}
            </p>
          </div>
        </div>
      </>
    );
  }

  function ActorList({ actor, castcrewid, isTvShow }) {
    const routeName = isTvShow ? "tvcastcrewinfo" : "castcrewinfo";
    const imageUrl = actor.profile_path
      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
      : noImage;
    return (
      <>
        <div className="snap-start shrink-0 sm:w-[30%] w-[50%] xl:w-1/5  rounded-xl shadow-xl">
          <Link to={`/${routeName}/${castcrewid}`}>
            <img
              src={imageUrl}
              alt={actor.name}
              className="rounded-t-xl w-full cursor-pointer "
            />
          </Link>
          <div className="p-2 pb-5 ">
            <h2 className="font-bold xl:text-xl md:text-2xl">{actor.name}</h2>
            <p className="font-light xl:text-[0.9rem] md:text-[1rem] ">
              {actor.character}
            </p>
          </div>
        </div>
      </>
    );
  }
}
export default ShowInfo;
