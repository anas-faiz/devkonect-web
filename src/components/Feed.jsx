import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import axios from "axios";
import { addFeed } from "../utils/feedSlice"
import { useEffect } from "react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
    const getFeed= async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/feed`,
            {withCredentials:true})
            dispatch(addFeed(res.data.data))           
        }
        useEffect(()=>{
            getFeed()
        },[])
  if (!feed) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-amber-500"></span>
        <h1 className="p-4 text-primary text-lg">
          Getting <span className="text-secondary text-xl font-bold">Users</span>
        </h1>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <Card feed={feed[0]} />
    </div>
  );
};

export default Feed;
