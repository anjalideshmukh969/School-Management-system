import FadeIn from "./FadeIn.jsx";
import { newsEvents } from "../../constants/placeholderContent.js";

const NewsEvents = () => {
  const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-xl mb-12">
          <p className="text-primary-700 text-sm font-semibold tracking-wide mb-2">LATEST NEWS &amp; EVENTS</p>
          <h2 className="font-serif text-3xl font-semibold text-gray-900">What's happening at school</h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {newsEvents.map((n, i) => (
            <FadeIn key={n.title} delay={i * 0.1}>
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-full transition-all duration-300 hover:border-primary-300 hover:shadow-lg hover:-translate-y-1">
                <span className="inline-block text-xs font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full mb-4">{fmt(n.date)}</span>
                <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">{n.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{n.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
