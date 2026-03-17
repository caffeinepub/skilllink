import { useNavigate } from "react-router-dom";
import { type MockUser, categoryBg } from "../data/mockData";
import { StarRating } from "./StarRating";

interface UserCardProps {
  user: MockUser;
}

export function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate();
  const topSkill = user.skills[0];

  return (
    <button
      type="button"
      onClick={() => navigate(`/profile/${user.id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center w-full"
    >
      <div className="relative mb-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full bg-gray-100"
        />
        {user.verified && (
          <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            ✓
          </span>
        )}
      </div>
      <h3 className="font-bold text-gray-900">{user.name}</h3>
      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
        <span>📍</span>
        {user.location}
        {user.distance && (
          <span className="ml-1 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full text-xs font-medium">
            {user.distance}
          </span>
        )}
      </p>
      {topSkill && (
        <span
          className={`mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${categoryBg[topSkill.category]}`}
        >
          {topSkill.name}
        </span>
      )}
      <div className="mt-2">
        <StarRating rating={user.rating} size="sm" />
        <p className="text-xs text-gray-400">{user.reviewCount} reviews</p>
      </div>
    </button>
  );
}
