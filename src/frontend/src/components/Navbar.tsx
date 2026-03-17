import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function Navbar() {
  const { loggedInUser, setLoggedInUser, notificationCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setLoggedInUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #0B63D9, #1E8BFF)",
              }}
            >
              S
            </div>
            <span className="font-extrabold text-xl text-gray-900">
              SkillLink
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/skills"
              data-ocid="nav.link"
              className={`text-sm font-medium transition-colors ${isActive("/skills") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
            >
              Explore Skills
            </Link>
            <Link
              to="/communities"
              data-ocid="nav.link"
              className={`text-sm font-medium transition-colors ${isActive("/communities") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
            >
              Communities
            </Link>
            <Link
              to="/#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              How It Works
            </Link>
            {loggedInUser && (
              <Link
                to="/skills"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                List Your Skill
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {loggedInUser ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/chat")}
                  aria-label="Messages"
                  className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>Messages</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  {notificationCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2"
                    aria-label="User menu"
                  >
                    <img
                      src={loggedInUser.avatar}
                      alt={loggedInUser.name}
                      className="w-8 h-8 rounded-full bg-gray-100"
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-10 bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-44 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-sm text-gray-900">
                          {loggedInUser.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {loggedInUser.location}
                        </p>
                      </div>
                      <Link
                        to="/profile/me"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/communities"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Communities
                      </Link>
                      <Link
                        to="/bookings"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Bookings
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="hidden md:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-0.5 bg-gray-600 mb-1" />
              <div className="w-5 h-0.5 bg-gray-600 mb-1" />
              <div className="w-5 h-0.5 bg-gray-600" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3">
            <Link
              to="/skills"
              className="text-sm font-medium text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Explore Skills
            </Link>
            <Link
              to="/communities"
              className="text-sm font-medium text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Communities
            </Link>
            <Link
              to="/search"
              className="text-sm font-medium text-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Search
            </Link>
            {!loggedInUser && (
              <Link
                to="/auth"
                className="text-sm font-medium text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Log In / Sign Up
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
