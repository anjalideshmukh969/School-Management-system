import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = async (email, password) => {
    setLoading(true); setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      throw err;
    } finally { setLoading(false); }
  };
  const logout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); setUser(null); };
  return <AuthContext.Provider value={{ user, login, logout, loading, error, setError }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);