import { useCountUp } from "../../hooks/useCountUp.js";

const StatItem = ({ value, suffix = "", label }) => {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="font-serif text-3xl sm:text-4xl font-bold text-primary-900">
        {animated}{suffix}
      </p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
};

const StatsCounter = ({ info }) => {
  const yearsRunning = new Date().getFullYear() - (info.establishedYear || new Date().getFullYear());

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <StatItem value={yearsRunning || 1} suffix="+" label="Years of Excellence" />
        <StatItem value={info.studentStrength || 0} suffix="+" label="Students" />
        <StatItem value={info.teacherStrength || 0} suffix="+" label="Faculty Members" />
        <StatItem value={95} suffix="%+" label="Academic Success" />
      </div>
    </section>
  );
};

export default StatsCounter;
