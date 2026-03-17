export type SkillCategory =
  | "Coding"
  | "Cooking"
  | "Repairing"
  | "Teaching"
  | "Music"
  | "Language"
  | "Arts"
  | "Sports";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  experience: "Beginner" | "Intermediate" | "Expert";
}

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface MockUser {
  id: string;
  name: string;
  location: string;
  bio: string;
  avatar: string;
  skills: Skill[];
  availability: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  verified: boolean;
  joinedDate: string;
  distance?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  userId: string;
  messages: Message[];
  unread: number;
}

export interface Booking {
  id: string;
  providerId: string;
  requesterId: string;
  skill: string;
  dateTime: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "completed";
}

export interface Community {
  id: string;
  name: string;
  tagline: string;
  description: string;
  topic: string;
  creatorId: string;
  memberIds: string[];
  skills: string[];
  createdDate: string;
  banner: string;
  postCount: number;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  timestamp: string;
}

export const categoryColors: Record<SkillCategory, string> = {
  Coding: "#3B82F6",
  Cooking: "#F97316",
  Repairing: "#EAB308",
  Teaching: "#22C55E",
  Music: "#A855F7",
  Language: "#EC4899",
  Arts: "#EF4444",
  Sports: "#14B8A6",
};

export const categoryBg: Record<SkillCategory, string> = {
  Coding: "bg-blue-100 text-blue-700",
  Cooking: "bg-orange-100 text-orange-700",
  Repairing: "bg-yellow-100 text-yellow-700",
  Teaching: "bg-green-100 text-green-700",
  Music: "bg-purple-100 text-purple-700",
  Language: "bg-pink-100 text-pink-700",
  Arts: "bg-red-100 text-red-700",
  Sports: "bg-teal-100 text-teal-700",
};

