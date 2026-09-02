import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import api from "../../api/axios.js";

const STATUS_OPTIONS = ["present", "absent", "late", "leave"];

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/teachers/me").then(({ data }) => setClasses(data.classesAssigned || []));
  }, []);

  useEffect(() => {
    if (!selectedClass) return;
    api.get(`/students?classRoom=${selectedClass}`).then(({ data }) => {
      setStudents(data);
      const initial = {};
      data.forEach((s) => { initial[s._id] = "present"; });
      setStatusMap(initial);
    });
  }, [selectedClass]);

  const handleStatusChange = (studentId, status) => {
    setStatusMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage("");
    try {
      const records = students.map((s) => ({ student: s._id, status: statusMap[s._id] || "present" }));
      await api.post("/attendance", { classRoom: selectedClass, date, records });
      setMessage("Attendance saved successfully.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Mark Attendance">
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Class</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="input w-56">
            <option value="">Select class</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>{c.name} - {c.section}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input w-44" />
        </div>
        {students.length > 0 && (
          <button onClick={handleSubmit} disabled={saving} className="bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg">
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        )}
      </div>

      {message && <p className="text-sm mb-4 text-primary-700 bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">{message}</p>}

      {students.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {students.map((s) => (
            <div key={s._id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">{s.user?.name}</p>
                <p className="text-xs text-gray-500">Roll No. {s.rollNumber || "-"}</p>
              </div>
              <div className="flex gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleStatusChange(s._id, opt)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize border ${
                      statusMap[s._id] === opt
                        ? "bg-primary-700 text-white border-primary-700"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        selectedClass && <p className="text-gray-500 text-sm">No students found in this class.</p>
      )}
    </DashboardLayout>
  );
};

export default Attendance;
