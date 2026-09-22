import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { placeholderHero, aboutCampusImage } from "../../constants/placeholderContent.js";

const Hero = ({ info }) => {
  const heroImg = info.heroImageUrl || placeholderHero;
  // Small floating accent photos beside the main hero image
  const collage = [aboutCampusImage, "/images/studentlife-competitions.jpg"];

  return (
    <section className="relative bg-primary-900 overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Decorative floating shapes — subtle, not childish */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-primary-400/10 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 28px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left: copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-primary-200 text-sm font-medium mb-5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Established {info.establishedYear} · {info.affiliation}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] text-white"
          >
            {info.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-primary-100 text-lg mt-5 max-w-lg leading-relaxed"
          >
            {info.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-9"
          >
            <a href="#about" className="group bg-white text-primary-900 font-semibold px-6 py-3.5 rounded-lg hover:bg-primary-50 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10">
              Explore Our School
              <span className="inline-block ml-1.5 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10">
              Admissions
            </a>
            <a href="#contact" className="border border-white/25 text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-white/10 transition-all hover:-translate-y-0.5">
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* Right: image collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 aspect-[4/5]">
            <img src={heroImg} alt={info.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />
          </div>

          {collage[0] && (
            <motion.div
              className="absolute -left-10 -bottom-8 w-44 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-white"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={collage[0]} alt="" className="w-full h-full object-cover" />
            </motion.div>
          )}
          {collage[1] && (
            <motion.div
              className="absolute -right-8 top-10 w-36 h-28 rounded-xl overflow-hidden shadow-xl border-4 border-white"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <img src={collage[1]} alt="" className="w-full h-full object-cover" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
