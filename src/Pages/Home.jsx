import React from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "/src/Features/home/HeroSection";
import Trailer from "/src/Features/home/Trailer";
import PopularMovie from "/src/Features/home/PopularMovie";
import Footer from "/src/Components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1600px] m-auto">
        <HeroSection />
        <Trailer />
        <PopularMovie />
      </main>
      <Footer />
    </>
  );
}

export default Home;
