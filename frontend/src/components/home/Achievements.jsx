import FadeIn from "./FadeIn.jsx";

const Achievements = ({ info }) => {
  if (!info.achievements?.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-xl mb-10">
          <p className="text-primary-700 text-sm font-semibold tracking-wide mb-2">ACHIEVEMENTS</p>
          <h2 className="font-serif text-3xl font-semibold text-gray-900">Moments we're proud of</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {info.achievements.map((a, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="flex gap-3 bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 transition-colors hover:bg-amber-50 hover:border-amber-200">
                <span className="text-amber-600 text-lg mt-0.5">★</span>
                <span className="text-sm text-gray-700">{a}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
