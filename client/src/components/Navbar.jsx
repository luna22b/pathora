import { Link, useNavigate } from 'react-router-dom';
import LogoNav from '../assets/LogoNav';
import Hamburger from './Hamburger';
import authStore from '../store/authStore';
import { HomeIcon } from '../assets/Images';
import { Book } from '../assets/Images';

const Navbar = () => {
  const logout = authStore((state) => state.logout);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-b-[#e0e0e0] px-4 py-6 pb-4 font-[Inter]">
        <Link
          className="flex cursor-pointer items-center gap-3 text-xl font-semibold"
          to="/"
        >
          <LogoNav />
          <p className="hidden md:block">Pathora</p>
        </Link>

        <ul className="hidden items-center space-x-6 md:flex">
          <li>
            <Link className="flex cursor-pointer flex-row text-gray-700" to="/">
              <HomeIcon />
              Home
            </Link>
          </li>
          <li>
            <Link
              className="flex cursor-pointer flex-row text-gray-700"
              to="/plantjournal"
            >
              <Book />
              Journal
            </Link>
          </li>
          <li>
            <Link
              className="flex cursor-pointer flex-row text-gray-700"
              to="/identify"
            >
              Identify
            </Link>
          </li>
          <li>
            <Link
              className="flex cursor-pointer flex-row text-gray-700"
              to="/gallery"
            >
              Gallery
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-lg bg-[#262626] px-4 py-2 text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                className="cursor-pointer rounded-lg bg-[#262626] px-4 py-2 text-white"
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
