import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/userSlice";
import { Link, Links, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword , setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      setMessage({ type: "success", text: "Login successful!" });

      //redirect or save user info here
      dispatch(adduser(response?.data?.data));
      navigate("/feed");
    } catch (error) {
      const errMsg =
        error.response?.data || "Invalid credentials. Try again.";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-20 pb-32 justify-center items-center bg-linear-to-br from-slate-900 to-slate-700">
      <div className="card w-96 bg-base-200 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-semibold mb-4 text-center">
            Log In
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-10"
                required
              />
              <span
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {message.text && (
              <p
                className={`text-sm ${
                  message.type === "error" ? "text-red-500" : "text-green-500"
                }`}
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full mt-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <p className="m-auto">new here ? <span className="text-primary hover:underline "> <Link to={"/signup"}>signup</Link></span></p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
