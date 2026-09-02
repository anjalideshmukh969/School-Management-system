import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import api from "../../api/axios.js";

const emptyForm = { title: "", content: "", audience: "all", isPinned: false };

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadNotices = () => api.get("/notices").then(({ data }) => setNotices(data));
  useEffect(() => { loadNotices(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/notices", form);
      setForm(emptyForm);
      setShowForm(false);
      loadNotices();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this notice?")) return;
    await api.delete(`/notices/${id}`);
    loadNotices();
  };

  return (
    <DashboardLayout title="Notices">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">{notices.length} notices</p>
        <button onClick={() => setShowForm((s) => !s)} className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
          {showForm ? "Cancel" : "+ New Notice"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 space-y-4">
          <input name="title" required placeholder="Title" value={form.title} onChange={handleChange} className="input" />
          <textarea name="content" required placeholder="Notice content" rows={4} value={form.content} onChange={handleChange} className="input" />
          <div className="flex items-center gap-4">
            <select name="audience" value={form.audience} onChange={handleChange} className="input w-48">
              <option value="all">Everyone</option>
              <option value="teacher">Teachers only</option>
              <option value="student">Students only</option>
              <option value="parent">Parents only</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" name="isPinned" checked={form.isPinned} onChange={handleChange} />
              Pin to top
            </label>
          </div>
          <button type="submit" disabled={saving} className="bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-lg">
            {saving ? "Posting..." : "Post Notice"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {notices.map((n) => (
          <div key={n._id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">
                  {n.isPinned && "📌 "}{n.title}
                  <span className="ml-2 text-xs font-normal text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">{n.audience}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">{n.content}</p>
                <p className="text-xs text-gray-400 mt-2">By {n.postedBy?.name} · {new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => handleDelete(n._id)} className="text-red-600 hover:underline text-xs shrink-0 ml-4">Delete</button>
            </div>
          </div>
        ))}
        {notices.length === 0 && <p className="text-gray-500 text-sm text-center py-8">No notices yet.</p>}
      </div>
    </DashboardLayout>
  );
};

export default Notices;
