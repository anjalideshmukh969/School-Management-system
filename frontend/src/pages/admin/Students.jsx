import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Table from "../../components/Table.jsx";
import api from "../../api/axios.js";

const emptyForm = { name: "", email: "", password: "", phone: "", admissionNumber: "", rollNumber: "", classRoom: "", gender: "male", guardianName: "", guardianPhone: "" };

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    const [studentsRes, classesRes] = await Promise.all([api.get("/students"), api.get("/classes")]);
    setStudents(studentsRes.data); setClasses(classesRes.data);
  };
  useEffect(() => { loadData(); }, []);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try { await api.post("/students", form); setForm(emptyForm); setShowForm(false); await loadData(); }
    catch (err) { setError(err.response?.data?.message || "Failed to add student"); }
    finally { setSaving(false); }
  };
  const handleDeactivate = async (id) => { if (!confirm("Deactivate this student?")) return; await api.delete(`/students/${id}`); loadData(); };

  const columns = [
    { key: "admissionNumber", label: "Admission No." },
    { key: "name", label: "Name", render: (r) => r.user?.name },
    { key: "class", label: "Class", render: (r) => `${r.classRoom?.name || ""} ${r.classRoom?.section || ""}` },
    { key: "rollNumber", label: "Roll No." },
    { key: "guardianName", label: "Guardian" },
    { key: "phone", label: "Phone", render: (r) => r.user?.phone || "-" },
    { key: "actions", label: "", render: (r) => <button onClick={() => handleDeactivate(r._id)} className="text-red-600 hover:underline text-xs">Deactivate</button> },
  ];

  return (
    <DashboardLayout title="Students">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">{students.length} active students</p>
        <button onClick={() => setShowForm((s) => !s)} className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded-lg">{showForm ? "Cancel" : "+ Add Student"}</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" required placeholder="Full name" value={form.name} onChange={handleChange} className="input" />
          <input name="email" type="email" required placeholder="Email (used to log in)" value={form.email} onChange={handleChange} className="input" />
          <input name="password" type="password" required placeholder="Temporary password" value={form.password} onChange={handleChange} className="input" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="input" />
          <input name="admissionNumber" required placeholder="Admission number" value={form.admissionNumber} onChange={handleChange} className="input" />
          <input name="rollNumber" placeholder="Roll number" value={form.rollNumber} onChange={handleChange} className="input" />
          <select name="classRoom" required value={form.classRoom} onChange={handleChange} className="input">
            <option value="">Select class</option>
            {classes.map((c) => <option key={c._id} value={c._id}>{c.name} - {c.section}</option>)}
          </select>
          <select name="gender" value={form.gender} onChange={handleChange} className="input">
            <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
          </select>
          <input name="guardianName" placeholder="Guardian name" value={form.guardianName} onChange={handleChange} className="input" />
          <input name="guardianPhone" placeholder="Guardian phone" value={form.guardianPhone} onChange={handleChange} className="input" />
          {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={saving} className="sm:col-span-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg">{saving ? "Saving..." : "Save Student"}</button>
        </form>
      )}
      <Table columns={columns} rows={students} emptyMessage="No students added yet." />
    </DashboardLayout>
  );
};
export default Students;
