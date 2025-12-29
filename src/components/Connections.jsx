import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connetionSlice";
import axios from "axios";
import ConnectionCard from "./ConnectionCard";

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
      <div className="flex flex-col items-center justify-center">
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
    <div className="max-w-2xl mx-auto mt-10 mb-4 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-white/20 p-4">
      <h1 className="text-xl font-bold text-primary mb-4 tracking-wide">
        Connections ({connections.length})
      </h1>

      <ul className="flex flex-col divide-y divide-gray-200">
        {connections.map((connection) => (
            <ConnectionCard key={connection._id} data={connection}/>          
        ))}
      </ul>
    </div>
  );
};

export default Connections;
