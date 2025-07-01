import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, SlashEyeIcon } from "../assets/Images";
import authStore from "../store/authStore";

const Login = () => {
  const login = authStore((state) => state.login);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const [userOrEmail, setUserOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userOrEmail, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        setIsLoading(false);
        return;
      }

      setError(null);
      login(data.user, data.token);
      setIsLoading(false);
      navigate("/");
    } catch {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="font-[Inter] w-xs mx-auto mt-20">
      <div className="text-center mt-5 text-2xl font-semibold">
        Welcome <span className="text-[#187C48]">Back!</span>
      </div>
      <div className="text-center mt-2 text-[#737373] text-sm">
        Sign in to continue your plant journey
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 text-sm flex flex-col">
          Username or Email
          <input
            type="text"
            value={userOrEmail}
            onChange={(e) => setUserOrEmail(e.target.value)}
            required
            className="border border-[#ddd] rounded-sm h-10 mt-1 px-3"
          />
        </div>
        <div className="mt-5 text-sm flex flex-col relative">
          Password
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-[#ddd] rounded-sm h-10 mt-1 px-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-8 h-6 w-6 flex items-center justify-center"
          >
            {showPassword ? <EyeIcon /> : <SlashEyeIcon />}
          </button>
        </div>
        {error && <div className="mt-3 text-sm text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={isLoading}
          className="text-sm text-white w-full mt-6 rounded-sm h-10 bg-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="text-sm text-center mt-5">
        Don't you have an account?{" "}
        <Link
          to="/register"
          className="underline cursor-pointer text-[#009bd6]"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
