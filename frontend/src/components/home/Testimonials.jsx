import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeIn from "./FadeIn.jsx";
import { testimonials } from "../../constants/placeholderContent.js";

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[index];
  const initials = current.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=eff6ff&color=1e3a8a&size=120&bold=true`;

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeIn className="mb-12">
          <p className="text-primary-700 text-sm font-semibold tracking-wide mb-2">TESTIMONIALS</p>
          <h2 className="font-serif text-3xl font-semibold text-gray-900">What our community says</h2>
        </FadeIn>

        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10"
            >
              <img src={avatarUrl} alt={current.name} className="w-14 h-14 rounded-full mx-auto mb-5" />
              <p className="font-serif text-xl text-gray-800 leading-relaxed italic mb-5">"{current.quote}"</p>
              <p className="font-semibold text-gray-900">{current.name}</p>
              <p className="text-sm text-gray-500">{current.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-primary-700" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
