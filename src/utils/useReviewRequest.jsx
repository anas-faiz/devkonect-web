import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequest } from "./requestSlice";

const useReviewRequest = async (status,_id)=>{

    const dispatch = useDispatch();

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/request/review/${status/_id}`,{},{withCredentials:true});
        dispatch(removeRequest())

    } catch (error) {
        console.log(error)
    }


    return
}

export default useReviewRequest;