import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUP";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path="/signUp" element={<SignUp/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
