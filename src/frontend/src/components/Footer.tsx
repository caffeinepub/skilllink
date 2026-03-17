import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #0B63D9, #1E8BFF)",
              }}
            >
              S
            </div>
            <span className="font-extrabold text-lg text-white">SkillLink</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
          <div className="flex gap-4 text-lg">
            <span className="cursor-pointer hover:text-white transition-colors">
              📧
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              🐦
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              📷
            </span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs">
          &copy; 2025 SkillLink. Free for everyone, forever.
        </div>
      </div>
    </footer>
  );
}
