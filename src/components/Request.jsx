import { useSelector } from "react-redux";
import ConnectionCard from "./ConnectionCard";

const Request = () => {
  const request = useSelector((store) => store.request);

  if (!request) {
    return <div>Looking for request</div>;
  }

  if (request.length == 0) {
    return <div>no requests yet</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-white/20 p-4">
      {request.map((request) => (
        <ConnectionCard key={request._id} data={request.fromUserId} />
      ))}
    </div>
  );
};

export default Request;
