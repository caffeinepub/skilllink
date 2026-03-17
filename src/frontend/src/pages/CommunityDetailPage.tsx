import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

export function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    communities,
    communityPosts,
    loggedInUser,
    joinCommunity,
    leaveCommunity,
    postToCommunity,
  } = useApp();
  const [postText, setPostText] = useState("");

  const community = communities.find((c) => c.id === id);

  if (!community) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🏘️</p>
          <h2 className="text-xl font-bold text-gray-900">
            Community not found
          </h2>
          <button
            type="button"
            onClick={() => navigate("/communities")}
            className="mt-4 text-blue-600 hover:underline text-sm"
          >
            Back to Communities
          </button>
        </div>
      </div>
    );
  }

  const userId = loggedInUser?.id ?? "";
  const isMember = community.memberIds.includes(userId);
  const posts = communityPosts[community.id] ?? [];

  const members = community.memberIds
    .map((mid) => {
      if (mid === "me" || mid === loggedInUser?.id) return loggedInUser;
      return mockUsers.find((u) => u.id === mid);
    })
    .filter(Boolean);

  const creator =
    community.creatorId === "me" || community.creatorId === loggedInUser?.id
      ? loggedInUser
      : mockUsers.find((u) => u.id === community.creatorId);

  const handlePost = () => {
    if (!postText.trim() || !loggedInUser) return;
    postToCommunity(community.id, postText.trim());
    setPostText("");
  };

  const handleJoinLeave = () => {
    if (!loggedInUser) {
      navigate("/auth");
      return;
    }
    if (isMember) {
      leaveCommunity(community.id);
    } else {
      joinCommunity(community.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      {/* Banner */}
      <div className="relative" style={{ background: community.banner }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-10">
          <button
            type="button"
            onClick={() => navigate("/communities")}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-6 transition-colors"
            data-ocid="community_detail.link"
          >
            <ArrowLeft className="w-4 h-4" />
            All Communities
          </button>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge
                className={`mb-3 ${
                  TOPIC_COLORS[community.topic] ?? "bg-white/20 text-white"
                }`}
              >
                {community.topic}
              </Badge>
              <h1 className="text-3xl font-extrabold text-white">
                {community.name}
              </h1>
              <p className="text-white/80 mt-1">{community.tagline}</p>
              <div className="flex items-center gap-1.5 mt-2 text-white/70 text-sm">
                <Users className="w-4 h-4" />
                <span>{community.memberIds.length} members</span>
              </div>
            </div>
            {loggedInUser && (
              <button
                type="button"
                onClick={handleJoinLeave}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  isMember
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-white text-blue-700 hover:bg-blue-50"
                }`}
                data-ocid="community_detail.button"
              >
                {isMember ? "Leave Community" : "Join Community"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: About + Members */}
          <div className="lg:col-span-1 space-y-6">
            {/* About */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {community.description}
              </p>
              {community.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {community.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {creator && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-2">Created by</p>
                  <Link
                    to={`/profile/${creator.id}`}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={creator.avatar} alt={creator.name} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">
                      {creator.name}
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Members */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">
                Members ({community.memberIds.length})
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {members.map((member) => {
                  if (!member) return null;
                  return (
                    <Link
                      key={member.id}
                      to={`/profile/${member.id}`}
                      className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity"
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600 text-center leading-tight truncate w-full text-center">
                        {member.name.split(" ")[0]}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Community Wall */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Community Wall</h2>
              </div>

              {/* Post input */}
              {isMember && loggedInUser ? (
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex gap-3">
                    <Avatar className="w-9 h-9 shrink-0">
                      <AvatarImage
                        src={loggedInUser.avatar}
                        alt={loggedInUser.name}
                      />
                      <AvatarFallback>{loggedInUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share something with the community…"
                        rows={2}
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        className="resize-none bg-white text-sm"
                        data-ocid="community_detail.textarea"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handlePost();
                          }
                        }}
                      />
                      <div className="flex justify-end mt-2">
                        <Button
                          size="sm"
                          onClick={handlePost}
                          disabled={!postText.trim()}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5"
                          data-ocid="community_detail.submit_button"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 text-center">
                  <p className="text-sm text-gray-500">
                    {loggedInUser
                      ? "Join this community to post and participate."
                      : "Log in and join to participate."}
                  </p>
                  {!loggedInUser && (
                    <button
                      type="button"
                      onClick={() => navigate("/auth")}
                      className="mt-2 text-blue-600 text-sm font-medium hover:underline"
                    >
                      Log In
                    </button>
                  )}
                </div>
              )}

              {/* Posts */}
              <div className="divide-y divide-gray-50">
                {posts.length === 0 ? (
                  <div
                    className="py-12 text-center text-gray-400"
                    data-ocid="community_detail.empty_state"
                  >
                    <p className="text-4xl mb-3">✍️</p>
                    <p className="text-sm">
                      No posts yet. Be the first to share!
                    </p>
                  </div>
                ) : (
                  posts.map((post, idx) => (
                    <div
                      key={post.id}
                      className="px-5 py-4"
                      data-ocid={`community_detail.item.${idx + 1}`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-9 h-9 shrink-0">
                          <AvatarImage
                            src={post.authorAvatar}
                            alt={post.authorName}
                          />
                          <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <Link
                              to={`/profile/${post.authorId}`}
                              className="font-semibold text-sm text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {post.authorName}
                            </Link>
                            <span className="text-xs text-gray-400">
                              {post.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                            {post.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
