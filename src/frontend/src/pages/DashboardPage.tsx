import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SkillCard } from "../components/SkillCard";
import { UserCard } from "../components/UserCard";
import { useApp } from "../context/AppContext";
import { mockUsers } from "../data/mockData";

const TOPIC_COLORS: Record<string, string> = {
  Coding: "bg-blue-100 text-blue-700",
  Music: "bg-purple-100 text-purple-700",
  Photography: "bg-teal-100 text-teal-700",
  Cooking: "bg-orange-100 text-orange-700",
  Fitness: "bg-green-100 text-green-700",
  Design: "bg-pink-100 text-pink-700",
};

export function DashboardPage() {
  const { loggedInUser, bookings, conversations, communities } = useApp();
  const navigate = useNavigate();

  if (!loggedInUser) {
    navigate("/auth");
    return null;
  }

  const nearbySkills = mockUsers
    .flatMap((u) => u.skills.map((s) => ({ skill: s, user: u })))
    .slice(0, 4);
  const suggestedUsers = mockUsers.slice(0, 4);
  const pendingCount = bookings.filter(
    (b) => b.status === "pending" && b.providerId === "me",
  ).length;
  const unreadCount = Object.values(conversations).reduce(
    (sum, c) => sum + c.unread,
    0,
  );

  const myCommunities = communities.filter((c) =>
    c.memberIds.includes(loggedInUser.id),
  );

  return (
    <div className="min-h-screen bg-[#F4F7FB] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Welcome back, {loggedInUser.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Discover skills near {loggedInUser.location}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/skills")}
            className="hidden sm:block bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            + List a Skill
          </button>
        </div>

        {/* Notification cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "My Skills",
              value: loggedInUser.skills.length,
              icon: "📚",
              action: "/profile/me",
            },
            {
              label: "Unread Messages",
              value: unreadCount,
              icon: "💬",
              action: "/chat",
            },
            {
              label: "Pending Requests",
              value: pendingCount,
              icon: "🔔",
              action: "/bookings",
            },
            {
              label: "Sessions",
              value: bookings.filter((b) => b.status === "completed").length,
              icon: "✅",
              action: "/bookings",
            },
          ].map((card) => (
            <button
              type="button"
              key={card.label}
              onClick={() => navigate(card.action)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-1">{card.icon}</div>
              <div className="text-2xl font-extrabold text-gray-900">
                {card.value}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{card.label}</div>
            </button>
          ))}
        </div>

        {/* My Communities */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">My Communities</h2>
            <button
              type="button"
              onClick={() => navigate("/communities")}
              className="text-sm text-blue-600 hover:underline"
            >
              Browse all
            </button>
          </div>
          {myCommunities.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
              <p className="text-3xl mb-2">🏘️</p>
              <p className="text-gray-500 text-sm mb-3">
                You haven't joined any communities yet.
              </p>
              <button
                type="button"
                onClick={() => navigate("/communities")}
                className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                data-ocid="dashboard.primary_button"
              >
                Browse Communities
              </button>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {myCommunities.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => navigate(`/communities/${c.id}`)}
                  className="shrink-0 w-52 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow text-left"
                  data-ocid="dashboard.card"
                >
                  <div className="h-16" style={{ background: c.banner }} />
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-gray-900 truncate">
                      {c.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1.5">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          TOPIC_COLORS[c.topic] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {c.topic}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        {c.memberIds.length}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nearby skills */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Skills Near You</h2>
            <button
              type="button"
              onClick={() => navigate("/skills")}
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {nearbySkills.map(({ skill, user }) => (
              <SkillCard key={skill.id} skill={skill} user={user} />
            ))}
          </div>
        </div>

        {/* Suggested users */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Suggested for You
            </h2>
            <button
              type="button"
              onClick={() => navigate("/search")}
              className="text-sm text-blue-600 hover:underline"
            >
              Browse all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {suggestedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
