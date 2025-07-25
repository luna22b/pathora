import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, SlashEyeIcon } from '../assets/Images';
import authStore from '../store/authStore';
import axios from 'axios';

const Login = () => {
  const login = authStore((state) => state.login);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        userOrEmail,
        password,
      });

      const data = response.data;

      setError(null);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-20 w-xs font-[Inter]">
      <div className="mt-5 text-center text-2xl font-semibold">
        Welcome <span className="text-[#187C48]">Back!</span>
      </div>
      <div className="mt-2 text-center text-sm text-[#737373]">
        Sign in to continue your plant journey
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 flex flex-col text-sm">
          Username or Email
          <input
            type="text"
            value={userOrEmail}
            onChange={(e) => setUserOrEmail(e.target.value)}
            required
            className="mt-1 h-10 rounded-sm border border-[#ddd] px-3"
          />
        </div>
        <div className="relative mt-5 flex flex-col text-sm">
          Password
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 h-10 rounded-sm border border-[#ddd] px-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute top-8 right-3 flex h-6 w-6 items-center justify-center"
          >
            {showPassword ? <EyeIcon /> : <SlashEyeIcon />}
          </button>
        </div>
        {error && <div className="mt-3 text-sm text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 h-10 w-full cursor-pointer rounded-sm bg-black text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <div className="mt-5 text-center text-sm">
        Don't you have an account?{' '}
        <Link
          to="/register"
          className="cursor-pointer text-[#009bd6] underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
