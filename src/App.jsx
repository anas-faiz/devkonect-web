import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <Navbar/>
      <Hero/>
      <Footer/>
    </div>
  );
}

export default App;
