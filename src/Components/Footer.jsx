import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
function Footer() {
  const scrolltoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <footer className="footerCon bg-[#03243f] w-full h-full flex gap-5 justify-between p-5 md:px-20 items-center">
        <p className="text-white">
          © {new Date().getFullYear()} Build by Lyheng
        </p>

        <div className="flex gap-2.5  ">
          <button className="bg-white p-2.5 text-xl rounded-full">
            <a href="https://github.com/Lyheng-learn-coding" target="_blank">
              <FaGithub />
            </a>
          </button>
          <button
            onClick={scrolltoTop}
            className="bg-white p-2.5  text-xl rounded-full cursor-pointer"
          >
            <FaArrowUp />
          </button>
        </div>
      </footer>
    </>
  );
}

export default Footer;
