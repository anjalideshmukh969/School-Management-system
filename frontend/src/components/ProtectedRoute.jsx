import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-2">
        <p className="text-xl font-semibold text-gray-700">Access denied</p>
        <p className="text-gray-500">Your role ({user.role}) can't view this page.</p>
      </div>
    );
  }
  return children;
};
export default ProtectedRoute;
