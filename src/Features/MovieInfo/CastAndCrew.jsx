import React from "react";
import useFetch from "../../hook/useFetch";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import noImage from "/src/assets/noImage.png";

function CastAndCrew({ id }) {
  // Guard clause against bad IDs which cause the [object Object] 404 error
  const isValidId = id && id !== "[object Object]" && id !== "undefined";

  const {
    data: movie,
    loading,
    error,
  } = useFetch(
    isValidId
      ? `https://api.themoviedb.org/3/movie/${id}?api_key=e7647e37d4a34ff0aad4bee7f30b20de&append_to_response=credits`
      : null // Do not fetch if ID is invalid
  );

  if (!isValidId) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Movie ID</h1>
        <Link to="/" className="text-blue-500 underline">
          Go Home
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar isLoading={true} />
      </>
    );
  }

  if (error) {
    return (
      <p className="text-center text-2xl pt-20">
        Something went wrong: {error}
      </p>
    );
  }

  // Ensure movie data is valid before destructuring
  if (!movie || !movie.credits) {
    return <p className="text-center text-2xl pt-20">No details available.</p>;
  }

  const { title, poster_path, credits } = movie;
  const cast = credits !== null && credits !== undefined ? credits.cast : [];
  const crew = credits !== null && credits !== undefined ? credits.crew : [];
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <>
      <Navbar />
      <section className="w-full h-full pt-[90px] max-w-[1600px] m-auto">
        <div className="bg-[#4a4a4a] p-5 w-full px-10 flex gap-5 ">
          <Link to={`/movieinfo/${id}`}>
            <img
              src={posterUrl}
              alt={title}
              className="w-20 rounded shadow-lg"
            />
          </Link>
          <div>
            <h1 className="font-bold text-white text-3xl">{title}</h1>
            <Link
              to={`/movieinfo/${id}`}
              className="text-gray-300 hover:text-white underline flex items-center gap-2.5"
            >
              <FaArrowLeft className="-mb-1" /> Back to main
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-10 p-10">
          {/* Cast Section */}
          <div>
            <h2 className="text-2xl font-bold mb-5">
              Cast
              <span className="text-gray-500 text-lg"> ({cast.length})</span>
            </h2>
            <div className="flex flex-col gap-5">
              {cast.map((person) => (
                <Cast
                  key={`${person.id}-${person.character}`}
                  person={person}
                  castcrewid={person.id}
                />
              ))}
            </div>
          </div>

          {/* Crew Section */}
          <div>
            <h2 className="text-2xl font-bold mb-5 ">
              Crew
              <span className="text-gray-500 text-lg"> ({crew.length})</span>
            </h2>
            <div className="flex flex-col gap-5">
              {crew.map((person, index) => (
                <Crew
                  key={`${person.id}-${person.job}-${index}`}
                  person={person}
                  castcrewid={person.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function Cast({ person, castcrewid }) {
  const { profile_path, name, character } = person;
  const imageUrl = profile_path
    ? `https://image.tmdb.org/t/p/w185${profile_path}`
    : noImage;

  return (
    <div className="flex gap-5 ">
      <div className="shrink-0">
        <Link to={`/castcrewinfo/${castcrewid}`}>
          <img
            src={imageUrl}
            alt={name}
            className="w-16 h-24 object-cover rounded shadow"
          />
        </Link>
      </div>
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-600">{character}</p>
      </div>
    </div>
  );
}

function Crew({ person, castcrewid }) {
  const { profile_path, name, job, department } = person;
  const imageUrl = profile_path
    ? `https://image.tmdb.org/t/p/w185${profile_path}`
    : noImage;

  return (
    <div className="flex gap-5 ">
      <div className="shrink-0">
        <Link to={`/castcrewinfo/${castcrewid}`}>
          <img
            src={imageUrl}
            alt={name}
            className="w-16 h-24 object-cover rounded shadow"
          />
        </Link>
      </div>
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-800">
          {job} <span className="text-sm text-gray-500">({department})</span>
        </p>
      </div>
    </div>
  );
}

export default CastAndCrew;
