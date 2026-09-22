import FadeIn from "./FadeIn.jsx";
import { placeholderGallery } from "../../constants/placeholderContent.js";

// Varying row-spans give a masonry feel without a JS layout library
const SPAN_PATTERN = ["row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1"];

const Gallery = ({ info }) => {
  const images = info.galleryImages?.length ? info.galleryImages : placeholderGallery;

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-xl mb-12">
          <p className="text-primary-700 text-sm font-semibold tracking-wide mb-2">CAMPUS GALLERY</p>
          <h2 className="font-serif text-3xl font-semibold text-gray-900">A glimpse into everyday school life</h2>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 auto-rows-[140px] sm:auto-rows-[160px]">
          {images.slice(0, 8).map((url, i) => (
            <FadeIn key={i} delay={i * 0.05} className={SPAN_PATTERN[i % SPAN_PATTERN.length]}>
              <div className="group relative w-full h-full rounded-xl overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors duration-300" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
