import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import LogIn from "./components/LogIn";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path="/login" element={<LogIn/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
