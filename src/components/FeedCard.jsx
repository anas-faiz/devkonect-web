import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";

const FeedCard = ({ feed, onDone }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handleRequestSent = async (status, _id, direction) => {
    try {
      setSwipeDirection(direction);
      setIsVisible(false); // trigger exit animation

      setTimeout(async () => {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/request/send/${status}/${_id}`,
          {},
          { withCredentials: true }
        );
        onDone(); // move to next card after API + animation
      }, 400);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <motion.div
      key={feed._id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        x: swipeDirection === "left" ? -200 : 200,
        rotate: swipeDirection === "left" ? -15 : 15,
        scale: 0.8,
        transition: { duration: 0.4 },
      }}
      className="card bg-white/80 backdrop-blur-md w-80 shadow-xl hover:shadow-amber-400/30 transition-all duration-300 border border-white/20 rounded-2xl overflow-hidden"
    >
      {/* Profile Image */}
      <figure className="relative w-full h-56 overflow-hidden bg-gradient-to-tr from-amber-100/30 to-white/5">
        <img
          src={feed.photoUrl || "https://via.placeholder.com/150"}
          alt={feed.firstName || "User"}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body text-center h-60 flex flex-col justify-between">
        <div>
          <h2 className="card-title justify-center text-2xl font-bold text-amber-800 uppercase">
            {feed.firstName || "Anonymous"}
            <div className="badge badge-secondary ml-2">New</div>
          </h2>
          <p className="text-gray-700 text-sm font-medium leading-relaxed">
            {feed.age ? `${feed.age}` : ""}{" "}
            {feed.gender ? `• ${feed.gender}` : ""}
          </p>
          <p className="text-gray-700 text-sm font-medium leading-relaxed">
            {feed.about || "No bio available yet."}
          </p>
        </div>

        <div>
          <div className="card-actions justify-center flex flex-wrap gap-2 mb-3">
            {feed.skills && feed.skills.length > 0 ? (
              feed.skills.map((skill, index) => (
                <div
                  key={index}
                  className="badge badge-outline border-amber-500 text-amber-700"
                >
                  {skill}
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">No skills added</div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() =>
                handleRequestSent("ignore", feed._id, "left")
              }
              className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 font-semibold uppercase tracking-wide hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Pass
            </button>
            <button
              onClick={() =>
                handleRequestSent("interested", feed._id, "right")
              }
              className="px-6 py-2 rounded-xl border border-black text-white font-bold uppercase tracking-wide bg-gradient-to-r from-amber-400 to-red-500 hover:from-red-500 hover:to-amber-400 hover:scale-105 active:scale-95 shadow-md transition-all duration-200"
            >
              Smash
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedCard;
