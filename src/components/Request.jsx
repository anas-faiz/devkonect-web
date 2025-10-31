import { useDispatch, useSelector } from "react-redux";
import ConnectionCard from "./ConnectionCard";
import { useEffect } from "react";
import axios from "axios";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const request = useSelector((store) => store.request);
    const dispatch = useDispatch();

    const getRequest = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/requests/received`,
          { withCredentials: true }
        );
        dispatch(addRequest(res.data.data));
      };
      useEffect(()=>{
        getRequest();
      },[])

  if (!request) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Fetching requests...
      </div>
    );
  }

  if (request.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-400">
        No requests yet 🕊️
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-200/40 p-6 space-y-4 transition-all duration-300 hover:shadow-2xl">
      {request.map((req) => (
        <ConnectionCard key={req._id} data={req.fromUserId} requestId={req._id} />
      ))}
    </div>
  );
};

export default Request;
