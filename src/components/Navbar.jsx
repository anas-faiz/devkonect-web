import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  let user = useSelector((state) => state.user);
  const [error,setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user)

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      
      dispatch(removeUser());
      navigate("/login", { replace: true });
    } catch (err) {
      console.log("Error" + err.response.data)
      setError(true)
    }
  };
  return (
    <nav className="navbar bg-base-300 shadow-sm fixed top-0 z-50 px-4">
      {/* Left Section */}
      <div className="flex-1">
        <Link
          to={userData ? "/feed" : "/"}
          className="btn btn-ghost normal-case text-2xl font-semibold text-primary"
        >
          DevKonect
        </Link>
      </div>

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-2">
          <p className="p-4 cursor-pointer">
            welcome,{" "}
            <span className="text-lg uppercase font-bold text-primary">
              {user.firstName}
            </span>
          </p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoUrl} alt={`${user.name}'s avatar`} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile <span className="badge badge-primary">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link
                  onClick={handleLogout}
                  className="text-error hover:bg-error/10"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
