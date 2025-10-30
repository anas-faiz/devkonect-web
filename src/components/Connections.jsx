import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connetionSlice";
import axios from "axios";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/connections`,
        { withCredentials: true }
      );
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-amber-500">
        Getting Connections...
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src="https://cdn-icons-png.flaticon.com/512/620/620851.png"
          alt="No connections"
          className="w-32 opacity-60"
        />
        <h1 className="text-xl mt-4 text-gray-600 font-medium">
          No connections yet 😔
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Start swiping to find your first match!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-white/20 p-4">
      <h1 className="text-xl font-bold text-amber-600 mb-4 tracking-wide">
        Connections ({connections.length})
      </h1>

      <ul className="flex flex-col divide-y divide-gray-200">
        {connections.map((connection, index) => (
          <li
            key={connection._id}
            className="flex items-center justify-between py-3 px-2 hover:bg-amber-50/60 transition-all rounded-xl"
          >
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <img
                src={
                  connection.photoUrl || "https://via.placeholder.com/80x80"
                }
                alt={connection.firstName}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-300 shadow-sm"
              />
              <div>
                <h2 className="font-semibold text-gray-800 text-lg capitalize">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {connection.gender || "User"} •{" "}
                  {connection.age ? `${connection.age} yrs` : "Age N/A"}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <button className="text-amber-600 font-medium border border-amber-400 px-3 py-1 rounded-xl hover:bg-amber-400 hover:text-white transition-all duration-200">
                Message
              </button>
              <button className="text-gray-600 hover:text-red-500 transition-all duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
