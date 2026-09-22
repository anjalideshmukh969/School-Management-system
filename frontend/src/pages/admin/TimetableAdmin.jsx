import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import api from "../../api/axios.js";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const emptyPeriod = { subject: "", teacher: "", startTime: "", endTime: "" };
const TimetableAdmin = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [periods, setPeriods] = useState([{ ...emptyPeriod }]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => { api.get("/classes").then(({ data }) => setClasses(data)); api.get("/teachers").then(({ data }) => setTeachers(data)); }, []);
  const addPeriod = () => setPeriods([...periods, { ...emptyPeriod }]);
  const removePeriod = (i) => setPeriods(periods.filter((_, idx) => idx !== i));
  const updatePeriod = (i, field, value) => { const updated = [...periods]; updated[i][field] = value; setPeriods(updated); };
  const handleSave = async () => {
    setSaving(true); setMessage("");
    try { await api.post("/timetable", { classRoom: selectedClass, day: selectedDay, periods }); setMessage(`Timetable saved for ${selectedDay}.`); }
    catch (err) { setMessage(err.response?.data?.message || "Failed to save timetable"); }
    finally { setSaving(false); }
  };
  return (
    <DashboardLayout title="Timetable">
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex flex-wrap gap-4 items-end">
        <div><label className="block text-xs font-medium text-gray-500 mb-1">Class</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="input w-56">
            <option value="">Select class</option>{classes.map((c) => <option key={c._id} value={c._id}>{c.name} - {c.section}</option>)}
          </select>
        </div>
        <div><label className="block text-xs font-medium text-gray-500 mb-1">Day</label>
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="input w-40">{DAYS.map((d) => <option key={d} value={d}>{d}</option>)}</select>
        </div>
      </div>
      {selectedClass && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="space-y-3 mb-4">
            {periods.map((p, i) => (
              <div key={i} className="flex flex-wrap gap-2 items-center bg-gray-50 rounded-lg p-3">
                <input placeholder="Subject" value={p.subject} onChange={(e) => updatePeriod(i, "subject", e.target.value)} className="input w-40" />
                <select value={p.teacher} onChange={(e) => updatePeriod(i, "teacher", e.target.value)} className="input w-44">
                  <option value="">Teacher</option>{teachers.map((t) => <option key={t._id} value={t._id}>{t.user?.name}</option>)}
                </select>
                <input type="time" value={p.startTime} onChange={(e) => updatePeriod(i, "startTime", e.target.value)} className="input w-32" />
                <span className="text-gray-400 text-sm">to</span>
                <input type="time" value={p.endTime} onChange={(e) => updatePeriod(i, "endTime", e.target.value)} className="input w-32" />
                <button onClick={() => removePeriod(i)} className="text-red-600 text-xs hover:underline ml-auto">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={addPeriod} className="text-primary-700 text-sm font-medium hover:underline">+ Add Period</button>
            <button onClick={handleSave} disabled={saving} className="ml-auto bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white text-sm font-medium px-5 py-2 rounded-lg">{saving ? "Saving..." : "Save Timetable"}</button>
          </div>
          {message && <p className="text-sm mt-3 text-primary-700">{message}</p>}
        </div>
      )}
    </DashboardLayout>
  );
};
export default TimetableAdmin;
