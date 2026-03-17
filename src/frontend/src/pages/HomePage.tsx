import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { SkillCard } from "../components/SkillCard";
import { mockUsers } from "../data/mockData";

const categories = [
  "All",
  "Coding",
  "Cooking",
  "Music",
  "Language",
  "Arts",
  "Sports",
  "Teaching",
  "Repairing",
];

const howItWorks = [
  {
    icon: "🔍",
    title: "Find a Skill",
    desc: "Search for skills you want to learn near you. Browse by category or location.",
  },
  {
    icon: "🤝",
    title: "Connect Locally",
    desc: "Message skill sharers directly. Set up a session that works for both of you.",
  },
  {
    icon: "🌟",
    title: "Learn & Grow",
    desc: "Meet up, learn something new, then rate your experience to help the community.",
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const howRef = useRef<HTMLDivElement>(null);

  const featuredSkills = mockUsers
    .flatMap((u) => u.skills.map((s) => ({ skill: s, user: u })))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0B63D9 0%, #1E8BFF 60%, #3AA6FF 100%)",
        }}
        className="relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Learn, Teach & Share Skills
            <br />
            Locally for Free
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            Connect with people in your community to share knowledge, learn new
            skills, and grow together &mdash; completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => navigate("/skills")}
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
            >
              Find Skills
            </button>
            <button
              type="button"
              onClick={() =>
                howRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Search strip */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gray-400">🔍</span>
            <input
              className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
              placeholder="Search skills or people nearby…"
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  navigate(`/search?q=${(e.target as HTMLInputElement).value}`);
              }}
            />
            <button
              type="button"
              onClick={() => navigate("/search")}
              className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.slice(1).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => navigate(`/search?category=${cat}`)}
                className="text-sm text-gray-600 hover:text-blue-600 px-3 py-1 rounded-full border border-gray-200 hover:border-blue-300 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured skills */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Local Skills
          </h2>
          <p className="text-gray-500 mt-2">
            Discover what your neighbors are offering
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredSkills.map(({ skill, user }) => (
            <SkillCard key={skill.id} skill={skill} user={user} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/skills"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Skills
          </Link>
        </div>
      </div>

      {/* How it works */}
      <div ref={howRef} id="how-it-works" className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              How SkillLink Works
            </h2>
            <p className="text-gray-500 mt-2">Get started in minutes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.title} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ background: "#E6F0FF" }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{ background: "linear-gradient(135deg, #0B63D9, #1E8BFF)" }}
        className="py-16"
      >
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            Ready to share your skills?
          </h2>
          <p className="text-blue-100 mb-8">
            Join thousands of people learning and teaching locally. It's
            completely free.
          </p>
          <Link
            to="/auth"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
