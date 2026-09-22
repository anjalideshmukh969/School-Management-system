import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import api from "../../api/axios.js";
const emptyExamForm = { title: "", classRoom: "", subject: "", maxMarks: 100, passingMarks: 33, examDate: "" };
const Marks = () => {
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [showExamForm, setShowExamForm] = useState(false);
  const [examForm, setExamForm] = useState(emptyExamForm);
  const [selectedExam, setSelectedExam] = useState("");
  const [students, setStudents] = useState([]);
  const [marksMap, setMarksMap] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => { api.get("/classes").then(({ data }) => setClasses(data)); api.get("/exams").then(({ data }) => setExams(data)); }, []);
  const handleExamChange = (e) => setExamForm({ ...examForm, [e.target.name]: e.target.value });
  const handleCreateExam = async (e) => { e.preventDefault(); const { data } = await api.post("/exams", examForm); setExams((prev) => [data, ...prev]); setExamForm(emptyExamForm); setShowExamForm(false); };
  useEffect(() => {
    if (!selectedExam) return;
    const exam = exams.find((ex) => ex._id === selectedExam); if (!exam) return;
    api.get(`/students?classRoom=${exam.classRoom?._id || exam.classRoom}`).then(({ data }) => { setStudents(data); const initial = {}; data.forEach((s) => { initial[s._id] = ""; }); setMarksMap(initial); });
  }, [selectedExam, exams]);
  const handleMarkChange = (studentId, value) => setMarksMap((prev) => ({ ...prev, [studentId]: value }));
  const handleSubmitMarks = async () => {
    setSaving(true); setMessage("");
    try { const results = students.filter((s) => marksMap[s._id] !== "").map((s) => ({ student: s._id, marksObtained: Number(marksMap[s._id]) })); await api.post(`/exams/${selectedExam}/results`, { results }); setMessage("Marks saved successfully."); }
    catch (err) { setMessage(err.response?.data?.message || "Failed to save marks"); }
    finally { setSaving(false); }
  };
  return (
    <DashboardLayout title="Marks Entry">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm">Create an exam, then enter marks for each student.</p>
        <button onClick={() => setShowExamForm((s) => !s)} className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded-lg">{showExamForm ? "Cancel" : "+ New Exam"}</button>
      </div>
      {showExamForm && (
        <form onSubmit={handleCreateExam} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input name="title" required placeholder="Exam title" value={examForm.title} onChange={handleExamChange} className="input sm:col-span-2" />
          <select name="classRoom" required value={examForm.classRoom} onChange={handleExamChange} className="input"><option value="">Class</option>{classes.map((c) => <option key={c._id} value={c._id}>{c.name} - {c.section}</option>)}</select>
          <input name="subject" required placeholder="Subject" value={examForm.subject} onChange={handleExamChange} className="input" />
          <input name="maxMarks" type="number" placeholder="Max marks" value={examForm.maxMarks} onChange={handleExamChange} className="input" />
          <input name="passingMarks" type="number" placeholder="Passing marks" value={examForm.passingMarks} onChange={handleExamChange} className="input" />
          <input name="examDate" type="date" required value={examForm.examDate} onChange={handleExamChange} className="input" />
          <button type="submit" className="sm:col-span-3 bg-primary-700 hover:bg-primary-800 text-white font-medium py-2.5 rounded-lg">Create Exam</button>
        </form>
      )}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex flex-wrap items-end gap-4">
        <div><label className="block text-xs font-medium text-gray-500 mb-1">Exam</label>
          <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} className="input w-72"><option value="">Select exam</option>{exams.map((ex) => <option key={ex._id} value={ex._id}>{ex.title} · {ex.subject} ({ex.classRoom?.name} {ex.classRoom?.section})</option>)}</select>
        </div>
        {students.length > 0 && <button onClick={handleSubmitMarks} disabled={saving} className="bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg">{saving ? "Saving..." : "Save Marks"}</button>}
      </div>
      {message && <p className="text-sm mb-4 text-primary-700 bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">{message}</p>}
      {students.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {students.map((s) => (
            <div key={s._id} className="flex items-center justify-between px-5 py-3">
              <div><p className="text-sm font-medium text-gray-800">{s.user?.name}</p><p className="text-xs text-gray-500">Roll No. {s.rollNumber || "-"}</p></div>
              <input type="number" min="0" placeholder="Marks" value={marksMap[s._id] ?? ""} onChange={(e) => handleMarkChange(s._id, e.target.value)} className="input w-28 text-center" />
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};
export default Marks;
