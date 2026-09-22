import { Link } from "react-router-dom";

// Fallback contact details — used if the database record doesn't have these
// filled in yet (e.g. an older SchoolInfo document from before these fields
// existed). Update here if the real number/email ever changes, or fill them
// in via Admin → School Profile to override these.
const FALLBACK_PHONE = "7389644236";
const FALLBACK_EMAIL = "bhikondetarun20@gmail.com";

const QUICK_LINKS = [
  { href: "#about", label: "About Us" },
  { href: "#academics", label: "Academics" },
  { href: "#facilities", label: "Facilities" },
  { href: "#news", label: "News & Events" },
];

const SOCIALS = [
  { label: "Facebook", icon: "f" },
  { label: "Twitter", icon: "𝕏" },
  { label: "Instagram", icon: "◎" },
  { label: "YouTube", icon: "▶" },
];

// Formats a 10-digit Indian mobile number for a wa.me link (needs country code, no symbols)
const waLink = (phone) => {
  const digits = (phone || "").replace(/\D/g, "");
  return `https://wa.me/91${digits}`;
};

const Footer = ({ info }) => {
  const phone = info.phone || FALLBACK_PHONE;
  const email = info.email || FALLBACK_EMAIL;

  return (
  <footer id="contact" className="bg-primary-900 text-primary-200">
    {/* Direct-contact banner — the actual "reach out to us" action strip */}
    <div className="border-b border-white/10 bg-primary-950/30">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <h3 className="font-serif text-2xl font-semibold text-white mb-2">Have a question? Reach out to us directly</h3>
          <p className="text-primary-300 text-sm mb-6 max-w-lg mx-auto">
            Students and parents can contact the school office anytime for admissions, queries, or support.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={waLink(phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:brightness-110 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-all hover:-translate-y-0.5"
            >
              <span className="text-lg">💬</span> Chat on WhatsApp
            </a>
            <a
              href={`tel:+91${phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 bg-white text-primary-900 font-semibold text-sm px-5 py-3 rounded-lg hover:bg-primary-50 transition-all hover:-translate-y-0.5"
            >
              <span className="text-lg">📞</span> Call {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold text-sm px-5 py-3 rounded-lg hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              <span className="text-lg">✉️</span> Email Us
            </a>
          </div>
        </div>
      </div>

    <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-md bg-white text-primary-900 flex items-center justify-center font-serif font-semibold text-base">
            {info.name?.charAt(0) || "S"}
          </div>
          <span className="font-serif font-semibold text-white">{info.name}</span>
        </div>
        <p className="text-sm text-primary-300 leading-relaxed">{info.tagline}</p>
        <div className="flex gap-3 mt-5">
          {SOCIALS.map((s) => (
            <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-sm hover:bg-white/10 hover:border-white/30 transition-colors">
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-white mb-4">Quick Links</p>
        <ul className="space-y-2.5">
          {QUICK_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} className="text-sm text-primary-300 hover:text-white transition-colors">{l.label}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-white mb-4">Important Pages</p>
        <ul className="space-y-2.5">
          <li><Link to="/login" className="text-sm text-primary-300 hover:text-white transition-colors">Staff &amp; Student Login</Link></li>
          <li><a href="#news" className="text-sm text-primary-300 hover:text-white transition-colors">Admissions</a></li>
          <li><a href="#contact" className="text-sm text-primary-300 hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-white mb-4">Contact</p>
        <ul className="space-y-2.5 text-sm text-primary-300">
          {info.address && <li className="flex gap-2"><span>📍</span><span>{info.address}</span></li>}
          <li className="flex gap-2">
            <span>📞</span>
            <a href={`tel:+91${phone.replace(/\D/g, "")}`} className="hover:text-white transition-colors">{phone}</a>
          </li>
          <li className="flex gap-2">
            <span>✉️</span>
            <a href={`mailto:${email}`} className="hover:text-white transition-colors break-all">{email}</a>
          </li>
          {info.udiseCode && <li className="flex gap-2"><span>🏛️</span><span>UDISE: {info.udiseCode}</span></li>}
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10">
      <p className="max-w-7xl mx-auto px-6 py-5 text-xs text-primary-400">
        © {new Date().getFullYear()} {info.name}. A government educational institution. All rights reserved.
      </p>
    </div>
  </footer>
  );
};

export default Footer;