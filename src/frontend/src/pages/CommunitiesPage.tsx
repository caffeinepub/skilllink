import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateCommunityModal } from "../components/CreateCommunityModal";
import { useApp } from "../context/AppContext";

const TOPICS = [
  "All",
  "Coding",
  "Music",
  "Photography",
  "Cooking",
  "Fitness",
  "Design",
];

const TOPIC_COLORS: Record<string, string> = {
  Coding: "bg-blue-100 text-blue-700",
  Music: "bg-purple-100 text-purple-700",
  Photography: "bg-teal-100 text-teal-700",
  Cooking: "bg-orange-100 text-orange-700",
  Fitness: "bg-green-100 text-green-700",
  Design: "bg-pink-100 text-pink-700",
};

export function CommunitiesPage() {
  const { communities, loggedInUser, joinCommunity, leaveCommunity } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const userId = loggedInUser?.id ?? "me";

  const filtered = communities.filter((c) => {
    const matchesTopic = activeTopic === "All" || c.topic === activeTopic;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.topic.toLowerCase().includes(search.toLowerCase()) ||
      c.tagline.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const handleJoinLeave = (
    e: React.MouseEvent,
    id: string,
    isMember: boolean,
  ) => {
    e.stopPropagation();
    if (!loggedInUser) {
      navigate("/auth");
      return;
    }
    if (isMember) {
      leaveCommunity(id);
    } else {
      joinCommunity(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Communities
            </h1>
            <p className="text-gray-500 mt-1">
              Find your tribe — join or create a community around your skills.
            </p>
          </div>
          {loggedInUser && (
            <Button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:flex items-center gap-2"
              data-ocid="communities.open_modal_button"
            >
              <Plus className="w-4 h-4" />
              Create Community
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search communities by name or topic…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
            data-ocid="communities.search_input"
          />
        </div>

        {/* Topic filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {TOPICS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setActiveTopic(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTopic === t
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
              data-ocid="communities.filter.tab"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-20 bg-white rounded-2xl border border-gray-100"
            data-ocid="communities.empty_state"
          >
            <p className="text-5xl mb-4">🏘️</p>
            <h3 className="text-lg font-bold text-gray-900">
              No communities found
            </h3>
            <p className="text-gray-500 mt-1">
              Try a different search or topic filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((community, idx) => {
              const isMember = community.memberIds.includes(userId);
              return (
                <article
                  key={community.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                  data-ocid={`communities.item.${idx + 1}`}
                >
                  {/* Banner — clickable area */}
                  <button
                    type="button"
                    onClick={() => navigate(`/communities/${community.id}`)}
                    className="w-full text-left"
                    aria-label={`View ${community.name}`}
                  >
                    <div
                      className="h-24"
                      style={{ background: community.banner }}
                    />
                  </button>

                  <div className="p-5">
                    <button
                      type="button"
                      onClick={() => navigate(`/communities/${community.id}`)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                          {community.name}
                        </h3>
                        <Badge
                          className={`shrink-0 text-xs ${
                            TOPIC_COLORS[community.topic] ??
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {community.topic}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {community.tagline}
                      </p>
                    </button>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {community.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {s}
                        </span>
                      ))}
                      {community.skills.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">
                          +{community.skills.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{community.memberIds.length} members</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) =>
                          handleJoinLeave(e, community.id, isMember)
                        }
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                          isMember
                            ? "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        data-ocid={`communities.item.${idx + 1}`}
                      >
                        {isMember ? "Leave" : "Join"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Mobile create button */}
        {loggedInUser && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="sm:hidden fixed bottom-20 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
            data-ocid="communities.open_modal_button"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>

      <CreateCommunityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
