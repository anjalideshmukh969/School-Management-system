import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#academics", label: "Academics" },
  { href: "#facilities", label: "Facilities" },
  { href: "#student-life", label: "Student Life" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

const ROLE_HOME = { admin: "/admin", teacher: "/teacher", student: "/student", parent: "/student" };

const Navbar = ({ schoolName }) => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-md flex items-center justify-center font-serif font-semibold text-base transition-colors ${scrolled ? "bg-primary-900 text-white" : "bg-white text-primary-900"}`}>
            {schoolName?.charAt(0) || "S"}
          </div>
          <span className={`font-serif font-semibold transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}>{schoolName}</span>
        </div>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors hover:text-primary-600 ${scrolled ? "text-gray-600" : "text-white/90"}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          {user ? (
            <Link to={ROLE_HOME[user.role] || "/login"} className="text-sm font-semibold bg-primary-700 hover:bg-primary-800 text-white px-5 py-2.5 rounded-md transition-colors">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/login" className={`text-sm font-semibold px-5 py-2.5 rounded-md transition-colors ${scrolled ? "bg-primary-700 hover:bg-primary-800 text-white" : "bg-white hover:bg-primary-50 text-primary-900"}`}>
              Staff &amp; Student Login
            </Link>
          )}
        </div>

        <button onClick={() => setMobileOpen((o) => !o)} className={`lg:hidden text-2xl ${scrolled ? "text-gray-800" : "text-white"}`} aria-label="Toggle menu">
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 py-1.5">{l.label}</a>
          ))}
          <Link to={user ? (ROLE_HOME[user.role] || "/login") : "/login"} className="block text-center bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md mt-2">
            {user ? "Go to Dashboard" : "Staff & Student Login"}
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
