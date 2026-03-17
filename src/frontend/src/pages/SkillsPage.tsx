import { useState } from "react";
import { SkillCard } from "../components/SkillCard";
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

export function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | SkillCategory>(
    "All",
  );
  const [search, setSearch] = useState("");

  const allSkills = mockUsers.flatMap((u) =>
    u.skills.map((s) => ({ skill: s, user: u })),
  );
  const filtered = allSkills.filter(({ skill, user }) => {
    const matchCat =
      activeCategory === "All" || skill.category === activeCategory;
    const matchSearch =
      !search ||
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F7FB] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Explore Skills
          </h1>
          <p className="text-gray-500 mt-1">
            Browse all skills offered in your community
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center gap-3">
          <span className="text-gray-400">🔍</span>
          <input
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            placeholder="Search skills or teachers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ALL_CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat !== "All" && (
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-1.5 ${categoryBg[cat as import("../data/mockData").SkillCategory]?.split(" ")[0] ?? ""}`}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500">
              No skills found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map(({ skill, user }) => (
              <SkillCard key={skill.id} skill={skill} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
