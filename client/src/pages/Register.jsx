import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, SlashEyeIcon } from '../assets/Images';
import authStore from '../store/authStore';
import axios from 'axios';

const Register = () => {
  const login = authStore((state) => state.login);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (password !== confirmPass) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username,
        email,
        password,
        confirmPass,
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
    <div className="mx-auto mt-10 w-xs font-[Inter]">
      <div className="mt-5 text-center text-2xl font-semibold">
        Create an <span className="text-[#187C48]">Account</span>
      </div>
      <div className="mt-2 text-center text-sm text-[#737373]">
        Join now to start your plant journey
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 flex flex-col text-sm">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 h-10 rounded-sm border border-[#ddd] px-3"
          />
        </div>
        <div className="mt-5 flex flex-col text-sm">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 h-10 rounded-sm border border-[#ddd] px-3"
          />
        </div>
        <div className="relative mt-5 flex flex-col text-sm">
          Password
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 h-10 rounded-sm border border-[#ddd] px-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            aria-label={showPass ? 'Hide password' : 'Show password'}
            className="absolute top-8 right-3 flex h-6 w-6 items-center justify-center"
          >
            {showPass ? <EyeIcon /> : <SlashEyeIcon />}
          </button>
        </div>
        <div className="relative mt-5 flex flex-col text-sm">
          Confirm Password
          <input
            type={showConfirmPass ? 'text' : 'password'}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
            className="mt-1 h-10 rounded-sm border border-[#ddd] px-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPass((prev) => !prev)}
            aria-label={
              showConfirmPass
                ? 'Hide confirm password'
                : 'Show confirm password'
            }
            className="absolute top-8 right-3 flex h-6 w-6 items-center justify-center"
          >
            {showConfirmPass ? <EyeIcon /> : <SlashEyeIcon />}
          </button>
          {submitted && confirmPass !== password && (
            <p className="mt-1 text-sm text-red-500">Passwords don't match</p>
          )}
        </div>
        {error && (
          <div className="mt-3 text-center text-sm text-red-500">{error}</div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 h-10 w-full cursor-pointer rounded-sm bg-black text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-5 text-center text-sm">
        Already Have An Account?{' '}
        <Link to="/login" className="cursor-pointer text-[#009bd6] underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
