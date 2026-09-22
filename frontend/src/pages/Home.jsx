import { useEffect, useState } from "react";
import api from "../api/axios.js";

import Navbar from "../components/home/Navbar.jsx";
import Hero from "../components/home/Hero.jsx";
import StatsCounter from "../components/home/StatsCounter.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import AboutSection from "../components/home/AboutSection.jsx";
import PrincipalMessage from "../components/home/PrincipalMessage.jsx";
import AcademicPrograms from "../components/home/AcademicPrograms.jsx";
import Facilities from "../components/home/Facilities.jsx";
import StudentLife from "../components/home/StudentLife.jsx";
import Achievements from "../components/home/Achievements.jsx";
import NewsEvents from "../components/home/NewsEvents.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import CTASection from "../components/home/CTASection.jsx";
import Footer from "../components/home/Footer.jsx";
import WhatsAppButton from "../components/home/WhatsAppButton.jsx";

const Home = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get("/school-info").then(({ data }) => setInfo(data)).catch(() => setInfo(null));
  }, []);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-900">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white font-sans">
      <Navbar schoolName={info.name} />
      <Hero info={info} />
      <StatsCounter info={info} />
      <WhyChooseUs />
      <AboutSection info={info} />
      <PrincipalMessage info={info} />
      <AcademicPrograms />
      <Facilities info={info} />
      <StudentLife />
      <Achievements info={info} />
      <NewsEvents />
      <Testimonials />
      <CTASection />
      <Footer info={info} />
      <WhatsAppButton phone={info.phone} />
    </div>
  );
};

export default Home;
