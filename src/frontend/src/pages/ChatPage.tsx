import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { mockUsers } from "../data/mockData";

export function ChatPage() {
  const { userId } = useParams();
  const { loggedInUser, conversations, sendMessage } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeUserId, setActiveUserId] = useState<string>(
    userId || Object.keys(conversations)[0] || "",
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/auth", { state: { from: location.pathname } });
    }
  }, [loggedInUser, navigate, location]);

  // Keep activeUserId in sync when userId param changes
  useEffect(() => {
    if (userId) {
      setActiveUserId(userId);
    }
  }, [userId]);

  if (!loggedInUser) return null;

  const conversationList = Object.values(conversations);
  const activeConv = conversations[activeUserId];
  const activeUser = mockUsers.find((u) => u.id === activeUserId);

  const handleSend = () => {
    if (!input.trim() || !activeUserId) return;
    sendMessage(activeUserId, input.trim());
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Messages</h1>
        <div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex"
          style={{ minHeight: "500px" }}
        >
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 border-r border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <p className="font-semibold text-sm text-gray-700">
                Conversations
              </p>
            </div>
            {conversationList.length === 0 && !userId ? (
              <p className="text-gray-400 text-sm p-4">No conversations yet.</p>
            ) : (
              <>
                {conversationList.map((conv) => {
                  const user = mockUsers.find((u) => u.id === conv.userId);
                  if (!user) return null;
                  const lastMsg = conv.messages[conv.messages.length - 1];
                  return (
                    <button
                      type="button"
                      key={conv.userId}
                      data-ocid={`chat.item.${conv.userId}`}
                      onClick={() => setActiveUserId(conv.userId)}
                      className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-left transition-colors ${
                        activeUserId === conv.userId
                          ? "bg-blue-50 border-l-2 border-blue-600"
                          : ""
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-9 h-9 rounded-full bg-gray-100"
                        />
                        {conv.unread > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                          {user.name}
                        </p>
                        {lastMsg && (
                          <p className="text-xs text-gray-400 truncate">
                            {lastMsg.senderId === "me" ? "You: " : ""}
                            {lastMsg.text}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
                {/* Show new contact in sidebar if not yet in conversations */}
                {userId &&
                  !conversations[userId] &&
                  (() => {
                    const newUser = mockUsers.find((u) => u.id === userId);
                    if (!newUser) return null;
                    return (
                      <button
                        type="button"
                        key={newUser.id}
                        data-ocid="chat.new_contact.button"
                        onClick={() => setActiveUserId(newUser.id)}
                        className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-left transition-colors ${
                          activeUserId === newUser.id
                            ? "bg-blue-50 border-l-2 border-blue-600"
                            : ""
                        }`}
                      >
                        <img
                          src={newUser.avatar}
                          alt={newUser.name}
                          className="w-9 h-9 rounded-full bg-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 truncate">
                            {newUser.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            New conversation
                          </p>
                        </div>
                      </button>
                    );
                  })()}
              </>
            )}
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {activeUser ? (
              <>
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <img
                    src={activeUser.avatar}
                    alt={activeUser.name}
                    className="w-9 h-9 rounded-full bg-gray-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {activeUser.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {activeUser.location}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-ocid="chat.view_profile.button"
                    onClick={() => navigate(`/profile/${activeUser.id}`)}
                    className="ml-auto text-xs text-blue-600 hover:underline"
                  >
                    View Profile
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                  {activeConv?.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.senderId === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                          msg.senderId === "me"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.senderId === "me"
                              ? "text-blue-200"
                              : "text-gray-400"
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!activeConv || activeConv.messages.length === 0) && (
                    <div
                      data-ocid="chat.empty_state"
                      className="text-center py-8 text-gray-400 text-sm"
                    >
                      No messages yet. Start the conversation!
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-100 flex items-center gap-3">
                  <input
                    data-ocid="chat.input"
                    className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-400"
                    placeholder="Type a message…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                  />
                  <button
                    type="button"
                    data-ocid="chat.submit_button"
                    onClick={handleSend}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Send message</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div
                data-ocid="chat.empty_state"
                className="flex-1 flex items-center justify-center text-gray-400 text-sm"
              >
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
