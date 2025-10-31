import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const request = useSelector((state) => state.request);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error logging out:", err);
      setError(true);
    }
  };

  return (
    <nav className="navbar bg-base-300 shadow-sm fixed top-0 z-50 px-4">
      {/* Left Section */}
      <div className="flex-1">
        <Link
          to={user ? "/feed" : "/"}
          className="btn btn-ghost normal-case text-2xl font-semibold text-primary"
        >
          DevKonect
        </Link>
      </div>

      {/* Right Section */}
      {user ? (
        <div className="flex items-center gap-3">
          {/* Requests */}
          <div className="relative inline-block">
            <div className="badge badge-outline badge-primary px-4 py-2">
              <Link to="/request">Requests</Link>
            </div>

            {/* Only show count if request exists */}
            {Array.isArray(request) && request.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 shadow-md">
                {request.length}
              </span>
            )}
          </div>

          {/* User Greeting */}
          <p className="p-4 cursor-pointer">
            Welcome,{" "}
            <span className="text-lg uppercase font-bold text-primary">
              {user.firstName || "User"}
            </span>
          </p>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoUrl || "/default-avatar.png"}
                  alt="avatar"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile <span className="badge badge-primary">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error hover:bg-error/10"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // While loading or logged out
        <div className="text-sm text-gray-600">DevKonect</div>
      )}
    </nav>
  );
};

export default Navbar;
