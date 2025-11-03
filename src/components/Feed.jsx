import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import { addRequest } from "../utils/requestSlice";
import { AnimatePresence } from "framer-motion";

const Feed = () => {
  const feeds = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch requests
  const getRequest = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // ✅ Fetch feed
  const getFeed = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequest();
    getFeed();
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <span className="loading loading-spinner text-amber-500"></span>
        <h1 className="p-4 text-primary text-lg">
          Getting{" "}
          <span className="text-secondary text-xl font-bold">Users</span>
        </h1>
      </div>
    );
  }

  // ✅ No users left
  if (!feeds || feeds.length === 0 || currentIndex >= feeds.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-semibold text-primary">
          No more users found 💫
        </h2>
      </div>
    );
  }

  const handleNextCard = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const currentFeed = feeds[currentIndex];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AnimatePresence mode="wait">
        <FeedCard
          key={currentFeed._id}
          feed={currentFeed}
          onDone={handleNextCard}
        />
      </AnimatePresence>
    </div>
  );
};

export default Feed;
