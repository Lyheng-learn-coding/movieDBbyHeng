# React Movie & TV Discovery App

A modern, responsive web application built with **React.js** and **Tailwind CSS** that allows users to discover trending movies, popular TV series, and search for their favorite actors and creators. Powered by the [TMDB API](https://www.themoviedb.org/documentation/api).

## 🚀 Features

- **Dynamic Hero Section:** Featuring a sleek slider for trending content with auto-play functionality.
- **YouTube Trailer Integration:** Seamless trailer playback for both Movies and TV Series directly on the platform.
- **Comprehensive Details:** View in-depth information including overviews, genres, ratings, and runtime.
- **Cast & Crew Insights:** Detailed listing of top-billed cast and crew members for every show.
- **Advanced Search:** Multi-category search for movies, TV shows, and people.
- **Pagination:** "Load More" functionality for browsing popular TV series.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing using Tailwind CSS.
- **Custom Data Fetching:** Optimized with custom hooks (`useFetch`) and error handling.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Icons:** React Icons
- **API:** TMDB (The Movie Database)

## 📦 Project Structure

```text
src/
├── Components/         # Reusable UI components (Navbar, Footer, ShowInfo)
├── Features/           # Core feature modules
│   ├── home/           # Landing page components (Hero, Trailers, Popular)
│   ├── TvSeries/       # TV-specific components and logic
│   ├── MovieInfo/      # Movie-specific cast and crew logic
│   └── SearchContainer/# Search results and filtering logic
├── hook/               # Custom React hooks (useFetch, useLocalStorage)
├── Pages/              # Main route components/view layouts
└── assets/             # Static images and global styles
```

Thanks to TMDB for this free api
