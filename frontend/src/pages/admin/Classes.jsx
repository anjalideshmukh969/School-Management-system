import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import api from "../../api/axios.js";

const emptyForm = { name: "", section: "", subjects: "", classTeacher: "" };

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [reassigning, setReassigning] = useState({}); // { [classId]: teacherId } — pending dropdown selections

  const loadData = async () => {
    const [classesRes, teachersRes] = await Promise.all([api.get("/classes"), api.get("/teachers")]);
    setClasses(classesRes.data);
    setTeachers(teachersRes.data);
  };
  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      await api.post("/classes", {
        ...form,
        subjects: form.subjects.split(",").map((s) => s.trim()).filter(Boolean),
        classTeacher: form.classTeacher || undefined,
      });
      setForm(emptyForm); setShowForm(false); loadData();
    } catch (err) { setError(err.response?.data?.message || "Failed to add class"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => { if (!confirm("Delete this class? This cannot be undone.")) return; await api.delete(`/classes/${id}`); loadData(); };

  const handleReassign = async (classId) => {
    const teacherId = reassigning[classId];
    if (!teacherId) return;
    await api.put(`/classes/${classId}`, { classTeacher: teacherId });
    setReassigning({ ...reassigning, [classId]: "" });
    loadData();
  };

  return (
    <DashboardLayout title="Classes">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">{classes.length} classes</p>
        <button onClick={() => setShowForm((s) => !s)} className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded-lg">{showForm ? "Cancel" : "+ Add Class"}</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" required placeholder="Class name (e.g. Class 8)" value={form.name} onChange={handleChange} className="input" />
          <input name="section" required placeholder="Section (e.g. A)" value={form.section} onChange={handleChange} className="input" />
          <select name="classTeacher" value={form.classTeacher} onChange={handleChange} className="input sm:col-span-2">
            <option value="">Class Teacher (optional — can assign later)</option>
            {teachers.map((t) => <option key={t._id} value={t._id}>{t.user?.name}</option>)}
          </select>
          <input name="subjects" placeholder="Subjects (comma separated)" value={form.subjects} onChange={handleChange} className="input sm:col-span-2" />
          {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={saving} className="sm:col-span-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg">{saving ? "Saving..." : "Save Class"}</button>
        </form>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Class</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Section</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Academic Year</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Class Teacher</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Subjects</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {classes.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{c.name}</td>
                <td className="px-4 py-3 text-gray-700">{c.section}</td>
                <td className="px-4 py-3 text-gray-700">{c.academicYear}</td>
                <td className="px-4 py-3 text-gray-700">
                  {c.classTeacher?.user?.name ? (
                    <span>{c.classTeacher.user.name}</span>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <select
                        value={reassigning[c._id] || ""}
                        onChange={(e) => setReassigning({ ...reassigning, [c._id]: e.target.value })}
                        className="input py-1 text-xs w-40"
                      >
                        <option value="">Not assigned</option>
                        {teachers.map((t) => <option key={t._id} value={t._id}>{t.user?.name}</option>)}
                      </select>
                      {reassigning[c._id] && (
                        <button onClick={() => handleReassign(c._id)} className="text-primary-700 text-xs font-medium hover:underline">Assign</button>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">{(c.subjects || []).join(", ")}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:underline text-xs">Delete</button>
                </td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500 text-sm">No classes created yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};
export default Classes;
