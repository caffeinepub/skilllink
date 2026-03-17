import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import {
  type Booking,
  type Community,
  type CommunityPost,
  type Conversation,
  type MockUser,
  mockBookings,
  mockCommunities,
  mockCommunityPosts,
  mockConversations,
  mockUsers,
} from "../data/mockData";

interface AppContextType {
  loggedInUser: MockUser | null;
  setLoggedInUser: (user: MockUser | null) => void;
  conversations: Record<string, Conversation>;
  sendMessage: (userId: string, text: string) => void;
  bookings: Booking[];
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  addBooking: (booking: Omit<Booking, "id">) => void;
  notificationCount: number;
  reportedUsers: string[];
  blockedUsers: string[];
  reportUser: (userId: string) => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  communities: Community[];
  communityPosts: Record<string, CommunityPost[]>;
  createCommunity: (
    data: Omit<
      Community,
      "id" | "creatorId" | "memberIds" | "createdDate" | "postCount"
    >,
  ) => string;
  joinCommunity: (id: string) => void;
  leaveCommunity: (id: string) => void;
  postToCommunity: (communityId: string, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<MockUser | null>(null);
  const [conversations, setConversations] =
    useState<Record<string, Conversation>>(mockConversations);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [reportedUsers, setReportedUsers] = useState<string[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [communityPosts, setCommunityPosts] =
    useState<Record<string, CommunityPost[]>>(mockCommunityPosts);

  const unreadCount = Object.values(conversations).reduce(
    (sum, c) => sum + c.unread,
    0,
  );
  const pendingBookings = bookings.filter(
    (b) => b.status === "pending" && b.providerId === "me",
  ).length;
  const notificationCount = unreadCount + pendingBookings;

  const sendMessage = useCallback((userId: string, text: string) => {
    setConversations((prev) => {
      const existing = prev[userId] || { userId, messages: [], unread: 0 };
      return {
        ...prev,
        [userId]: {
          ...existing,
          messages: [
            ...existing.messages,
            {
              id: `m${Date.now()}`,
              senderId: "me",
              text,
              timestamp: "Just now",
            },
          ],
          unread: 0,
        },
      };
    });
  }, []);

  const updateBookingStatus = useCallback(
    (id: string, status: Booking["status"]) => {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b)),
      );
    },
    [],
  );

  const addBooking = useCallback((booking: Omit<Booking, "id">) => {
    setBookings((prev) => [...prev, { ...booking, id: `b${Date.now()}` }]);
  }, []);

  const reportUser = useCallback((userId: string) => {
    setReportedUsers((prev) => [...prev, userId]);
  }, []);

  const blockUser = useCallback((userId: string) => {
    setBlockedUsers((prev) => [...prev, userId]);
  }, []);

  const unblockUser = useCallback((userId: string) => {
    setBlockedUsers((prev) => prev.filter((id) => id !== userId));
  }, []);

  const createCommunity = useCallback(
    (
      data: Omit<
        Community,
        "id" | "creatorId" | "memberIds" | "createdDate" | "postCount"
      >,
    ) => {
      const newId = `c${Date.now()}`;
      const creatorId = loggedInUser?.id ?? "me";
      const newCommunity: Community = {
        ...data,
        id: newId,
        creatorId,
        memberIds: [creatorId],
        createdDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        postCount: 0,
      };
      setCommunities((prev) => [newCommunity, ...prev]);
      setCommunityPosts((prev) => ({ ...prev, [newId]: [] }));
      return newId;
    },
    [loggedInUser],
  );

  const joinCommunity = useCallback(
    (id: string) => {
      const userId = loggedInUser?.id ?? "me";
      setCommunities((prev) =>
        prev.map((c) =>
          c.id === id && !c.memberIds.includes(userId)
            ? { ...c, memberIds: [...c.memberIds, userId] }
            : c,
        ),
      );
    },
    [loggedInUser],
  );

  const leaveCommunity = useCallback(
    (id: string) => {
      const userId = loggedInUser?.id ?? "me";
      setCommunities((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, memberIds: c.memberIds.filter((mid) => mid !== userId) }
            : c,
        ),
      );
    },
    [loggedInUser],
  );

  const postToCommunity = useCallback(
    (communityId: string, text: string) => {
      const user = loggedInUser;
      if (!user) return;
      const newPost: CommunityPost = {
        id: `cp${Date.now()}`,
        communityId,
        authorId: user.id,
        authorName: user.name,
        authorAvatar: user.avatar,
        text,
        timestamp: "Just now",
      };
      setCommunityPosts((prev) => ({
        ...prev,
        [communityId]: [newPost, ...(prev[communityId] ?? [])],
      }));
      setCommunities((prev) =>
        prev.map((c) =>
          c.id === communityId ? { ...c, postCount: c.postCount + 1 } : c,
        ),
      );
    },
    [loggedInUser],
  );

  return (
    <AppContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        conversations,
        sendMessage,
        bookings,
        updateBookingStatus,
        addBooking,
        notificationCount,
        reportedUsers,
        blockedUsers,
        reportUser,
        blockUser,
        unblockUser,
        communities,
        communityPosts,
        createCommunity,
        joinCommunity,
        leaveCommunity,
        postToCommunity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export const DEFAULT_ME: MockUser = {
  id: "me",
  name: "Alex Johnson",
  location: "Brooklyn, NY",
  bio: "Lifelong learner. Love coding, cooking, and meeting new people. Looking to share what I know and learn new skills!",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  skills: [
    {
      id: "ms1",
      name: "JavaScript",
      category: "Coding",
      description: "Front-end and Node.js development",
      experience: "Intermediate",
    },
  ],
  availability: "Weekends",
  rating: 4.5,
  reviewCount: 7,
  verified: false,
  joinedDate: "Mar 2025",
  reviews: [],
};

export { mockUsers };
