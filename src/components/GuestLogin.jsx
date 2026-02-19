import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adduser } from "../utils/userSlice";

const GuestLogin = ({loading})=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

   const handleLogin = async ()=>{

        const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/login`,
                { email : import.meta.env.VITE_guest_email, 
                  password: import.meta.env.VITE_guest_password },
                { withCredentials: true }
              );

              dispatch(adduser(response?.data?.data));
                    navigate("/feed");

    }

    return (
        <div>
             <button
             onClick={handleLogin}
              className={`btn btn-secondary w-full mt-2 ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                          }`}>
                            Login as Guest
                </button>
        </div>
    )
}

export default GuestLogin