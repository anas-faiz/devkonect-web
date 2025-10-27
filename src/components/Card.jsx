const Card = ({user})=>{
    return(
         <div className="card bg-white/80 backdrop-blur-md w-96 shadow-xl hover:shadow-amber-400/30 transition-all duration-300 border border-white/20 rounded-2xl overflow-hidden max-h-7/12">
      {/* Profile Image */}
      <figure>
        <img
          src={user.photoUrl || "https://via.placeholder.com/150"}
          alt={user.firstName || "User"}
          className=" rounded-full shadow-md border-2 border-amber-400"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body text-center space-y-3">
        <h2 className="card-title justify-center text-2xl font-bold text-amber-800 uppercase">
          {user.firstName || "Anonymous"}
          <div className="badge badge-secondary ml-2">New</div>
        </h2>

        <p className="text-gray-700 text-sm font-medium leading-relaxed">
          {user.about || "No bio available yet."}
        </p>

        <div className="card-actions justify-center flex flex-wrap gap-2 mt-2">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <div key={index} className="badge badge-outline border-amber-500 text-amber-700">
                {skill}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm">No skills added</div>
          )}
        </div>
      </div>
    </div>
    )
}

export default Card;