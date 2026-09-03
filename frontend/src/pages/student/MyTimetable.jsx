import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import api from "../../api/axios.js";

const MyTimetable = () => {
  const [profile, setProfile] = useState(null);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    api.get("/students/me").then(({ data }) => {
      setProfile(data);
      const classId = data.classRoom?._id;
      if (classId) api.get(`/timetable/class/${classId}`).then(({ data }) => setTimetable(data));
    });
  }, []);

  return (
    <DashboardLayout title="My Timetable">
      {timetable.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">No timetable published yet for your class.</p>
      ) : (
        <div className="space-y-4">
          {timetable.map((day) => (
            <div key={day._id} className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-3">{day.day}</h3>
              <div className="space-y-2">
                {day.periods.map((p, i) => (
                  <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2.5 text-sm">
                    <span className="font-medium text-gray-700">{p.subject}</span>
                    <span className="text-gray-500">{p.teacher?.user?.name}</span>
                    <span className="text-primary-700 font-medium">{p.startTime} - {p.endTime}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyTimetable;
