import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Table from "../../components/Table.jsx";
import api from "../../api/axios.js";
const emptyForm = { student: "", academicYear: "", feeType: "", amountDue: "", dueDate: "" };
const STATUS_COLORS = { paid: "text-green-700 bg-green-50", partial: "text-amber-700 bg-amber-50", pending: "text-red-700 bg-red-50" };
const Fees = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [fees, setFees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [payAmount, setPayAmount] = useState({});
  useEffect(() => { api.get("/students").then(({ data }) => setStudents(data)); }, []);
  const loadFees = (studentId) => { if (!studentId) return setFees([]); api.get(`/fees/student/${studentId}`).then(({ data }) => setFees(data)); };
  useEffect(() => { loadFees(selectedStudent); }, [selectedStudent]);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => { e.preventDefault(); setSaving(true); try { await api.post("/fees", { ...form, student: selectedStudent || form.student }); setForm(emptyForm); setShowForm(false); loadFees(selectedStudent); } finally { setSaving(false); } };
  const handlePay = async (feeId) => { const amount = payAmount[feeId]; if (!amount) return; await api.patch(`/fees/${feeId}/pay`, { amount }); setPayAmount({ ...payAmount, [feeId]: "" }); loadFees(selectedStudent); };
  const columns = [
    { key: "feeType", label: "Fee Type" }, { key: "academicYear", label: "Year" },
    { key: "amountDue", label: "Due", render: (r) => `₹${r.amountDue}` }, { key: "amountPaid", label: "Paid", render: (r) => `₹${r.amountPaid}` },
    { key: "status", label: "Status", render: (r) => <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[r.status]}`}>{r.status}</span> },
    { key: "action", label: "Record Payment", render: (r) => r.status !== "paid" && (
      <div className="flex gap-2">
        <input type="number" placeholder="Amount" value={payAmount[r._id] || ""} onChange={(e) => setPayAmount({ ...payAmount, [r._id]: e.target.value })} className="input w-24 text-sm py-1" />
        <button onClick={() => handlePay(r._id)} className="text-primary-700 text-xs font-medium hover:underline">Pay</button>
      </div>
    )},
  ];
  return (
    <DashboardLayout title="Fee Management">
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Student</label>
          <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="input w-64">
            <option value="">Select student</option>
            {students.map((s) => <option key={s._id} value={s._id}>{s.user?.name} ({s.admissionNumber})</option>)}
          </select>
        </div>
        {selectedStudent && <button onClick={() => setShowForm((s) => !s)} className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded-lg">{showForm ? "Cancel" : "+ Add Fee Record"}</button>}
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="feeType" required placeholder="Fee type (e.g. Tuition)" value={form.feeType} onChange={handleChange} className="input" />
          <input name="academicYear" required placeholder="Academic year (e.g. 2026-2027)" value={form.academicYear} onChange={handleChange} className="input" />
          <input name="amountDue" type="number" required placeholder="Amount due" value={form.amountDue} onChange={handleChange} className="input" />
          <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="input" />
          <button type="submit" disabled={saving} className="sm:col-span-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg">{saving ? "Saving..." : "Save Fee Record"}</button>
        </form>
      )}
      {selectedStudent ? <Table columns={columns} rows={fees} emptyMessage="No fee records for this student yet." /> : <p className="text-gray-500 text-sm text-center py-8">Select a student to view or add fee records.</p>}
    </DashboardLayout>
  );
};
export default Fees;