export const mockUsers: MockUser[] = [
  {
    id: "u1",
    name: "Aisha Patel",
    location: "Brooklyn, NY",
    bio: "Full-stack developer with 5 years of experience. Love sharing coding knowledge with beginners!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    skills: [
      {
        id: "s1",
        name: "Python Programming",
        category: "Coding",
        description: "Teach Python from basics to advanced",
        experience: "Expert",
      },
      {
        id: "s2",
        name: "React Development",
        category: "Coding",
        description: "Modern web development with React",
        experience: "Expert",
      },
    ],
    availability: "Weekends, evenings",
    rating: 4.9,
    reviewCount: 24,
    verified: true,
    joinedDate: "Jan 2024",
    distance: "0.8 mi",
    reviews: [
      {
        id: "r1",
        authorId: "u2",
        authorName: "Marcus Lee",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        rating: 5,
        text: "Aisha is an incredible teacher! Explained complex concepts clearly.",
        date: "Mar 2025",
      },
      {
        id: "r2",
        authorId: "u3",
        authorName: "Sofia Torres",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
        rating: 5,
        text: "Super patient and knowledgeable. Highly recommend!",
        date: "Feb 2025",
      },
    ],
  },
  {
    id: "u2",
    name: "Marcus Lee",
    location: "Queens, NY",
    bio: "Professional chef and culinary instructor. I believe good food brings people together.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    skills: [
      {
        id: "s3",
        name: "Italian Cooking",
        category: "Cooking",
        description: "Authentic Italian recipes and techniques",
        experience: "Expert",
      },
      {
        id: "s4",
        name: "Baking & Pastry",
        category: "Cooking",
        description: "From croissants to sourdough bread",
        experience: "Expert",
      },
    ],
    availability: "Weekday mornings",
    rating: 4.8,
    reviewCount: 18,
    verified: true,
    joinedDate: "Feb 2024",
    distance: "1.2 mi",
    reviews: [
      {
        id: "r3",
        authorId: "u1",
        authorName: "Aisha Patel",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
        rating: 5,
        text: "Marcus made the best pasta I've ever tasted. Amazing session!",
        date: "Mar 2025",
      },
    ],
  },
  {
    id: "u3",
    name: "Sofia Torres",
    location: "Manhattan, NY",
    bio: "Musician and music teacher. Playing guitar for 12 years. Let me help you find your musical voice.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    skills: [
      {
        id: "s5",
        name: "Guitar Lessons",
        category: "Music",
        description: "Classical and acoustic guitar for all levels",
        experience: "Expert",
      },
      {
        id: "s6",
        name: "Music Theory",
        category: "Music",
        description: "Fundamentals of music and composition",
        experience: "Intermediate",
      },
    ],
    availability: "Afternoons",
    rating: 4.7,
    reviewCount: 15,
    verified: false,
    joinedDate: "Mar 2024",
    distance: "2.1 mi",
    reviews: [],
  },
  {
    id: "u4",
    name: "David Kim",
    location: "Bronx, NY",
    bio: "Electrician with 10 years experience. Can teach basic home repairs and electrical safety.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    skills: [
      {
        id: "s7",
        name: "Basic Electrical Repairs",
        category: "Repairing",
        description: "Safe DIY electrical maintenance",
        experience: "Expert",
      },
      {
        id: "s8",
        name: "Plumbing Basics",
        category: "Repairing",
        description: "Fix common plumbing issues at home",
        experience: "Intermediate",
      },
    ],
    availability: "Weekends",
    rating: 4.6,
    reviewCount: 12,
    verified: true,
    joinedDate: "Apr 2024",
    distance: "3.5 mi",
    reviews: [],
  },
  {
    id: "u5",
    name: "Priya Nair",
    location: "Staten Island, NY",
    bio: "Language teacher fluent in Spanish, French, and Hindi. Making language learning fun and effective.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    skills: [
      {
        id: "s9",
        name: "Spanish Lessons",
        category: "Language",
        description: "Conversational Spanish for beginners and intermediate",
        experience: "Expert",
      },
      {
        id: "s10",
        name: "French Basics",
        category: "Language",
        description: "French grammar and conversation",
        experience: "Expert",
      },
    ],
    availability: "Flexible",
    rating: 4.9,
    reviewCount: 31,
    verified: true,
    joinedDate: "Dec 2023",
    distance: "4.2 mi",
    reviews: [],
  },
  {
    id: "u6",
    name: "James Walker",
    location: "Hoboken, NJ",
    bio: "Watercolor artist and art teacher. I help beginners discover the joy of painting.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    skills: [
      {
        id: "s11",
        name: "Watercolor Painting",
        category: "Arts",
        description: "Techniques and creative expression",
        experience: "Expert",
      },
      {
        id: "s12",
        name: "Sketching & Drawing",
        category: "Arts",
        description: "Fundamentals of drawing and perspective",
        experience: "Intermediate",
      },
    ],
    availability: "Evenings",
    rating: 4.5,
    reviewCount: 9,
    verified: false,
    joinedDate: "May 2024",
    distance: "5.0 mi",
    reviews: [],
  },
  {
    id: "u7",
    name: "Chen Wei",
    location: "Jersey City, NJ",
    bio: "Math and science tutor. Helped 50+ students improve their grades.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChenWei",
    skills: [
      {
        id: "s13",
        name: "Math Tutoring",
        category: "Teaching",
        description: "Algebra, calculus, and statistics",
        experience: "Expert",
      },
      {
        id: "s14",
        name: "Physics Help",
        category: "Teaching",
        description: "High school and college physics",
        experience: "Expert",
      },
    ],
    availability: "After 5pm weekdays",
    rating: 4.8,
    reviewCount: 22,
    verified: true,
    joinedDate: "Jan 2024",
    distance: "5.8 mi",
    reviews: [],
  },
  {
    id: "u8",
    name: "Fatima Hassan",
    location: "Brooklyn, NY",
    bio: "Certified yoga instructor and fitness coach. Making wellness accessible to everyone.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    skills: [
      {
        id: "s15",
        name: "Yoga Classes",
        category: "Sports",
        description: "Beginner-friendly yoga sessions",
        experience: "Expert",
      },
      {
        id: "s16",
        name: "HIIT Training",
        category: "Sports",
        description: "High intensity interval training",
        experience: "Intermediate",
      },
    ],
    availability: "Early mornings",
    rating: 4.7,
    reviewCount: 28,
    verified: true,
    joinedDate: "Feb 2024",
    distance: "1.5 mi",
    reviews: [],
  },
];

