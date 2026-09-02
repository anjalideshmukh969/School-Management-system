import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Table from "../../components/Table.jsx";
import StatCard from "../../components/StatCard.jsx";
import api from "../../api/axios.js";

const STATUS_COLORS = {
  present: "text-green-700 bg-green-50",
  absent: "text-red-700 bg-red-50",
  late: "text-amber-700 bg-amber-50",
  leave: "text-gray-700 bg-gray-100",
};

const MyAttendance = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/attendance/me").then(({ data }) => setData(data));
  }, []);

  const columns = [
    { key: "date", label: "Date", render: (r) => new Date(r.date).toLocaleDateString() },
    {
      key: "status", label: "Status", render: (r) => (
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[r.status]}`}>{r.status}</span>
      ),
    },
    { key: "remarks", label: "Remarks", render: (r) => r.remarks || "-" },
  ];

  return (
    <DashboardLayout title="My Attendance">
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard label="Overall %" value={`${data.summary.percentage}%`} icon="📈" color="primary" />
          <StatCard label="Days Present" value={data.summary.present} icon="✅" color="green" />
          <StatCard label="Days Absent" value={data.summary.absent} icon="❌" color="rose" />
        </div>
      )}
      <Table columns={columns} rows={data?.records} emptyMessage="No attendance records yet." />
    </DashboardLayout>
  );
};

export default MyAttendance;
