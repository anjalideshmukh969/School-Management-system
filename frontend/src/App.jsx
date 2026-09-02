import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Students from "./pages/admin/Students.jsx";
import Teachers from "./pages/admin/Teachers.jsx";
import Classes from "./pages/admin/Classes.jsx";
import Notices from "./pages/admin/Notices.jsx";

import TeacherDashboard from "./pages/teacher/TeacherDashboard.jsx";
import TeacherAttendance from "./pages/teacher/Attendance.jsx";
import Marks from "./pages/teacher/Marks.jsx";

import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import MyAttendance from "./pages/student/MyAttendance.jsx";
import MyResults from "./pages/student/MyResults.jsx";

const ROLE_HOME = { admin: "/admin", teacher: "/teacher", student: "/student", parent: "/student" };

const RootRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME[user.role] || "/login"} replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["admin"]}><Students /></ProtectedRoute>} />
      <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={["admin"]}><Teachers /></ProtectedRoute>} />
      <Route path="/admin/classes" element={<ProtectedRoute allowedRoles={["admin"]}><Classes /></ProtectedRoute>} />
      <Route path="/admin/notices" element={<ProtectedRoute allowedRoles={["admin"]}><Notices /></ProtectedRoute>} />

      {/* Teacher */}
      <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/attendance" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAttendance /></ProtectedRoute>} />
      <Route path="/teacher/marks" element={<ProtectedRoute allowedRoles={["teacher"]}><Marks /></ProtectedRoute>} />

      {/* Student / Parent */}
      <Route path="/student" element={<ProtectedRoute allowedRoles={["student", "parent"]}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={["student", "parent"]}><MyAttendance /></ProtectedRoute>} />
      <Route path="/student/results" element={<ProtectedRoute allowedRoles={["student", "parent"]}><MyResults /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