export const mockConversations: Record<string, Conversation> = {
  u2: {
    userId: "u2",
    unread: 2,
    messages: [
      {
        id: "m1",
        senderId: "u2",
        text: "Hi! I saw you're offering Italian cooking lessons. I'd love to learn!",
        timestamp: "10:30 AM",
      },
      {
        id: "m2",
        senderId: "me",
        text: "Hello Marcus! I'm actually looking for a cooking teacher. When are you available?",
        timestamp: "10:35 AM",
      },
      {
        id: "m3",
        senderId: "u2",
        text: "I'm free this Saturday morning. Does 10am work for you?",
        timestamp: "10:36 AM",
      },
    ],
  },
  u3: {
    userId: "u3",
    unread: 0,
    messages: [
      {
        id: "m4",
        senderId: "u3",
        text: "Hey! Are you still offering Python lessons?",
        timestamp: "Yesterday",
      },
      {
        id: "m5",
        senderId: "me",
        text: "Yes absolutely! I have slots on weekends.",
        timestamp: "Yesterday",
      },
    ],
  },
  u5: {
    userId: "u5",
    unread: 1,
    messages: [
      {
        id: "m6",
        senderId: "u5",
        text: "Hola! I can help you with Spanish. Interested in a free trial session?",
        timestamp: "2 days ago",
      },
    ],
  },
};

export const mockBookings: Booking[] = [
  {
    id: "b1",
    providerId: "u2",
    requesterId: "me",
    skill: "Italian Cooking",
    dateTime: "Saturday, Apr 5 at 10:00 AM",
    message: "Excited to learn pasta making!",
    status: "pending",
  },
  {
    id: "b2",
    providerId: "u5",
    requesterId: "me",
    skill: "Spanish Lessons",
    dateTime: "Sunday, Apr 6 at 2:00 PM",
    message: "I'm a complete beginner.",
    status: "accepted",
  },
  {
    id: "b3",
    providerId: "me",
    requesterId: "u3",
    skill: "Python Programming",
    dateTime: "Saturday, Mar 29 at 11:00 AM",
    message: "Can you teach me web scraping?",
    status: "pending",
  },
  {
    id: "b4",
    providerId: "me",
    requesterId: "u7",
    skill: "React Development",
    dateTime: "Friday, Mar 21 at 6:00 PM",
    message: "Need help with hooks and context.",
    status: "completed",
  },
];

