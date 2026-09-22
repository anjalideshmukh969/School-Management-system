import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Table from "../../components/Table.jsx";
import api from "../../api/axios.js";
const GRADE_COLORS = { "A+": "text-green-700 bg-green-50", A: "text-green-700 bg-green-50", B: "text-primary-700 bg-primary-50", C: "text-amber-700 bg-amber-50", D: "text-amber-700 bg-amber-50", F: "text-red-700 bg-red-50" };
const MyResults = () => {
  const [results, setResults] = useState([]);
  useEffect(() => { api.get("/exams/results/me").then(({ data }) => setResults(data)); }, []);
  const columns = [
    { key: "exam", label: "Exam", render: (r) => r.exam?.title }, { key: "subject", label: "Subject", render: (r) => r.exam?.subject },
    { key: "marks", label: "Marks", render: (r) => `${r.marksObtained} / ${r.exam?.maxMarks}` },
    { key: "grade", label: "Grade", render: (r) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${GRADE_COLORS[r.grade] || ""}`}>{r.grade}</span> },
    { key: "date", label: "Exam Date", render: (r) => r.exam?.examDate ? new Date(r.exam.examDate).toLocaleDateString() : "-" },
  ];
  return <DashboardLayout title="My Results"><Table columns={columns} rows={results} emptyMessage="No results published yet." /></DashboardLayout>;
};
export default MyResults;
