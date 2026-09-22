import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const NAV_BY_ROLE = {
  admin: [
    { to: "/admin", label: "Dashboard", icon: "📊" },
    { to: "/admin/students", label: "Students", icon: "🎓" },
    { to: "/admin/teachers", label: "Teachers", icon: "🧑‍🏫" },
    { to: "/admin/classes", label: "Classes", icon: "🏫" },
    { to: "/admin/timetable", label: "Timetable", icon: "🗓️" },
    { to: "/admin/fees", label: "Fees", icon: "💰" },
    { to: "/admin/notices", label: "Notices", icon: "📢" },
    { to: "/admin/school-profile", label: "School Profile", icon: "🏛️" },
  ],
  teacher: [
    { to: "/teacher", label: "Dashboard", icon: "📊" },
    { to: "/teacher/attendance", label: "Attendance", icon: "✅" },
    { to: "/teacher/marks", label: "Marks Entry", icon: "📝" },
  ],
  student: [
    { to: "/student", label: "Dashboard", icon: "📊" },
    { to: "/student/attendance", label: "My Attendance", icon: "✅" },
    { to: "/student/results", label: "My Results", icon: "📄" },
    { to: "/student/timetable", label: "Timetable", icon: "🗓️" },
    { to: "/student/fees", label: "My Fees", icon: "💰" },
  ],
  parent: [
    { to: "/student", label: "Dashboard", icon: "📊" },
    { to: "/student/attendance", label: "Attendance", icon: "✅" },
    { to: "/student/results", label: "Results", icon: "📄" },
    { to: "/student/timetable", label: "Timetable", icon: "🗓️" },
    { to: "/student/fees", label: "Fees", icon: "💰" },
  ],
};

const DashboardLayout = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = NAV_BY_ROLE[user?.role] || [];
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-primary-900 text-white flex flex-col">
        <div className="p-5 border-b border-primary-800">
          <p className="font-bold text-base leading-tight">PM SHRI SCHOOL PARADSINGA</p>
          <p className="text-xs text-primary-200">Management System</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to.split("/").length === 2}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-800"}`}>
              <span>{item.icon}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-primary-800">
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-primary-300 capitalize">{user?.role}</p>
          </div>
          <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg text-sm text-primary-100 hover:bg-primary-800">🚪 Logout</button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
export default DashboardLayout;
