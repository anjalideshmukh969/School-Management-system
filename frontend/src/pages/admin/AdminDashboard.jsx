import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import api from "../../api/axios.js";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard/admin-stats")
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Admin Dashboard">
      {loading ? (
        <p className="text-gray-500">Loading dashboard...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Students" value={stats?.totalStudents ?? 0} icon="🎓" color="primary" />
            <StatCard label="Total Teachers" value={stats?.totalTeachers ?? 0} icon="🧑‍🏫" color="green" />
            <StatCard label="Total Classes" value={stats?.totalClasses ?? 0} icon="🏫" color="amber" />
            <StatCard label="Present Today" value={stats?.presentToday ?? 0} icon="✅" color="rose" />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Recent Notices</h2>
            {stats?.recentNotices?.length ? (
              <ul className="divide-y divide-gray-100">
                {stats.recentNotices.map((n) => (
                  <li key={n._id} className="py-3">
                    <p className="font-medium text-gray-800">{n.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{n.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      By {n.postedBy?.name} · {new Date(n.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No notices posted yet.</p>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
