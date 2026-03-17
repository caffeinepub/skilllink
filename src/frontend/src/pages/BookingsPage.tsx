import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { mockUsers } from "../data/mockData";

type Tab = "pending" | "upcoming" | "past";

export function BookingsPage() {
  const { loggedInUser, bookings, updateBookingStatus } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("pending");

  if (!loggedInUser) {
    navigate("/auth");
    return null;
  }

  const getUser = (id: string) =>
    id === "me" ? loggedInUser : mockUsers.find((u) => u.id === id);

  const filtered = bookings.filter((b) => {
    if (tab === "pending") return b.status === "pending";
    if (tab === "upcoming") return b.status === "accepted";
    return b.status === "completed" || b.status === "rejected";
  });

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
          Bookings & Sessions
        </h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm mb-6 w-fit">
          {(["pending", "upcoming", "past"] as Tab[]).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"}`}
            >
              {t === "pending"
                ? `Pending (${bookings.filter((b) => b.status === "pending").length})`
                : t === "upcoming"
                  ? "Upcoming"
                  : "Past"}
            </button>
          ))}
        </div>

        {/* Bookings list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-gray-500">No {tab} sessions.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((booking) => {
              const isProvider = booking.providerId === "me";
              const otherUser = getUser(
                isProvider ? booking.requesterId : booking.providerId,
              );
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
                >
                  <div className="flex items-start gap-4">
                    {otherUser && (
                      <img
                        src={otherUser.avatar}
                        alt={otherUser.name}
                        className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-gray-900">
                          {booking.skill}
                        </h3>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColors[booking.status]}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {isProvider
                          ? `Requested by ${otherUser?.name}`
                          : `With ${otherUser?.name}`}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <span>📅</span> {booking.dateTime}
                      </p>
                      {booking.message && (
                        <p className="text-sm text-gray-500 italic mt-1">
                          "{booking.message}"
                        </p>
                      )}
                    </div>
                  </div>
                  {booking.status === "pending" && isProvider && (
                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() =>
                          updateBookingStatus(booking.id, "accepted")
                        }
                        className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 text-sm transition-colors"
                      >
                        ✓ Accept
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateBookingStatus(booking.id, "rejected")
                        }
                        className="flex-1 bg-red-100 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-200 text-sm transition-colors"
                      >
                        ✕ Decline
                      </button>
                    </div>
                  )}
                  {booking.status === "accepted" && (
                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/chat/${isProvider ? booking.requesterId : booking.providerId}`,
                          )
                        }
                        className="flex-1 border border-blue-200 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 text-sm"
                      >
                        💬 Message
                      </button>
                      {isProvider && (
                        <button
                          type="button"
                          onClick={() =>
                            updateBookingStatus(booking.id, "completed")
                          }
                          className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 text-sm"
                        >
                          ✅ Mark Complete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
