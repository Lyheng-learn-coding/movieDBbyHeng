import React from "react";
import { FaLink } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import useFetch from "../../hook/useFetch";
import DisplayMovieCard from "../home/DisplayMovieCard";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import noImage from "/src/assets/noImage.png";

function CastInfo({ castcrewid }) {
  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/person/${castcrewid}?api_key=e7647e37d4a34ff0aad4bee7f30b20de&append_to_response=movie_credits,external_ids`
  );

  const movieCardUrl = `https://api.themoviedb.org/3/discover/movie?with_cast=${castcrewid}&sort_by=popularity.desc&api_key=e7647e37d4a34ff0aad4bee7f30b20de`;

  if (loading) {
    return (
      <>
        <Navbar isLoading={true} />
      </>
    );
  }

  if (error) {
    return <p className="text-center text-2xl">something went wrong {error}</p>;
  }

  const {
    profile_path,
    name,
    biography,
    known_for_department,
    birthday,
    place_of_birth,
    also_known_as,
    gender,
    external_ids,
    homepage,
    movie_credits,
  } = data;

  const profile = profile_path
    ? `https://image.tmdb.org/t/p/original${profile_path}`
    : noImage;

  function getCastCount(credits) {
    if (!credits || !credits.cast) return 0;
    return credits.cast.length;
  }

  function getTwitterLink(externalIds) {
    if (!externalIds || !externalIds.twitter_id) return "#";
    return `https://twitter.com/${externalIds.twitter_id}`;
  }

  function getAlsoKnownAs(names) {
    if (!names || names.length === 0) return "";
    return names.filter((name) => !/[\u0E00-\u0E7F]/.test(name)).join(", ");
  }

  function getSortedActingYear(credits) {
    if (!credits || !credits.cast) return [];

    return credits.cast.sort((a, b) => {
      const dateA = a.release_date || "";
      const dateB = b.release_date || "";
      return dateB.localeCompare(dateA);
    });
  }

  const formattedData = {
    personalinfo: {
      stageName: name,
      knowFor: known_for_department,
      knowCredit: getCastCount(movie_credits),
      genderData: gender ? [gender] : [],
      birthday: birthday,
      placeOfBirth: place_of_birth,
      aslsoKnownAs: getAlsoKnownAs(also_known_as),
      twitterLink: getTwitterLink(external_ids),
      infoLink: homepage || "#",
    },
    workinfo: getSortedActingYear(movie_credits),
  };

  return (
    <>
      <Navbar />
      <section className="xl:px-20  max-w-[1600px] m-auto pt-24 my-10">
        <div className="full  flex xl:flex-row flex-col px-3 gap-10 ">
          <div className=" xl:w-[400px] w-full">
            <img
              key={profile}
              src={profile}
              alt={name}
              className="rounded-xl w-full xl:h-auto h-[400px] m-auto xl:object-cover object-contain "
            />
          </div>
          <div className="xl:w-[70%] w-full flex  flex-col ">
            <h1 className="font-bold text-3xl mb-5">{name}</h1>
            {/* for mobile  */}
            <PersonalInfo
              class2="md:hidden block"
              person={formattedData.personalinfo}
            />

            <h2 className="text-xl font-medium mb-5 md:mt-0 mt-5  text-justify  ">
              Biography
              <br />
              <span className="text-[1rem] font-normal ">{biography}</span>
            </h2>
            <h2 className="text-xl font-medium">Known For</h2>
            <div className="w-full">
              <DisplayMovieCard url={movieCardUrl} />
            </div>
          </div>
        </div>
        <PersonalAndActing bothInfo={formattedData} />
      </section>
      <Footer />
    </>
  );
}

function PersonalAndActing({ bothInfo }) {
  const { personalinfo, workinfo } = bothInfo;
  return (
    <>
      <section className={`flex gap-5 mt-5  px-5`}>
        {/* for desktop  */}
        <PersonalInfo class1="md:block hidden" person={personalinfo} />

        <div className="w-full">
          <h1 className="font-medium text-2xl mb-2.5">Acting</h1>
          <div className="flex flex-col border border-gray-200 shadow-xl max-h-[800px] overflow-y-auto element-with-x-scrol ">
            {/* content  acting year here*/}
            {workinfo.map((work, index) => (
              <ActingYear key={`${work.id}-${index}`} work={work} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PersonalInfo({ class1, class2, person }) {
  const {
    stageName,
    knowFor,
    knowCredit,
    genderData,
    birthday,
    placeOfBirth,
    aslsoKnownAs,
    twitterLink,
    infoLink,
  } = person;

  const gender = genderData.map((m) => {
    if (m === 1) {
      return (
        <span key={m} className="font-medium">
          Female
        </span>
      );
    } else {
      return (
        <span key={m} className="font-medium">
          Male
        </span>
      );
    }
  });

  // calculate age
  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(birthday);

  return (
    <>
      <div
        className={`flex md:w-[50%] w-full flex-col  gap-5 ${class1} ${class2}`}
      >
        <div className="flex gap-5 mb-5 text-2xl font-bold md:py-5">
          <div className="border-r pr-5">
            <a href={twitterLink} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
          <div>
            <a href={infoLink} target="_blank" rel="noopener noreferrer">
              <FaLink />
            </a>
          </div>
        </div>

        <div className="md:flex md:flex-col grid grid-cols-2 w-full gap-5">
          <h1 className="font-medium text-2xl"> Personal</h1>

          <h2 className="font-medium">
            Stage Name
            <br />
            <p className="font-normal">{stageName}</p>
          </h2>

          <h2 className="font-medium">
            Known For
            <br />
            <p className="font-normal">{knowFor}</p>
          </h2>

          <h2 className="font-medium">
            Known Credits
            <br />
            <p className="font-normal">{knowCredit}</p>
          </h2>

          <h2 className="font-medium">
            Gender
            <br />
            {gender}
          </h2>

          <h2 className="font-medium">
            Birthday
            <br />
            <p className="font-normal">
              {birthday} ({age} years old)
            </p>
          </h2>

          <h2 className="font-medium">
            Place of birth
            <br />
            <p className="font-normal">{placeOfBirth}</p>
          </h2>

          <h2 className="font-medium">
            Also Known As
            <br />
            <p className="font-normal">{aslsoKnownAs}</p>
          </h2>
        </div>
      </div>
    </>
  );
}

function ActingYear({ work }) {
  const { release_date, title, character } = work;
  const year = release_date ? release_date.split("-")[0] : "—";
  return (
    <>
      <div className="flex gap-5 p-5 border-b border-gray-100 last:border-b-0 ">
        <p className="min-w-[50px]">{year}</p>
        <div className="mt-1.5 text-xs ">
          <FaDotCircle />
        </div>
        <p>
          <span className="font-bold ">{title}</span>
          <br />
          <span className="text-gray-600 ">as {character}</span>
        </p>
      </div>
    </>
  );
}

export default CastInfo;
