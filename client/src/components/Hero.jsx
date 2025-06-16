import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="max-w-6xl py-6 px-4 mx-auto mt-18 flex flex-col items-center font-[Inter] lg:flex-row">
      <div className="flex flex-col text-center sm:text-left">
        <div className="flex flex-col text-5xl font-semibold leading-tight">
          <p className="lg:w-135">
            Discover The <span className="text-[#187C48]">Green</span> World
            Around You
          </p>
        </div>
        <p className="text-[#737373] mt-5 text-xl">
          Identify a variety of plants with our AI-powered technology and learn
          more about their botanical names, care instructions, and other facts.
        </p>

        {/* ------------ Buttons ------------- */}

        <div className="mt-7 flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start items-center">
          <Link
            className="text-white bg-[#262626] rounded-lg px-4 py-2.5 w-full sm:w-[200px] flex items-center justify-center shadow-md flex-none cursor-pointer"
            to="identify"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1 -translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
            Start identifying
          </Link>
          <Link
            className="border border-black text-black rounded-lg px-4 py-2.5 w-full sm:w-[200px] flex items-center justify-center shadow-md flex-none cursor-pointer"
            to="/browseplants"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1 -translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            Browse Plants
          </Link>
        </div>
      </div>

      {/* ------------ Image ----------- */}

      <div className="mt-10">
        <img
          src={logo}
          alt="Picture of many dandelions"
          className="object-contain w-100 border-[#187C48] border-2 rounded-2xl shadow-lg md:w-150 lg:w-250"
        />
      </div>
    </div>
  );
};

export default Hero;
