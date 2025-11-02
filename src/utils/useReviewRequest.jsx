import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const useReviewRequest = () => {
  const dispatch = useDispatch();

  // return a function that can be called from a component
  const reviewRequest = async (status, _id) => {
    try {
       await axios.post(
        `${import.meta.env.VITE_API_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      // Update Redux state after successful API call
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  return reviewRequest;
};

export default useReviewRequest;
