import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 👈 error state
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(""); // reset old error

    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data);
      navigate("/");
    } catch (err) {
      // Axios error handling
      if (err.response) {
        setError(err.response.data?.message || "Invalid credentials");
      } else {
        setError("Server not reachable. Try again later.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-3">
          {error}
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
