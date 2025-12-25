import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SearchItems from "../Features/SearchContainer/SearchItems";

function SearchSection() {
  return (
    <>
      <Navbar />
      <SearchItems />
      <Footer />
    </>
  );
}

export default SearchSection;
