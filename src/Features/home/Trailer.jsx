import React, { useEffect, useState } from "react";
// import IronMan from "../assets/IronMan.jpg";
import useFetch from "../../hook/useFetch";

import LinearIndeterminate from "../../Components/LinearProgress";

function Trailer() {
  const { data, loading, error } = useFetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=e7647e37d4a34ff0aad4bee7f30b20de"
  );

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full z-100">
        <LinearIndeterminate />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-2xl">something went wrong {error}</p>;
  }

  return (
    <section className=" BG-section  xl:px-30 md:px-20 px-10 py-10  ">
      <h1 className="text-2xl font-bold my-5 text-white">Trailer</h1>
      <div
        className="element-with-x-scroll pb-10 mt-5 flex overflow-x-auto snap-always snap-mandatory scroll-smooth gap-5
      "
      >
        {data.map((m) => (
          <TrailerCard
            key={m.id}
            movieId={m.id}
            fallbackImage={`https://image.tmdb.org/t/p/w500${
              m.backdrop_path || m.poster_path
            }`}
            movieName={m.title}
            date={m.release_date}
          />
        ))}
      </div>
    </section>
  );
}

function TrailerCard({ movieId, movieName, date, fallbackImage }) {
  const [videoKey, setVideoKey] = useState(null);

  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e7647e37d4a34ff0aad4bee7f30b20de`;
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        const trailer = data.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (error) {
        console.error("Failed to fetch trailer", error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return (
    <>
      <div className="shrink-0 snap-start w-full sm:w-[50%] md:w-1/4">
        {videoKey ? (
          <iframe
            className="w-full rounded-xl aspect-video"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title={movieName}
            allowFullScreen
            loading="lazy"
          ></iframe>
        ) : (
          <img
            src={fallbackImage}
            alt={movieName}
            className="w-full rounded-xl"
          />
        )}
        <div className="text-white">
          <h2 className="text-center ">{movieName}</h2>
          {/* here is about trailer, teaser , episode  */}
          <h2 className="text-center">{date}</h2>
        </div>
      </div>
    </>
  );
}

export default Trailer;
