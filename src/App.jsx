import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <Navbar/>
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center border border-white/30 transition-all hover:scale-105 hover:shadow-amber-400/40 duration-300">
        <h1 className="text-5xl font-extrabold text-amber-800 mb-4">
          Hey!!! <span className="text-red-600 drop-shadow-sm">DevKonnect</span>{" "}
          Users!!!
        </h1>
        <p className="text-lg text-gray-700 font-medium tracking-wide">
          Welcome to the community that connects developers worldwide 🌍
        </p>
        <button className="mt-6 bg-amber-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-600 hover:shadow-lg transition-all duration-300">
          Get Started
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
