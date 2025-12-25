import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { GoX } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { saveSearchValue, getSearchValue } from "../hook/useLocalStorage";
import LinearIndeterminate from "./LinearProgress";

function Navbar({ isLoading }) {
  const [IsOpen, setisOpen] = useState(false);
  const [isOpenSearch, setOpenSearchbar] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpenSearch && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpenSearch]);

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // store search value in local storage
  useEffect(() => {
    const searchValue = getSearchValue();
    if (searchValue) {
      setInputValue(searchValue);
    }
  }, []);

  // handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    const search = inputValue.trim();

    if (search.length === 0) {
      return;
    }

    saveSearchValue(search);
    navigate(`/search?query=${search}`);
    closeSearchBar();
  };

  const isMovieActive =
    path === "/" ||
    path.startsWith("/movieinfo") ||
    path.startsWith("/viewmore") ||
    path.startsWith("/castcrewinfo");
  const isTvActive =
    path === "/tv" ||
    path.startsWith("/tvinfo") ||
    path.startsWith("/viewmoretv") ||
    path.startsWith("/tvcastcrewinfo");

  const openSearchbar = () => {
    setOpenSearchbar(!isOpenSearch);
  };

  const closeSearchBar = () => {
    setOpenSearchbar(false);
  };

  const toggleMenu = () => {
    setisOpen(!IsOpen);
  };

  const closeMenu = () => {
    setisOpen(false);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full z-60">
          <LinearIndeterminate />
        </div>
      )}
      <nav className="fixed top-0 left-0 w-full py-5 md:px-12 px-5    bg-[#032541] flex justify-between items-center gap-2.5 shadow-md z-50 text-white">
        <div className="flex gap-3 items-center">
          <button className="flex xl:hidden text-[1.5rem]" onClick={toggleMenu}>
            <GiHamburgerMenu />
          </button>
          <h1 className="md:text-3xl text-2xl">
            <Link to="/">Movie DB</Link>
          </h1>
        </div>

        <div className="relative w-[30%] xl:block hidden ">
          <CiSearch
            className="absolute left-3 top-2.5 text-[1.5rem] mr-3 z-10
          "
          />
          <input
            value={inputValue}
            onClick={openSearchbar}
            type="text"
            className="px-10 py-2.5  w-full rounded-xl placeholder:text-gray-400  backdrop-blur-[20px] border outline-0 cursor-pointer"
            placeholder="Search for movies..."
            readOnly
          />
        </div>

        <ul className="gap-6 text-[1rem] hidden xl:flex">
          <li className="relative">
            <Link
              to="/"
              className={`${
                isMovieActive ? "text-[#01b4e4]" : "text-white"
              } hover:text-[#a59b9f] duration-150 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:rounded-xl after:bg-[#01b4e4] after:transition-all after:duration-300 hover:after:w-full`}
            >
              Movies
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/tv"
              className={`${
                isTvActive ? "text-[#01b4e4]" : "text-white"
              } hover:text-[#a59b9f] duration-150 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:rounded-xl after:bg-[#01b4e4] after:transition-all after:duration-300 hover:after:w-full`}
            >
              TV series
            </Link>
          </li>
        </ul>

        <div className="flex gap-1.5 items-center">
          <button
            className="text-[1.4rem] block xl:hidden"
            onClick={openSearchbar}
          >
            <FaSearch />
          </button>
        </div>
      </nav>
      <InputMain
        openSearch={isOpenSearch}
        closeSearchBar={closeSearchBar}
        handleSearch={handleSearch}
        setInputValue={setInputValue}
        inputValue={inputValue}
        inputRef={inputRef}
      />
      <NavbarMobile
        IsOpen={IsOpen}
        closeMenu={closeMenu}
        isMovieActive={isMovieActive}
        isTvActive={isTvActive}
      />
    </>
  );
}

function NavbarMobile({ IsOpen, closeMenu, isMovieActive, isTvActive }) {
  return (
    <>
      <nav
        className={`backdrop-blur-[20px] py-5 md:px-10 px-5 text-white fixed top-0 duration-300 z-50 w-full h-[50%] ${
          IsOpen ? `left-0 ` : `-left-full`
        } w-full `}
      >
        <button
          className="absolute md:right-10 right-5 text-[2rem] cursor-pointer "
          onClick={closeMenu}
        >
          <GoX />
        </button>
        <ul className="flex flex-col gap-5 text-[1rem] mt-5 font-atons">
          <li>
            <Link
              to="/"
              className={`${
                isMovieActive ? "text-[#01b4e4]" : "text-white"
              } hover:text-[#a59b9f] duration-150`}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              to="/tv"
              className={`${
                isTvActive ? "text-[#01b4e4]" : "text-white"
              } hover:text-[#a59b9f] duration-150`}
            >
              Tv series
            </Link>
          </li>
        </ul>
        <div className="flex justify-center items-center">
          <h1 className="md:text-3xl text-2xl font-bold absolute bottom-2.5 ">
            <Link to="/"> Heng | movie</Link>
          </h1>
        </div>
      </nav>
      <OverlayDark openOverlay={IsOpen} closeOverlay={closeMenu} />
    </>
  );
}

function InputMain({
  openSearch,
  closeSearchBar,
  handleSearch,
  setInputValue,
  inputValue,
  inputRef,
}) {
  return (
    <>
      <nav
        className={`navBarInput  backdrop-blur-sm w-full fixed ${
          openSearch ? `top-0` : ` -top-full`
        }  h-[250px] py-2.5 px-[50px]  z-50 transition-all duration-300  border-t-0`}
      >
        <form
          onSubmit={handleSearch}
          className="relative w-full flex mb-[-100px] mt-[35px]"
        >
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="inputValue w-full pb-2.5  md:text-[1.5rem] text-[1rem] text-white border-white border-b outline-none placeholder:text-white"
            placeholder="What are you looking for?"
          />
          <div className="bg- p-2.5 gap-2.5 flex absolute right-0 md:top-0 -top-2.5 text-white ">
            <button type="submit" className="cursor-pointer ">
              <FaSearch className="text-[1.2rem]" />
            </button>
            <button
              type="button"
              className="btnRemoveNav cursor-pointer"
              onClick={closeSearchBar}
            >
              <HiXMark className="text-[1.5rem]" />
            </button>
          </div>
        </form>
      </nav>
      <OverlayDark openOverlay={openSearch} closeOverlay={closeSearchBar} />
    </>
  );
}

function OverlayDark({ openOverlay, closeOverlay }) {
  return (
    <div
      className={`overlayDark bg-black/50 fixed inset-0 z-30  ${
        openOverlay ? `block` : `hidden`
      }`}
      onClick={closeOverlay}
    ></div>
  );
}

export default Navbar;
