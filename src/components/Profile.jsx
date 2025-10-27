import { useSelector } from "react-redux";
import Card from "./Card";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const user = useSelector((state) => state.user);

  // ✅ Fallback in case user data isn't loaded yet
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-amber-500"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <ProfileCard user= {user}/>
    </div>
  );
};

export default Profile;


