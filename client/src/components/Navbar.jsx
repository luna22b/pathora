import { Link } from "react-router-dom";
import LogoNav from "../assets/LogoNav";
import Hamburger from "./Hamburger";

const Navbar = () => {
  return (
    <nav>
      <div className="max-w-6xl mx-auto border-b border-b-[#e0e0e0] pb-4 px-4 py-6 flex justify-between items-center">
        <Link
          className="text-xl cursor-pointer font-semibold flex gap-3 items-center"
          to="/"
        >
          <LogoNav />
          <p className="hidden md:block">Pathora</p>
        </Link>

        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link className="text-gray-700 cursor-pointer" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-gray-700 cursor-pointer" to="/browseplants">
              Browse Plants
            </Link>
          </li>
          <li>
            <Link className="text-gray-700 cursor-pointer" to="/identify">
              Identify Plant
            </Link>
          </li>
          <li>
            <Link
              className="cursor-pointer bg-[#262626] text-white rounded-lg px-4 py-2"
              to="/login"
            >
              Sign In
            </Link>
          </li>
        </ul>
        <div className="block md:hidden">
          <Hamburger />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
