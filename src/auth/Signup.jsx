import React, { useState } from "react";
import { account, ID } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await account.create(ID.unique(), email, password, name);
      alert("Account creation successful. Login to continue.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-600 p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-black text-3xl mb-5">Signup</h2>
        <form className="w-full" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-black w-full py-2 px-4 mb-3 rounded-lg border border-gray-300"
          />
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
            Signup
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        <p className="text-black text-sm mt-3">Already have an account?</p>
        <button
          onClick={handleLoginRedirect}
          className="w-full py-2 px-4 mt-1 text-lg font-bold text-white bg-blue-500 rounded-lg border border-transparent cursor-pointer transition duration-300 hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
