import React, { useState } from "react";
import { account } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";
import { useAnimeContext } from "../contexts/AnimeContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserId } = useAnimeContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      if (user) {
        setUserId(user.$id);
        navigate("/");
      } else {
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-600 p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-black text-3xl mb-5">Login</h2>
        <form className="w-full" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black w-full py-2 px-4 mb-3 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-black w-full py-2 px-4 mb-3 rounded-lg border border-gray-300"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 text-lg font-bold text-white bg-green-500 rounded-lg border border-transparent cursor-pointer transition duration-300 hover:bg-green-700"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        <p className="text-black text-sm mt-3">Don't have an account?</p>
        <button
          onClick={handleRegisterRedirect}
          className="w-full py-2 px-4 mt-1 text-lg font-bold text-white bg-blue-500 rounded-lg border border-transparent cursor-pointer transition duration-300 hover:bg-blue-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
