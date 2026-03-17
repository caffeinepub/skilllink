import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarRating } from "../components/StarRating";
import { useApp } from "../context/AppContext";
import {
  type Skill,
  type SkillCategory,
  categoryBg,
  mockUsers,
} from "../data/mockData";

const ALL_CATEGORIES: SkillCategory[] = [
  "Coding",
  "Cooking",
  "Repairing",
  "Teaching",
  "Music",
  "Language",
  "Arts",
  "Sports",
];

export function ProfilePage() {
  const { id } = useParams();
  const { loggedInUser, setLoggedInUser, reportUser, blockUser, blockedUsers } =
    useApp();
  const navigate = useNavigate();

  const isMe = id === "me" || id === loggedInUser?.id;
  const profileUser = isMe ? loggedInUser : mockUsers.find((u) => u.id === id);

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(profileUser?.name || "");
  const [editBio, setEditBio] = useState(profileUser?.bio || "");
  const [editLocation, setEditLocation] = useState(profileUser?.location || "");
  const [editAvailability, setEditAvailability] = useState(
    profileUser?.availability || "",
  );
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCat, setNewSkillCat] = useState<SkillCategory>("Coding");
  const [newSkillDesc, setNewSkillDesc] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");

  if (!profileUser)
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );

  const isBlocked = blockedUsers.includes(profileUser.id);

  const saveProfile = () => {
    if (loggedInUser && isMe) {
      setLoggedInUser({
        ...loggedInUser,
        name: editName,
        bio: editBio,
        location: editLocation,
        availability: editAvailability,
      });
    }
    setEditing(false);
  };

  const addSkill = () => {
    if (!newSkillName || !loggedInUser) return;
    const skill: Skill = {
      id: `s${Date.now()}`,
      name: newSkillName,
      category: newSkillCat,
      description: newSkillDesc,
      experience: "Beginner",
    };
    setLoggedInUser({
      ...loggedInUser,
      skills: [...loggedInUser.skills, skill],
    });
    setNewSkillName("");
    setNewSkillDesc("");
    setShowAddSkill(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-20 h-20 rounded-full bg-gray-100"
              />
              {profileUser.verified && (
                <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
              )}
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="flex flex-col gap-3">
                  <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Name"
                  />
                  <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="Location"
                  />
                  <textarea
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none"
                    rows={3}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Bio"
                  />
                  <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    value={editAvailability}
                    onChange={(e) => setEditAvailability(e.target.value)}
                    placeholder="Availability"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={saveProfile}
                      className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="text-sm text-gray-500 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-extrabold text-gray-900">
                      {profileUser.name}
                    </h1>
                    {profileUser.verified && (
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        ✔ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                    📍 {profileUser.location}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {profileUser.bio}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Available: {profileUser.availability}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <StarRating rating={profileUser.rating} size="md" />
                    <span className="text-sm text-gray-500">
                      {profileUser.reviewCount} reviews
                    </span>
                    <span className="text-sm text-gray-400">
                      Joined {profileUser.joinedDate}
                    </span>
                  </div>
                </>
              )}
            </div>
            {isMe && !editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-sm text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Edit Profile
              </button>
            )}
            {!isMe && (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/chat/${profileUser.id}`)}
                  className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Message
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/bookings?request=${profileUser.id}`)
                  }
                  className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Book Session
                </button>
                <button
                  type="button"
                  onClick={() => setShowReport(true)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Report / Block
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Skills Offered</h2>
            {isMe && (
              <button
                type="button"
                onClick={() => setShowAddSkill(!showAddSkill)}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add Skill
              </button>
            )}
          </div>
          {showAddSkill && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4 flex flex-col gap-3">
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                placeholder="Skill name"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
              />
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                value={newSkillCat}
                onChange={(e) =>
                  setNewSkillCat(e.target.value as SkillCategory)
                }
              >
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                placeholder="Short description"
                value={newSkillDesc}
                onChange={(e) => setNewSkillDesc(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSkill(false)}
                  className="text-sm text-gray-500 px-4 py-2 rounded-lg border border-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {profileUser.skills.length === 0 ? (
            <p className="text-gray-400 text-sm">No skills listed yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {profileUser.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">
                        {skill.name}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryBg[skill.category]}`}
                      >
                        {skill.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {skill.experience}
                      </span>
                    </div>
                    {skill.description && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {skill.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">
            Reviews ({profileUser.reviews.length})
          </h2>
          {profileUser.reviews.length === 0 ? (
            <p className="text-gray-400 text-sm">No reviews yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {profileUser.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={review.authorAvatar}
                      alt={review.authorName}
                      className="w-8 h-8 rounded-full bg-gray-100"
                    />
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {review.authorName}
                      </p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Report modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-gray-900 mb-2">
              Report or Block User
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Help keep SkillLink safe for everyone.
            </p>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none mb-4"
              rows={3}
              placeholder="Reason for report (optional)"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  reportUser(profileUser.id);
                  setShowReport(false);
                }}
                className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 text-sm"
              >
                Report User
              </button>
              <button
                type="button"
                onClick={() => {
                  isBlocked
                    ? blockUser(profileUser.id)
                    : blockUser(profileUser.id);
                  setShowReport(false);
                }}
                className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 text-sm"
              >
                {isBlocked ? "Unblock" : "Block"} User
              </button>
              <button
                type="button"
                onClick={() => setShowReport(false)}
                className="w-full text-gray-500 py-2 rounded-lg border border-gray-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
