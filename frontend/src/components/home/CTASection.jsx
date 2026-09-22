import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn.jsx";

const CTASection = () => (
  <section className="relative bg-primary-900 py-20 overflow-hidden">
    <motion.div
      className="absolute -top-16 left-1/4 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="relative max-w-4xl mx-auto px-6 text-center">
      <FadeIn>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-4">Ready to be part of our school?</h2>
        <p className="text-primary-200 max-w-xl mx-auto mb-9">
          Admissions are open. Come see our campus, meet our faculty, and find out why families choose us year after year.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#contact" className="bg-white text-primary-900 font-semibold px-7 py-3.5 rounded-lg hover:bg-primary-50 transition-all hover:-translate-y-0.5 hover:shadow-lg">
            Apply for Admission
          </a>
          <a href="#contact" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg">
            Visit Our Campus
          </a>
          <Link to="/login" className="border border-white/25 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-all hover:-translate-y-0.5">
            Staff &amp; Student Login
          </Link>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default CTASection;
