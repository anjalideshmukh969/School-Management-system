import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Table from "../../components/Table.jsx";
import StatCard from "../../components/StatCard.jsx";
import api from "../../api/axios.js";

const STATUS_COLORS = { paid: "text-green-700 bg-green-50", partial: "text-amber-700 bg-amber-50", pending: "text-red-700 bg-red-50" };

const MyFees = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    api.get("/fees/me").then(({ data }) => setFees(data));
  }, []);

  const totalDue = fees.reduce((sum, f) => sum + f.amountDue, 0);
  const totalPaid = fees.reduce((sum, f) => sum + f.amountPaid, 0);

  const columns = [
    { key: "feeType", label: "Fee Type" },
    { key: "academicYear", label: "Year" },
    { key: "amountDue", label: "Due", render: (r) => `₹${r.amountDue}` },
    { key: "amountPaid", label: "Paid", render: (r) => `₹${r.amountPaid}` },
    { key: "status", label: "Status", render: (r) => <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[r.status]}`}>{r.status}</span> },
    { key: "dueDate", label: "Due Date", render: (r) => r.dueDate ? new Date(r.dueDate).toLocaleDateString() : "-" },
  ];

  return (
    <DashboardLayout title="My Fees">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Due" value={`₹${totalDue}`} icon="💰" color="primary" />
        <StatCard label="Total Paid" value={`₹${totalPaid}`} icon="✅" color="green" />
        <StatCard label="Balance" value={`₹${totalDue - totalPaid}`} icon="⏳" color="amber" />
      </div>
      <Table columns={columns} rows={fees} emptyMessage="No fee records yet." />
    </DashboardLayout>
  );
};

export default MyFees;
