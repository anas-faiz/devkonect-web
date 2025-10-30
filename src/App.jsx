import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";
import Feed from "./components/Feed";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./components/Profile";
import { adduser } from "./utils/userSlice";
import axios from "axios";
import { useEffect } from "react";
import Connections from "./components/Connections";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)
  
  const fetchData = async ()=>{
    try{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile/view`, {
        withCredentials:true,
      });
      dispatch(adduser(res?.data?.data));
    }catch(err){
      if(err.status == 401){
        navigate("/login")
      }      
      console.error("error : " + err.message)
    }    
  }
  useEffect(()=>{
    if(!userData){
    fetchData();
    }
  },[])

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path="/login" element={<LogIn/>} />
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/connections" element={<Connections/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
