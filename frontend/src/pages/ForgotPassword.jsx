import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [devResetUrl, setDevResetUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setMessage(""); setDevResetUrl("");
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setMessage(data.message);
      if (data.devResetUrl) setDevResetUrl(data.devResetUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">🔑</div>
            <h1 className="text-xl font-bold text-gray-800">Reset your password</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your account email and we'll send you a reset link.</p>
          </div>

          {!message ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@school.gov.in" />
              </div>
              {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
              <button type="submit" disabled={loading} className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors">
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">{message}</p>
              {devResetUrl && (
                <div className="text-xs bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                  <p className="font-medium text-amber-800 mb-1.5">Email isn't set up on this server yet — here's your reset link for now:</p>
                  <a href={devResetUrl} className="text-primary-700 break-all hover:underline">{devResetUrl}</a>
                </div>
              )}
            </div>
          )}

          <p className="text-center mt-6">
            <Link to="/login" className="text-sm text-primary-700 hover:underline">← Back to login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
