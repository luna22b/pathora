import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="font-[Inter] w-xs mx-auto mt-20">
      <div className="text-center mt-5 text-2xl font-semibold">
        Welcome <span className="text-[#187C48]">Back!</span>
      </div>
      <div className="text-center mt-2 text-[#737373] text-sm">
        Sign in to continue your plant journey
      </div>
      <form>
        <div className="mt-5 text-sm flex flex-col">
          Username or Email
          <input
            type="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="border border-[#ddd] rounded-sm h-10 mt-1"
          />
        </div>
        <div className="mt-5 text-sm flex flex-col">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-[#ddd] rounded-sm h-10 mt-1"
          />
        </div>
        <button
          type="submit"
          className="text-sm text-white w-xs mt-15 rounded-sm h-10 bg-black"
        >
          Sign in
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
