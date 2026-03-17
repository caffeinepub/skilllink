import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SkillCard } from "../components/SkillCard";
import { UserCard } from "../components/UserCard";
import { type SkillCategory, categoryBg, mockUsers } from "../data/mockData";

const ALL_CATEGORIES: ("All" | SkillCategory)[] = [
  "All",
  "Coding",
  "Cooking",
  "Repairing",
  "Teaching",
  "Music",
  "Language",
  "Arts",
  "Sports",
];

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState<"All" | SkillCategory>(
    (searchParams.get("category") as SkillCategory) || "All",
  );
  const [location, setLocation] = useState("");
  const [viewMode, setViewMode] = useState<"skills" | "people">("skills");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setCategory((searchParams.get("category") as SkillCategory) || "All");
  }, [searchParams]);

  const filteredUsers = mockUsers.filter((u) => {
    const matchQuery =
      !query ||
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.skills.some((s) => s.name.toLowerCase().includes(query.toLowerCase()));
    const matchCat =
      category === "All" || u.skills.some((s) => s.category === category);
    const matchLoc =
      !location || u.location.toLowerCase().includes(location.toLowerCase());
    return matchQuery && matchCat && matchLoc;
  });

  const filteredSkills = mockUsers
    .flatMap((u) => u.skills.map((s) => ({ skill: s, user: u })))
    .filter(({ skill, user }) => {
      const matchQuery =
        !query ||
        skill.name.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === "All" || skill.category === category;
      const matchLoc =
        !location ||
        user.location.toLowerCase().includes(location.toLowerCase());
      return matchQuery && matchCat && matchLoc;
    });

  return (
    <div className="min-h-screen bg-[#F4F7FB] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
          Search SkillLink
        </h1>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <span className="text-gray-400">🔍</span>
              <input
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                placeholder="Skill or name…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <span className="text-gray-400">📍</span>
              <input
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                placeholder="City or area…"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as "All" | SkillCategory)
              }
            >
              {ALL_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setViewMode("skills")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${viewMode === "skills" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}
          >
            Skills ({filteredSkills.length})
          </button>
          <button
            type="button"
            onClick={() => setViewMode("people")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${viewMode === "people" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}
          >
            People ({filteredUsers.length})
          </button>
        </div>

        {viewMode === "skills" ? (
          filteredSkills.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">
                No skills found. Try different filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredSkills.map(({ skill, user }) => (
                <SkillCard key={skill.id} skill={skill} user={user} />
              ))}
            </div>
          )
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              No people found. Try different filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
