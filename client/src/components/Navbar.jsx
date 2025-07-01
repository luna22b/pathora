import { Link, useNavigate } from "react-router-dom";
import LogoNav from "../assets/LogoNav";
import Hamburger from "./Hamburger";
import authStore from "../store/authStore";

const Navbar = () => {
  const logout = authStore((state) => state.logout);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <div className="max-w-6xl mx-auto border-b border-b-[#e0e0e0] pb-4 px-4 py-6 flex justify-between items-center font-[Inter]">
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
            <Link className="text-gray-700 cursor-pointer" to="/plantjournal">
              Journal
            </Link>
          </li>
          <li>
            <Link className="text-gray-700 cursor-pointer" to="/identify">
              Identify
            </Link>
          </li>
          <li>
            <Link className="text-gray-700 cursor-pointer" to="/plants">
              Plants
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-[#262626] text-white rounded-lg px-4 py-2"
              >
                Logout
              </button>
            ) : (
              <Link
                className="cursor-pointer bg-[#262626] text-white rounded-lg px-4 py-2"
                to="/login"
              >
                Sign In
              </Link>
            )}
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
