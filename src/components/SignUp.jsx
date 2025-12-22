import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {Link} from "react-router-dom"

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      setMessage({ type: "success", text: "Signup successful! Redirecting..." });

      // Save user info & redirect after short delay
      dispatch(adduser(response?.data?.data));
      setTimeout(() => navigate("/profile"), 1200);
    } catch (error) {
      const errMsg =
        error.response?.data ||
        "Something went wrong. Please try again.";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-16 pb-10 justify-center items-center bg-linear-to-br from-slate-900 to-slate-700">
      <div className="card w-96 bg-base-200 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-semibold mb-4 text-center text-primary">
            Sign Up
          </h2>

          <form onSubmit={handleSignUp} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
              required
            />

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
                className={`text-sm mt-1 text-center ${
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
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          
          <p className="m-auto">already a user ? <span className="text-primary hover:underline "> <Link to={"/login"}>login</Link></span></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
