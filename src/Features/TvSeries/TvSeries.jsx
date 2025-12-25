import React, { useState, useEffect } from "react";
import noImage from "/src/assets/noImage.png";
import { Link } from "react-router-dom";
import Navbar from "/src/Components/Navbar";
import Footer from "/src/Components/Footer";
import MainHeroSection from "../home/MainHeroSection";
function TvSeries() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=e7647e37d4a34ff0aad4bee7f30b20de&page=${page}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const resData = await res.json();

        if (!ignore) {
          if (page === 1) {
            setData(resData.results);
          } else {
            setData((prev) => [...prev, ...resData.results]);
          }
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [page]);

  if (loading && page === 1) {
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
      <main className="max-w-[1600px] m-auto">
        <MainHeroSection
          url="https://api.themoviedb.org/3/trending/tv/week?api_key=e7647e37d4a34ff0aad4bee7f30b20de"
          mediaType="tv"
        />
        <section className="w-full">
          <div className="grid md:grid-cols-5 grid-cols-2  w-full gap-5 py-10 md:px-20 px-5">
            {data.map((m) => (
              <MovieCard
                key={m.id}
                movieId={m.id}
                posterImage={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                    : null
                }
                movieName={m.name}
                date={m.first_air_date}
              />
            ))}
          </div>
          <div className="w-full flex justify-center mb-10 md:px-20 px-5">
            <button
              onClick={() => setPage((prev) => (prev += 1))}
              disabled={loading}
              className="bg-[#01b4e4] text-2xl text-white py-3 px-8 rounded-xl w-full font-bold hover:bg-[#4cccef] transition duration-300 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function MovieCard({ movieId, posterImage, movieName, date }) {
  const posterImg = posterImage ? posterImage : noImage;
  return (
    <>
      <div className="shadow-lg rounded-xl">
        <Link to={`/tvinfo/${movieId}`} className="block">
          <img src={posterImg} alt="" className="rounded-t-xl w-full " />
        </Link>
        <div className="p-2.5">
          <h2 className="font-bold mt-1 sm:text-xl text-lg line-clamp-2">
            {movieName}
          </h2>
          <p className="font-light text-[1rem] ">{date}</p>
        </div>
      </div>
    </>
  );
}

export default TvSeries;
