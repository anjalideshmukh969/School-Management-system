import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Table from "../../components/Table.jsx";
import api from "../../api/axios.js";

const emptyForm = { name: "", section: "", subjects: "" };

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadClasses = () => api.get("/classes").then(({ data }) => setClasses(data));
  useEffect(() => { loadClasses(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/classes", {
        ...form,
        subjects: form.subjects.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setForm(emptyForm);
      setShowForm(false);
      loadClasses();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add class");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this class? This cannot be undone.")) return;
    await api.delete(`/classes/${id}`);
    loadClasses();
  };

  const columns = [
    { key: "name", label: "Class" },
    { key: "section", label: "Section" },
    { key: "academicYear", label: "Academic Year" },
    { key: "classTeacher", label: "Class Teacher", render: (r) => r.classTeacher?.user?.name || "Not assigned" },
    { key: "subjects", label: "Subjects", render: (r) => (r.subjects || []).join(", ") },
    {
      key: "actions", label: "", render: (r) => (
        <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:underline text-xs">Delete</button>
      ),
    },
  ];

  return (
    <DashboardLayout title="Classes">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">{classes.length} classes</p>
        <button onClick={() => setShowForm((s) => !s)} className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
          {showForm ? "Cancel" : "+ Add Class"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" required placeholder="Class name (e.g. Class 8)" value={form.name} onChange={handleChange} className="input" />
          <input name="section" required placeholder="Section (e.g. A)" value={form.section} onChange={handleChange} className="input" />
          <input name="subjects" placeholder="Subjects (comma separated)" value={form.subjects} onChange={handleChange} className="input sm:col-span-2" />
          {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={saving} className="sm:col-span-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg">
            {saving ? "Saving..." : "Save Class"}
          </button>
        </form>
      )}

      <Table columns={columns} rows={classes} emptyMessage="No classes created yet." />
    </DashboardLayout>
  );
};

export default Classes;
