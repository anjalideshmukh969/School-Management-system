import FadeIn from "./FadeIn.jsx";
import { facilityImages, defaultFacilities } from "../../constants/placeholderContent.js";

const FALLBACK_IMG = "https://picsum.photos/seed/genericfacility2026/500/380";

const Facilities = ({ info }) => {
  const facilities = info.facilities?.length ? info.facilities : defaultFacilities;

  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-xl mb-12">
          <p className="text-primary-700 text-sm font-semibold tracking-wide mb-2">CAMPUS &amp; FACILITIES</p>
          <h2 className="font-serif text-3xl font-semibold text-gray-900">Spaces built for real learning</h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((name, i) => {
            const img = facilityImages[name] || FALLBACK_IMG;
            return (
              <FadeIn key={name} delay={i * 0.06}>
                <div className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md">
                  <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <p className="absolute bottom-4 left-5 text-white font-semibold text-lg">{name}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
