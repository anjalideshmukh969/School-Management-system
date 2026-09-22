import FadeIn from "./FadeIn.jsx";
import { aboutCampusImage } from "../../constants/placeholderContent.js";

const AboutSection = ({ info }) => (
  <section id="about" className="py-20 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <FadeIn>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl shadow-gray-200">
            <img src={aboutCampusImage} alt="About our school" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-primary-900 text-white rounded-xl px-6 py-4 shadow-xl hidden sm:block">
            <p className="font-serif text-2xl font-bold">{info.establishedYear}</p>
            <p className="text-xs text-primary-200">Established</p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <p className="text-primary-700 text-sm font-semibold tracking-wide mb-2">ABOUT OUR SCHOOL</p>
        <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-5">Nurturing minds, building futures</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{info.about}</p>
        <a href="#academics" className="group inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800">
          Learn more about our programs
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </FadeIn>
    </div>
  </section>
);

export default AboutSection;
