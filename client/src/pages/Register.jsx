import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, SlashEyeIcon } from "../assets/Images";
import authStore from "../store/authStore";

const Register = () => {
  const login = authStore((state) => state.login);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
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
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPass }),
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
    <div className="font-[Inter] w-xs mx-auto mt-10">
      <div className="text-center mt-5 text-2xl font-semibold">
        Create an <span className="text-[#187C48]">Account</span>
      </div>
      <div className="text-center mt-2 text-[#737373] text-sm">
        Join now to start your plant journey
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 text-sm flex flex-col">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-[#ddd] rounded-sm h-10 mt-1 px-3"
          />
        </div>
        <div className="mt-5 text-sm flex flex-col">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-[#ddd] rounded-sm h-10 mt-1 px-3"
          />
        </div>
        <div className="mt-5 text-sm flex flex-col relative">
          Password
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-[#ddd] rounded-sm h-10 mt-1 px-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            aria-label={showPass ? "Hide password" : "Show password"}
            className="absolute right-3 top-8 h-6 w-6 flex items-center justify-center"
          >
            {showPass ? <EyeIcon /> : <SlashEyeIcon />}
          </button>
        </div>
        <div className="mt-5 text-sm flex flex-col relative">
          Confirm Password
          <input
            type={showConfirmPass ? "text" : "password"}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
            className="border border-[#ddd] rounded-sm h-10 mt-1 px-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPass((prev) => !prev)}
            aria-label={
              showConfirmPass
                ? "Hide confirm password"
                : "Show confirm password"
            }
            className="absolute right-3 top-8 h-6 w-6 flex items-center justify-center"
          >
            {showConfirmPass ? <EyeIcon /> : <SlashEyeIcon />}
          </button>
          {submitted && confirmPass !== password && (
            <p className="text-red-500 text-sm mt-1">Passwords don't match</p>
          )}
        </div>
        {error && (
          <div className="mt-3 text-sm text-red-500 text-center">{error}</div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="text-sm text-white w-full mt-6 rounded-sm h-10 bg-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <div className="text-sm text-center mt-5">
        Already Have An Account?{" "}
        <Link to="/login" className="underline cursor-pointer text-[#009bd6]">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
