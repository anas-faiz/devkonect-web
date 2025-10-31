import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center p-10 bg-linear-to-br from-amber-50 via-white/70 to-amber-100 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 transition-transform duration-300 hover:scale-[1.03] hover:shadow-amber-400/40 mx-auto my-12">
      {/* Title */}
      <h1 className="text4xl sm:text-5xl md:text-6xl font-extrabold text-amber-800 mb-4 leading-tight">
        Hey!!!
        <span className="text-red-600 drop-shadow-sm mx-2">DevKonnect</span>
        Users!!!
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium tracking-wide max-w-xl">
        Welcome to the community that connects developers worldwide 🌍
      </p>

      {/* CTA Button */}
      <Link to={"/signup"}>
      <button
        className="mt-8 bg-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 hover:shadow-lg active:scale-95 transition-all duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Get started with DevKonnect">
        Get Started
      </button>
      </Link>
    </section>
  );
};

export default Hero;
