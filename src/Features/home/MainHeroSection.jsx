import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaPlay,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import useFetch from "../../hook/useFetch";
import { VscChromeClose } from "react-icons/vsc";

import LinearIndeterminate from "../../Components/LinearProgress";

function MainHeroSection({ url, mediaType }) {
  const { data, loading, error } = useFetch(url);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenTrailer, setOpenTrailer] = useState(false);

  function openTrailer() {
    setOpenTrailer(!isOpenTrailer);
  }

  function closeTrailer() {
    setOpenTrailer(false);
  }

  useEffect(() => {
    if (data && data.length > 0) {
      // Get first 5 trending movies for the slider
      setMovies(data.slice(0, 5));
    }
  }, [data]);

  // Auto-slide effect
  useEffect(() => {
    if (movies.length === 0 || isOpenTrailer) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [movies, isOpenTrailer]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#111] text-white flex items-center justify-center">
        <div className="fixed top-0 left-0 w-full z-100">
          <LinearIndeterminate />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full bg-[#111] text-red-500 flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];
  const backdrop = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;

  return (
    <>
      <section className="relative w-full h-screen text-white group overflow-hidden ">
        {/* Background Image with Fade Transition */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
          <div
            key={currentMovie.id}
            className="absolute inset-0 animate-fadeIn"
          >
            <img
              src={backdrop}
              alt={currentMovie.title}
              className="w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-5 md:px-12 max-w-[900px]">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight animate-slideUp">
            {currentMovie.title || currentMovie.name}
          </h1>

          <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-6 animate-slideUp delay-100">
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span className="text-white font-semibold">
                {currentMovie.vote_average?.toFixed(1)}
              </span>
            </div>
            <span className="bg-white/20 px-2 py-0.5 rounded text-white text-xs">
              HD
            </span>
            <div className="flex items-center gap-1">
              <FaCalendarAlt />
              <span>
                {currentMovie.release_date || currentMovie.first_air_date}
              </span>
            </div>
            <span className="uppercase border border-white/30 px-2 rounded text-xs">
              {currentMovie.original_language}
            </span>
          </div>

          <p className="text-gray-300 text-sm md:text-lg mb-8 line-clamp-3 md:line-clamp-4 max-w-[700px] animate-slideUp delay-200">
            {currentMovie.overview}
          </p>

          <div className="flex items-center gap-4 animate-slideUp delay-300">
            <button
              onClick={openTrailer}
              className="bg-[#00acc1] hover:bg-[#00acc1]/80 text-white flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className="bg-white text-[#00acc1] rounded-full p-1 text-xs">
                <FaPlay />
              </div>
              Watch Trailer
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}

        <button
          onClick={prevSlide}
          className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-[#00acc1] text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-[#00acc1] text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-20"
        >
          <FaChevronRight size={24} />
        </button>

        {/* Pagination Dots (Bottom Right) */}
        <div className="absolute bottom-8 right-12 z-20 flex gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? "bg-[#00acc1] w-8"
                  : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>
      {isOpenTrailer && (
        <WatchTrailer
          isOpenTrailer={isOpenTrailer}
          closeTrailer={closeTrailer}
          movieId={currentMovie.id}
          movieTitle={currentMovie.title || currentMovie.name}
          mediaType={mediaType || currentMovie.media_type || (currentMovie.title ? 'movie' : 'tv')}
        />
      )}
    </>
  );
}

function WatchTrailer({ movieId, isOpenTrailer, closeTrailer, movieTitle, mediaType }) {
  const [videoKey, setVideoKey] = useState(null);

  const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}/videos?api_key=e7647e37d4a34ff0aad4bee7f30b20de`;
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

    if (movieId && mediaType) {
      fetchTrailer();
    }
  }, [movieId, mediaType, url]);

  if (!videoKey) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-opacity duration-300 ${
        isOpenTrailer ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <button
        onClick={closeTrailer}
        className="absolute right-10 top-10 text-white hover:text-[#00acc1] transition-colors cursor-pointer"
      >
        <VscChromeClose size={40} />
      </button>
      <div className="w-full max-w-5xl aspect-video p-4">
        <iframe
          className="w-full h-full rounded-xl shadow-2xl"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title={movieTitle}
          allowFullScreen
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
    </div>
  );
}
export default MainHeroSection;
