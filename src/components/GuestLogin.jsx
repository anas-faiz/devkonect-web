import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adduser } from "../utils/userSlice";

const GuestLogin = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email: import.meta.env.VITE_GUEST_EMAIL,
          password: import.meta.env.VITE_GUEST_PASSWORD,
        },
        { withCredentials: true }
      );

      dispatch(adduser(response?.data?.data));
      navigate("/feed");

    } catch (error) {
      console.error("Guest login failed:", error.response?.data || error.message);
      alert("Guest login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`btn btn-secondary w-full mt-2 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging in..." : "Login as Guest"}
      </button>
    </div>
  );
};

export default GuestLogin;
