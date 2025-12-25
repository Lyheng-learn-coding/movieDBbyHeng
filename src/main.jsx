import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CastCrew from "./Pages/CastCrew.jsx";
import MovieInfoPage from "./Pages/MovieInfoPage.jsx";
import CastCrewInfoPage from "./Pages/CastCrewInfoPage.jsx";
import TvSeries from "./Features/TvSeries/TvSeries.jsx";
import TvInfoPage from "./Pages/TvInfoPage.jsx";
import TvCastCrew from "./Pages/TvCastCrew.jsx";
import SearchSectionPage from "./Pages/SearchSectionPage.jsx";
import SearchShowInfoPage from "./Pages/SearchShowInfoPage.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* relate to movie  */}
        <Route path="/" element={<Home />} />
        <Route path="/movieinfo/:id" element={<MovieInfoPage />} />
        <Route path="/viewmore/:id" element={<CastCrew />} />
        <Route
          path="/castcrewinfo/:castcrewid"
          element={<CastCrewInfoPage />}
        />

        {/* relate to tv  */}
        <Route path="/tv" element={<TvSeries />} />
        <Route path="/tvinfo/:id" element={<TvInfoPage />} />
        <Route path="/viewmoretv/:id" element={<TvCastCrew />} />
        <Route
          path="/tvcastcrewinfo/:castcrewid"
          element={<CastCrewInfoPage />}
        />

        {/* for searching  */}
        <Route path="/search" element={<SearchSectionPage />} />
        <Route
          path="/showinfosearch/:type/:id"
          element={<SearchShowInfoPage />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
