import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Table from "../../components/Table.jsx";
import api from "../../api/axios.js";

const emptyForm = { name: "", email: "", password: "", phone: "", employeeId: "", subjects: "", qualification: "" };

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTeachers = () => api.get("/teachers").then(({ data }) => setTeachers(data));
  useEffect(() => { loadTeachers(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/teachers", {
        ...form,
        subjects: form.subjects.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setForm(emptyForm);
      setShowForm(false);
      loadTeachers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add teacher");
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async (id) => {
    if (!confirm("Deactivate this teacher?")) return;
    await api.delete(`/teachers/${id}`);
    loadTeachers();
  };

  const columns = [
    { key: "employeeId", label: "Employee ID" },
    { key: "name", label: "Name", render: (r) => r.user?.name },
    { key: "email", label: "Email", render: (r) => r.user?.email },
    { key: "subjects", label: "Subjects", render: (r) => (r.subjects || []).join(", ") },
    { key: "qualification", label: "Qualification" },
    {
      key: "actions", label: "", render: (r) => (
        <button onClick={() => handleDeactivate(r._id)} className="text-red-600 hover:underline text-xs">
          Deactivate
        </button>
      ),
    },
  ];

  return (
    <DashboardLayout title="Teachers">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">{teachers.length} active teachers</p>
        <button onClick={() => setShowForm((s) => !s)} className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
          {showForm ? "Cancel" : "+ Add Teacher"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" required placeholder="Full name" value={form.name} onChange={handleChange} className="input" />
          <input name="email" type="email" required placeholder="Email (used to log in)" value={form.email} onChange={handleChange} className="input" />
          <input name="password" type="password" required placeholder="Temporary password" value={form.password} onChange={handleChange} className="input" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="input" />
          <input name="employeeId" required placeholder="Employee ID" value={form.employeeId} onChange={handleChange} className="input" />
          <input name="qualification" placeholder="Qualification (e.g. B.Ed)" value={form.qualification} onChange={handleChange} className="input" />
          <input name="subjects" placeholder="Subjects (comma separated)" value={form.subjects} onChange={handleChange} className="input sm:col-span-2" />

          {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={saving} className="sm:col-span-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg">
            {saving ? "Saving..." : "Save Teacher"}
          </button>
        </form>
      )}

      <Table columns={columns} rows={teachers} emptyMessage="No teachers added yet." />
    </DashboardLayout>
  );
};

export default Teachers;
