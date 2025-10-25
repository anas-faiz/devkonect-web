import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import Feed from "./components/Feed";
import { useDispatch } from "react-redux";
import Profile from "./components/Profile";
import { adduser } from "./utils/userSlice";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async ()=>{
    try{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile/view`, {
        withCredentials:true,
      });
      dispatch(adduser(res?.data?.data));

    }catch(err){
      navigate("/login")
      console.error("error : " + err.message)
    }    
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path="/login" element={<LogIn/>} />
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
