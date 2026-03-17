import { useNavigate } from "react-router-dom";
import {
  type MockUser,
  type Skill,
  categoryBg,
  categoryColors,
} from "../data/mockData";
import { StarRating } from "./StarRating";

interface SkillCardProps {
  skill: Skill;
  user: MockUser;
}

const categoryIcons: Record<string, string> = {
  Coding: "💻",
  Cooking: "🍳",
  Repairing: "🔧",
  Teaching: "📚",
  Music: "🎵",
  Language: "🌍",
  Arts: "🎨",
  Sports: "⚽",
};

export function SkillCard({ skill, user }: SkillCardProps) {
  const navigate = useNavigate();
  const color = categoryColors[skill.category];

  return (
    <button
      type="button"
      onClick={() => navigate(`/profile/${user.id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200 text-left w-full"
    >
      <div
        className="h-28 flex items-center justify-center text-5xl"
        style={{
          background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        }}
      >
        <span>{categoryIcons[skill.category]}</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base mb-1">{skill.name}</h3>
        <span
          className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${categoryBg[skill.category]}`}
        >
          {skill.category}
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-6 h-6 rounded-full bg-gray-100"
            />
            <span className="text-sm text-gray-700">{user.name}</span>
          </div>
          <StarRating rating={user.rating} size="sm" />
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <span>📍</span>
          <span>{user.location}</span>
          {user.distance && (
            <span className="ml-1 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full text-xs font-medium">
              {user.distance}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
