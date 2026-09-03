import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";

const FACILITY_ICONS = {
  library: "📚", lab: "🔬", computer: "💻", sports: "⚽", playground: "⚽",
  ground: "⚽", science: "🔬", art: "🎨", music: "🎵", hall: "🏛️",
  canteen: "🍽️", transport: "🚌", bus: "🚌", medical: "🩺", garden: "🌳",
  smart: "📺", "smart class": "📺", auditorium: "🏛️", default: "✓",
};

const iconFor = (name) => {
  const key = Object.keys(FACILITY_ICONS).find((k) => name.toLowerCase().includes(k));
  return FACILITY_ICONS[key] || FACILITY_ICONS.default;
};

const Home = () => {
  const { user } = useAuth();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get("/school-info").then(({ data }) => setInfo(data)).catch(() => setInfo(null));
  }, []);

  const roleHome = { admin: "/admin", teacher: "/teacher", student: "/student", parent: "/student" };

  if (!info) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top bar */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-primary-900 text-white flex items-center justify-center font-serif font-semibold text-base">
              {info.name?.charAt(0) || "S"}
            </div>
            <span className="font-serif font-semibold text-gray-900">{info.name}</span>
          </div>
          {user ? (
            <Link to={roleHome[user.role] || "/login"} className="text-sm font-medium text-primary-700 hover:text-primary-800">
              Go to dashboard
            </Link>
          ) : (
            <Link to="/login" className="text-sm font-medium bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-md transition-colors">
              Staff &amp; Student Login
            </Link>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-primary-900 text-white overflow-hidden">
        {info.heroImageUrl ? (
          <div className="absolute inset-0">
            <img src={info.heroImageUrl} alt={info.name} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/95 to-primary-900/70" />
          </div>
        ) : (
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 26px)",
            }}
          />
        )}

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="text-primary-200 text-sm font-medium mb-4">
            Established {info.establishedYear} · {info.affiliation}
            {info.udiseCode && ` · UDISE ${info.udiseCode}`}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight max-w-2xl">
            {info.name}
          </h1>
          <p className="text-primary-100 text-lg mt-4 max-w-xl leading-relaxed">
            {info.tagline}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/login" className="bg-white text-primary-900 font-medium px-6 py-3 rounded-md hover:bg-primary-50 transition-colors">
              Login to Portal
            </Link>
            <a href="#about" className="border border-white/30 text-white font-medium px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: "Students", value: info.studentStrength || "—" },
            { label: "Teachers", value: info.teacherStrength || "—" },
            { label: "Established", value: info.establishedYear },
            { label: "Board", value: info.affiliation },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-primary-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About + Principal's message */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">About the School</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl">{info.about}</p>

          {info.facilities?.length > 0 && (
            <div className="mt-10">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">Facilities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {info.facilities.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 border border-gray-200 rounded-lg px-3 py-2.5">
                    <span className="text-lg leading-none">{iconFor(f)}</span>
                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {info.principalMessage && (
          <div className="bg-gray-50 border-l-2 border-primary-700 rounded-r-lg p-6 h-fit">
            <p className="text-gray-700 leading-relaxed italic">"{info.principalMessage}"</p>
            {info.principalName && (
              <p className="text-sm font-medium text-gray-900 mt-4">— {info.principalName}, Principal</p>
            )}
          </div>
        )}
      </section>

      {/* Achievements */}
      {info.achievements?.length > 0 && (
        <section className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {info.achievements.map((a, i) => (
                <div key={i} className="flex gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <span className="text-amber-600 mt-0.5">★</span>
                  <span className="text-sm text-gray-700">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {info.galleryImages?.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">Campus Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {info.galleryImages.map((url, i) => (
              <img key={i} src={url} alt="" className="w-full h-32 sm:h-40 object-cover rounded-lg border border-gray-200" />
            ))}
          </div>
        </section>
      )}

      {/* Contact + footer */}
      <footer className="bg-primary-900 text-primary-100">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-white font-semibold mb-2">{info.name}</p>
            <p className="text-sm text-primary-300">{info.tagline}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white mb-2">Contact</p>
            <p className="text-sm text-primary-300">{info.address}</p>
            <p className="text-sm text-primary-300 mt-1">{info.phone}</p>
            <p className="text-sm text-primary-300">{info.email}</p>
          </div>
          <div className="sm:text-right">
            <Link to="/login" className="text-sm font-medium text-white border border-white/30 px-5 py-2.5 rounded-md hover:bg-white/10 transition-colors inline-block">
              Staff &amp; Student Login
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="max-w-6xl mx-auto px-6 py-4 text-xs text-primary-400">
            © {new Date().getFullYear()} {info.name}. A government educational institution.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
