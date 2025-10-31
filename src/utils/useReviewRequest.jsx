import axios from "axios";

const useReviewRequest = async (status,_id)=>{

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/request/review/${status/_id}`,{},{withCredentials:true});
        

    } catch (error) {
        console.log(error)
    }


    return
}

export default useReviewRequest;