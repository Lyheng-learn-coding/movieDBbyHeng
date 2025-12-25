import React from "react";
import useFetch from "../../hook/useFetch";
import { Link } from "react-router-dom";
import noImage from "/src/assets/noImage.png";
import LinearIndeterminate from "../../Components/LinearProgress";
function DisplayMovieCard({ sectionTitle, url, class1 }) {
  const { data, loading, error } = useFetch(url);

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
    <div className={`MovieCardCon ${class1}`}>
      <h1 className="text-2xl font-bold my-5">{sectionTitle}</h1>
      <div>
        <div className="element-with-x-scroll pb-10 mt-5 flex overflow-x-auto snap-always snap-mandatory scroll-smooth gap-5">
          {data.map((m) => (
            <MovieCard
              key={m.id}
              movieId={m.id}
              posterImage={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                  : null
              }
              movieName={m.title}
              date={m.release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MovieCard({ movieId, posterImage, movieName, date }) {
  const posterImg = posterImage ? posterImage : noImage;
  return (
    <>
      <div className="snap-start shrink-0 w-[50%] md:w-1/7">
        <Link to={`/movieinfo/${movieId}`} className="block">
          <img src={posterImg} alt="" className="rounded-xl w-full " />
        </Link>
        <div>
          <h2 className="font-bold mt-1">{movieName}</h2>
          <p className="font-light text-[0.8rem] ">{date}</p>
        </div>
      </div>
    </>
  );
}

export default DisplayMovieCard;
