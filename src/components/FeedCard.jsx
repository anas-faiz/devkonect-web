const FeedCard = ({ feed }) => {
  return (
    <div className="card bg-white/80 backdrop-blur-md w-96 shadow-xl hover:shadow-amber-400/30 transition-all duration-300 border border-white/20 rounded-2xl overflow-hidden max-h-7/12">
      {/* Profile Image */}
      <figure>
        <img
          src={feed.photoUrl || "https://via.placeholder.com/150"}
          alt={feed.firstName || "User"}
          className=" rounded-full shadow-md border-2 border-amber-400"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body text-center space-y-3">
        <h2 className="card-title justify-center text-2xl font-bold text-amber-800 uppercase">
          {feed.firstName || "Anonymous"}
          <div className="badge badge-secondary ml-2">New</div>
        </h2>
        <p className="text-gray-700 text-sm font-medium leading-relaxed">
          {feed.age ? `${feed.age}` : ""}{" "}
          {feed.gender ? `• ${feed.gender}` : ""}
        </p>

        <p className="text-gray-700 text-sm font-medium leading-relaxed">
          {feed.about || "No bio available yet."}
        </p>

        <div className="card-actions justify-center flex flex-wrap gap-2 mt-2">
          {feed.skills && feed.skills.length > 0 ? (
            feed.skills.map((skill, index) => (
              <div
                key={index}
                className="badge badge-outline border-amber-500 text-amber-700"
              >
                {skill}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm">No skills added</div>
          )}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 font-semibold uppercase tracking-wide hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200">
            Pass
          </button>

          <button className="px-6 py-2 rounded-xl border border-black text-white font-bold uppercase tracking-wide bg-gradient-to-r from-amber-400 to-red-500 hover:from-red-500 hover:to-amber-400 hover:scale-105 active:scale-95 shadow-md transition-all duration-200">
            Smash
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
