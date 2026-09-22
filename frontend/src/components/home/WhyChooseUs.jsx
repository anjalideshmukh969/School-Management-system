import FadeIn from "./FadeIn.jsx";
import { whyChooseUs } from "../../constants/placeholderContent.js";

const WhyChooseUs = () => (
  <section className="bg-gray-50 py-20">
    <div className="max-w-7xl mx-auto px-6">
      <FadeIn className="max-w-xl mb-12">
        <p className="text-primary-700 text-sm font-semibold tracking-wide mb-2">WHY CHOOSE US</p>
        <h2 className="font-serif text-3xl font-semibold text-gray-900">A school built on trust and excellence</h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {whyChooseUs.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.08}>
            <div className="bg-white border border-gray-200 rounded-xl p-6 h-full transition-all duration-300 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-900/5 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-2xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1.5">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
