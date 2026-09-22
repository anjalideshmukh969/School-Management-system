import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import api from "../../api/axios.js";
const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    api.get("/students/me").then(({ data }) => setProfile(data)).catch(() => {});
    api.get("/attendance/me").then(({ data }) => setAttendance(data)).catch(() => {});
    api.get("/notices").then(({ data }) => setNotices(data.slice(0, 5))).catch(() => {});
  }, []);
  return (
    <DashboardLayout title="Student Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Class" value={profile ? `${profile.classRoom?.name} - ${profile.classRoom?.section}` : "-"} icon="🏫" color="primary" />
        <StatCard label="Attendance" value={attendance ? `${attendance.summary.percentage}%` : "-"} icon="✅" color="green" />
        <StatCard label="Admission No." value={profile?.admissionNumber ?? "-"} icon="🆔" color="amber" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-semibold text-gray-800 mb-4">Recent Notices</h2>
        {notices.length ? (
          <ul className="divide-y divide-gray-100">{notices.map((n) => <li key={n._id} className="py-3"><p className="font-medium text-gray-800">{n.title}</p><p className="text-sm text-gray-500">{n.content}</p><p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p></li>)}</ul>
        ) : <p className="text-gray-500 text-sm">No notices yet.</p>}
      </div>
    </DashboardLayout>
  );
};
export default StudentDashboard;
