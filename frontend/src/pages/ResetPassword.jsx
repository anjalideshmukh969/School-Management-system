import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios.js";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) { setError("Passwords don't match"); return; }
    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { newPassword });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "This reset link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">🔒</div>
            <h1 className="text-xl font-bold text-gray-800">Set a new password</h1>
          </div>

          {success ? (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
              Password reset successfully. Redirecting you to login...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" required minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input" placeholder="••••••••" />
              </div>
              {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
              <button type="submit" disabled={loading} className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors">
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <p className="text-center mt-6">
            <Link to="/login" className="text-sm text-primary-700 hover:underline">← Back to login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
