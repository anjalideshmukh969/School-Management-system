import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import api from "../../api/axios.js";

const TeacherDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    api.get("/teachers/me").then(({ data }) => setProfile(data)).catch(() => {});
    api.get("/notices").then(({ data }) => setNotices(data.slice(0, 5))).catch(() => {});
  }, []);

  return (
    <DashboardLayout title="Teacher Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Classes Assigned" value={profile?.classesAssigned?.length ?? 0} icon="🏫" color="primary" />
        <StatCard label="Subjects" value={profile?.subjects?.length ?? 0} icon="📚" color="green" />
        <StatCard label="Employee ID" value={profile?.employeeId ?? "-"} icon="🆔" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 mb-4">My Classes</h2>
          {profile?.classesAssigned?.length ? (
            <ul className="space-y-2">
              {profile.classesAssigned.map((c) => (
                <li key={c._id} className="text-sm text-gray-700 border border-gray-100 rounded-lg px-3 py-2">
                  {c.name} - {c.section}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No classes assigned yet. Contact admin.</p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Recent Notices</h2>
          {notices.length ? (
            <ul className="divide-y divide-gray-100">
              {notices.map((n) => (
                <li key={n._id} className="py-2.5">
                  <p className="text-sm font-medium text-gray-800">{n.title}</p>
                  <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No notices.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
