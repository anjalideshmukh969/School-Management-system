import FadeIn from "./FadeIn.jsx";
import { academicPrograms } from "../../constants/placeholderContent.js";

const AcademicPrograms = () => (
  <section id="academics" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <FadeIn className="max-w-xl mb-12">
        <p className="text-primary-700 text-sm font-semibold tracking-wide mb-2">ACADEMIC PROGRAMS</p>
        <h2 className="font-serif text-3xl font-semibold text-gray-900">A clear path from first steps to graduation</h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {academicPrograms.map((p, i) => (
          <FadeIn key={p.level} delay={i * 0.08}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/5 hover:-translate-y-1">
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-serif text-lg font-semibold text-gray-900">{p.level}</h3>
              <p className="text-xs font-medium text-primary-700 mb-3">{p.grades}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default AcademicPrograms;
