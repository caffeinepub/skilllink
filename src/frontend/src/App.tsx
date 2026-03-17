import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chatbot } from "./components/Chatbot";
import { Navbar } from "./components/Navbar";
import { AppProvider } from "./context/AppContext";
import { AuthPage } from "./pages/AuthPage";
import { BookingsPage } from "./pages/BookingsPage";
import { ChatPage } from "./pages/ChatPage";
import { CommunitiesPage } from "./pages/CommunitiesPage";
import { CommunityDetailPage } from "./pages/CommunityDetailPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { SkillsPage } from "./pages/SkillsPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/:userId" element={<ChatPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/communities" element={<CommunitiesPage />} />
              <Route
                path="/communities/:id"
                element={<CommunityDetailPage />}
              />
            </Routes>
          </main>
        </div>
        <Chatbot />
      </AppProvider>
    </BrowserRouter>
  );
}
