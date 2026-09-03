import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Students from "./pages/admin/Students.jsx";
import Teachers from "./pages/admin/Teachers.jsx";
import Classes from "./pages/admin/Classes.jsx";
import Notices from "./pages/admin/Notices.jsx";
import Fees from "./pages/admin/Fees.jsx";
import TimetableAdmin from "./pages/admin/TimetableAdmin.jsx";
import SchoolProfile from "./pages/admin/SchoolProfile.jsx";

import TeacherDashboard from "./pages/teacher/TeacherDashboard.jsx";
import TeacherAttendance from "./pages/teacher/Attendance.jsx";
import Marks from "./pages/teacher/Marks.jsx";

import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import MyAttendance from "./pages/student/MyAttendance.jsx";
import MyResults from "./pages/student/MyResults.jsx";
import MyFees from "./pages/student/MyFees.jsx";
import MyTimetable from "./pages/student/MyTimetable.jsx";

function App() {
  return (
    <Routes>
      {/* Public — the government-school-style About page, visible to anyone */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["admin"]}><Students /></ProtectedRoute>} />
      <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={["admin"]}><Teachers /></ProtectedRoute>} />
      <Route path="/admin/classes" element={<ProtectedRoute allowedRoles={["admin"]}><Classes /></ProtectedRoute>} />
      <Route path="/admin/notices" element={<ProtectedRoute allowedRoles={["admin"]}><Notices /></ProtectedRoute>} />
      <Route path="/admin/fees" element={<ProtectedRoute allowedRoles={["admin"]}><Fees /></ProtectedRoute>} />
      <Route path="/admin/timetable" element={<ProtectedRoute allowedRoles={["admin"]}><TimetableAdmin /></ProtectedRoute>} />
      <Route path="/admin/school-profile" element={<ProtectedRoute allowedRoles={["admin"]}><SchoolProfile /></ProtectedRoute>} />

      {/* Teacher */}
      <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/attendance" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAttendance /></ProtectedRoute>} />
      <Route path="/teacher/marks" element={<ProtectedRoute allowedRoles={["teacher"]}><Marks /></ProtectedRoute>} />

      {/* Student / Parent */}
      <Route path="/student" element={<ProtectedRoute allowedRoles={["student", "parent"]}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={["student", "parent"]}><MyAttendance /></ProtectedRoute>} />
      <Route path="/student/results" element={<ProtectedRoute allowedRoles={["student", "parent"]}><MyResults /></ProtectedRoute>} />
      <Route path="/student/fees" element={<ProtectedRoute allowedRoles={["student", "parent"]}><MyFees /></ProtectedRoute>} />
      <Route path="/student/timetable" element={<ProtectedRoute allowedRoles={["student", "parent"]}><MyTimetable /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
