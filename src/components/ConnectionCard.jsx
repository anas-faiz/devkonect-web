import { useSelector } from "react-redux";
import useReviewRequest from "../utils/useReviewRequest";
import {Link} from "react-router-dom"

const ConnectionCard = ({ data ,requestId}) => {
  const connections = useSelector((store) => store.connection);
  const reviewRequest = useReviewRequest(); // ✅ call hook here

  const isConnected = connections?.some((conn) => conn._id === data._id);
  
  const handleAccept = () => reviewRequest("accepted", requestId);
  const handleReject = () => reviewRequest("rejected", requestId);

  return (
    <li
      key={data._id}
      className="flex items-center justify-between py-3 px-2 hover:bg-amber-50/60 transition-all rounded-xl"
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img
          src={data.photoUrl || "https://via.placeholder.com/80x80"}
          alt={data.firstName}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-300 shadow-sm"
        />
        <div>
          <h2 className="font-semibold text-gray-800 text-lg capitalize">
            {data.firstName} {data.lastName}
          </h2>
          <p className="text-sm text-gray-500">
            {data.gender || "User"} • {data.age ? `${data.age}` : "Age N/A"}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {!isConnected ? (
          <>
            <button
              onClick={handleAccept}
              className="text-primary font-medium border border-blue-400 px-3 py-1 rounded-xl hover:bg-blue-400 hover:text-white transition-all duration-200"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="text-gray-600 hover:text-red-500 transition-all duration-200"
            >
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
          </>
        ) : (
          <Link to={"/chat/"+data._id}>
            <button className="text-primary font-medium border border-green-400 px-3 py-1 rounded-xl hover:bg-green-400 hover:text-white transition-all duration-200">
            Message
          </button>
          </Link>
        )}
      </div>
    </li>
  );
};

export default ConnectionCard;