export const mockCommunities: Community[] = [
  {
    id: "c1",
    name: "CodeCraft NYC",
    tagline: "Build, learn, and ship together.",
    description:
      "A community for developers of all levels to share projects, ask questions, and collaborate on open-source. Weekly code challenges and pair-programming sessions.",
    topic: "Coding",
    creatorId: "u1",
    memberIds: ["u1", "u7", "u4"],
    skills: ["Python", "React", "TypeScript", "Node.js"],
    createdDate: "Jan 2024",
    banner: "linear-gradient(135deg, #0B63D9 0%, #1E8BFF 100%)",
    postCount: 47,
  },
  {
    id: "c2",
    name: "Melody Makers",
    tagline: "Where every note tells a story.",
    description:
      "Musicians, singers, and music lovers unite! Share recordings, get feedback on your compositions, and find jam partners in your area. All genres welcome.",
    topic: "Music",
    creatorId: "u3",
    memberIds: ["u3", "u6", "u8"],
    skills: ["Guitar", "Piano", "Vocals", "Music Theory"],
    createdDate: "Feb 2024",
    banner: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
    postCount: 62,
  },
  {
    id: "c3",
    name: "Lens & Light",
    tagline: "Capture the world one frame at a time.",
    description:
      "A photography community for enthusiasts and professionals. Share your shots, get critique, discuss gear, and organize photo walks around the city.",
    topic: "Photography",
    creatorId: "u6",
    memberIds: ["u6", "u5", "u2"],
    skills: ["Portrait", "Landscape", "Street Photography", "Lightroom"],
    createdDate: "Mar 2024",
    banner: "linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)",
    postCount: 38,
  },
  {
    id: "c4",
    name: "Home Chefs United",
    tagline: "Good food, great company.",
    description:
      "Share recipes, cooking tips, and kitchen hacks. Monthly potluck events and live cooking demos from our talented members. From beginners to culinary pros.",
    topic: "Cooking",
    creatorId: "u2",
    memberIds: ["u2", "u1", "u5", "u8"],
    skills: ["Italian", "Baking", "Knife Skills", "Meal Prep"],
    createdDate: "Dec 2023",
    banner: "linear-gradient(135deg, #C2410C 0%, #F97316 100%)",
    postCount: 91,
  },
  {
    id: "c5",
    name: "FitLife Community",
    tagline: "Move more, feel better, live longer.",
    description:
      "Your fitness tribe! Share workout routines, nutrition tips, and progress milestones. Weekly challenges and accountability groups for all fitness levels.",
    topic: "Fitness",
    creatorId: "u8",
    memberIds: ["u8", "u4", "u7"],
    skills: ["Yoga", "HIIT", "Running", "Nutrition"],
    createdDate: "Feb 2024",
    banner: "linear-gradient(135deg, #065F46 0%, #10B981 100%)",
    postCount: 54,
  },
  {
    id: "c6",
    name: "Design District",
    tagline: "Where creativity meets craft.",
    description:
      "A space for UI/UX designers, graphic artists, and creatives to share work, give feedback, and discuss design trends. Portfolio reviews every Friday.",
    topic: "Design",
    creatorId: "u6",
    memberIds: ["u6", "u1", "u3"],
    skills: ["UI/UX", "Figma", "Illustration", "Typography"],
    createdDate: "Apr 2024",
    banner: "linear-gradient(135deg, #9D174D 0%, #EC4899 100%)",
    postCount: 29,
  },
];

