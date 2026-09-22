import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

const ROLE_HOME = { admin: "/admin", teacher: "/teacher", student: "/student", parent: "/student" };

const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      navigate(ROLE_HOME[user.role] || "/login");
    } catch {}
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left: branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-900 overflow-hidden items-center justify-center p-16">
        <motion.div
          className="absolute -top-20 -right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 28px)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-md"
        >
          <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl mb-8">🏫</div>
          <h1 className="font-serif text-3xl font-semibold text-white leading-tight mb-4">PM SHRI SCHOOL PARADSINGA</h1>
          <p className="text-primary-200 leading-relaxed">
            A single portal for admins, teachers, and students — attendance, results, timetables, and school updates, all in one place.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-300 hover:text-white mt-10 transition-colors">
            ← Back to school website
          </Link>
        </motion.div>
      </div>

      {/* Right: login form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">🏫</div>
            <h1 className="text-xl font-bold text-gray-800">PM SHRI SCHOOL PARADSINGA</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Sign In</h2>
              <p className="text-gray-500 text-sm mt-1">Enter your credentials to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@school.gov.in" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary-700 hover:underline">Forgot password?</Link>
                </div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" />
              </div>
              {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
              <button type="submit" disabled={loading} className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to school website</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;