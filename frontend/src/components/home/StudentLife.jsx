import FadeIn from "./FadeIn.jsx";
import { studentLifeItems } from "../../constants/placeholderContent.js";

const StudentLife = () => (
  <section id="student-life" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <FadeIn className="max-w-xl mb-12">
        <p className="text-primary-700 text-sm font-semibold tracking-wide mb-2">STUDENT LIFE</p>
        <h2 className="font-serif text-3xl font-semibold text-gray-900">Beyond the classroom</h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {studentLifeItems.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.08}>
            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default StudentLife;
