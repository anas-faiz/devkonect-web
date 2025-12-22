import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/userSlice";

const EditProfileCard = ({ user, onSave }) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    about,
    photoUrl,
    skills = [],
  } = user || {};

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    age: age || "",
    gender: gender || "",
    about: about || "",
    skills: skills || [],
    photoUrl: photoUrl || "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  // -----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm({ ...form, skills: [...form.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/profile/edit`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          skills: form.skills,
          about: form.about,
          age: form.age,
          gender: form.gender,
          photoUrl: form.photoUrl,
        },
        { withCredentials: true }
      );

      dispatch(adduser(res.data));

      if (onSave) onSave(form);

      setToast("success");
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      setToast("error");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  // -----------------
  return (
    <>
      <div className="card lg:card-side bg-white/10 backdrop-blur-md shadow-lg hover:shadow-amber-400/40 transition-all duration-300 border border-white/20 rounded-2xl overflow-hidden max-w-4xl mx-auto p-6">
        {/* Profile Image */}
        <figure className="flex justify-center items-center w-full lg:w-1/3 from-amber-200/30 to-transparent p-4">
          <img
            src={form.photoUrl || "https://via.placeholder.com/200"}
            alt={`${form.firstName || "User"} ${form.lastName || ""}`}
            className="w-40 h-40 object-cover rounded-full border-4 border-amber-400 shadow-md"
          />
        </figure>

        {/* Profile Info */}
        <div className="card-body text-center lg:text-left space-y-4">
          {/* Name Fields */}
          {isEditing ? (
            <>
              <div className="flex flex-col lg:flex-row gap-2">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="photoUrl"
                  value={form.photoUrl}
                  onChange={handleChange}
                  placeholder="Photo URL"
                  className="input input-bordered w-full"
                />
              </div>
            </>
          ) : (
            <h2 className="text-3xl font-bold text-amber-700 capitalize">
              {form.firstName} {form.lastName}
            </h2>
          )}

          {/* Age & Gender */}
          {isEditing ? (
            <div className="flex flex-col lg:flex-row gap-2">
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                className="input input-bordered w-full"
              />
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          ) : (
            <p className="text-sm font-medium">
              {form.age && `${form.age} years old`}{" "}
              {form.gender && `• ${form.gender}`}
            </p>
          )}

          {/* About */}
          {isEditing ? (
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="Write something about yourself..."
              className="textarea textarea-bordered w-full"
            />
          ) : (
            <p className="italic text-sm leading-relaxed">
              {form.about || "No bio available yet."}
            </p>
          )}

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-amber-700 mb-2">Skills:</h3>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {form.skills.length > 0 ? (
                form.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="badge badge-outline border-amber-500 text-amber-700 flex items-center gap-1"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 text-red-500 font-bold hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No skills added</span>
              )}
            </div>

            {isEditing && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add new skill"
                  className="input input-bordered w-full"
                />
                <button
                  onClick={handleAddSkill}
                  className="btn btn-sm bg-amber-500 text-white hover:bg-amber-600"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="card-actions justify-center lg:justify-start mt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`btn btn-sm ${
                    loading
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-sm btn-outline border-gray-300 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-sm btn-outline border-amber-400 text-amber-700 hover:bg-amber-400 hover:text-white transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast === "success" && (
        <div className="toast toast-top toast-end fixed top-20">
          <div className="alert alert-success">
            <span>Profile updated successfully ✅</span>
          </div>
        </div>
      )}

      {toast === "error" && (
        <div className="toast toast-top toast-end fixed top-20">
          <div className="alert alert-error">
            <span>Failed to update profile ❌</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileCard;