export const mockCommunityPosts: Record<string, CommunityPost[]> = {
  c1: [
    {
      id: "cp1",
      communityId: "c1",
      authorId: "u1",
      authorName: "Aisha Patel",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
      text: "Just finished building a full-stack app with React + FastAPI. Happy to do a live walkthrough for anyone interested this weekend!",
      timestamp: "2 hours ago",
    },
    {
      id: "cp2",
      communityId: "c1",
      authorId: "u7",
      authorName: "Chen Wei",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChenWei",
      text: "Anyone else solving the weekly LeetCode challenge? I've been practicing dynamic programming and it's finally clicking!",
      timestamp: "5 hours ago",
    },
    {
      id: "cp3",
      communityId: "c1",
      authorId: "u4",
      authorName: "David Kim",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      text: "Switching career paths into coding — grateful for this community. The resources shared here have been invaluable.",
      timestamp: "1 day ago",
    },
  ],
  c2: [
    {
      id: "cp4",
      communityId: "c2",
      authorId: "u3",
      authorName: "Sofia Torres",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      text: "Just recorded a cover of a classic bossa nova piece. Drop your feedback in the comments — be honest! 🎸",
      timestamp: "3 hours ago",
    },
    {
      id: "cp5",
      communityId: "c2",
      authorId: "u6",
      authorName: "James Walker",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      text: "Looking for a drummer for a Saturday jam session in Brooklyn. DM if interested!",
      timestamp: "8 hours ago",
    },
    {
      id: "cp6",
      communityId: "c2",
      authorId: "u8",
      authorName: "Fatima Hassan",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
      text: "Does anyone have recommendations for good music theory books for self-study? Just picked up guitar last month.",
      timestamp: "2 days ago",
    },
  ],
  c3: [
    {
      id: "cp7",
      communityId: "c3",
      authorId: "u6",
      authorName: "James Walker",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      text: "Golden hour walk in Central Park yielded some incredible shots today. Loving the autumn light right now.",
      timestamp: "1 hour ago",
    },
    {
      id: "cp8",
      communityId: "c3",
      authorId: "u5",
      authorName: "Priya Nair",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      text: "Organizing a street photography walk next Sunday morning. Meet at Columbus Circle at 7am. All skill levels welcome!",
      timestamp: "6 hours ago",
    },
    {
      id: "cp9",
      communityId: "c3",
      authorId: "u2",
      authorName: "Marcus Lee",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      text: "My first attempt at food photography for my catering business. What settings do you recommend for indoor table shots?",
      timestamp: "1 day ago",
    },
  ],
  c4: [
    {
      id: "cp10",
      communityId: "c4",
      authorId: "u2",
      authorName: "Marcus Lee",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      text: "Tried a new sourdough recipe this week — 72-hour cold ferment. The crumb structure came out incredible. Sharing the recipe below!",
      timestamp: "4 hours ago",
    },
    {
      id: "cp11",
      communityId: "c4",
      authorId: "u1",
      authorName: "Aisha Patel",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
      text: "First time attempting homemade pasta from scratch. It took 2 hours but absolutely worth it!",
      timestamp: "1 day ago",
    },
    {
      id: "cp12",
      communityId: "c4",
      authorId: "u5",
      authorName: "Priya Nair",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      text: "Monthly potluck is this Saturday! Please RSVP and let us know what dish you're bringing. So far we have 8 confirmed.",
      timestamp: "2 days ago",
    },
  ],
  c5: [
    {
      id: "cp13",
      communityId: "c5",
      authorId: "u8",
      authorName: "Fatima Hassan",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
      text: "Morning yoga session at sunrise in Prospect Park. 6am tomorrow if anyone wants to join! Mats provided.",
      timestamp: "30 mins ago",
    },
    {
      id: "cp14",
      communityId: "c5",
      authorId: "u4",
      authorName: "David Kim",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      text: "Hit a new PR on my 5K run this morning — 22 minutes! Three months ago I couldn't run a mile. This community keeps me accountable.",
      timestamp: "3 hours ago",
    },
    {
      id: "cp15",
      communityId: "c5",
      authorId: "u7",
      authorName: "Chen Wei",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChenWei",
      text: "Sharing my meal prep guide for the week — high protein, budget-friendly, under 30 mins each. Link in bio!",
      timestamp: "1 day ago",
    },
  ],
  c6: [
    {
      id: "cp16",
      communityId: "c6",
      authorId: "u6",
      authorName: "James Walker",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      text: "Just finished a full rebrand for a local café. The brief was 'warm minimalism' — dropped the moodboard here for feedback.",
      timestamp: "2 hours ago",
    },
    {
      id: "cp17",
      communityId: "c6",
      authorId: "u1",
      authorName: "Aisha Patel",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
      text: "Portfolio review Friday is at 5pm. Drop your Figma link in this thread and we'll give you live feedback!",
      timestamp: "5 hours ago",
    },
    {
      id: "cp18",
      communityId: "c6",
      authorId: "u3",
      authorName: "Sofia Torres",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      text: "What's everyone's go-to font pairing right now? I've been loving Playfair Display + DM Sans for editorial projects.",
      timestamp: "1 day ago",
    },
  ],
};
