/**
 * SCHOOL CONTENT — real photos from PM SHRI School Paradsinga live in
 * /public/images and are referenced below with absolute paths (e.g.
 * "/images/hero-school-gate.jpg"), which Vite serves as static files.
 *
 * A few slots still don't have a real photo yet (marked "STILL PLACEHOLDER"
 * below) — those fall back to Lorem Picsum, a free placeholder-image
 * service meant for exactly this (mockups/dev), not for production.
 * Swap them for real photos the same way: drop the file in
 * frontend/public/images/ and update the path here.
 *
 * Text content (academic programs, news, testimonials) is realistic
 * placeholder copy, editable directly in these component files.
 */

export const placeholderHero = "/images/hero-school-gate.jpg";

export const aboutCampusImage = "/images/about-campus.jpg";

export const facilityImages = {
  "Smart Classrooms": "/images/facility-smart-classroom.jpg",
  "Science Labs": "/images/facility-science-lab.jpg",
  "Computer Lab": "/images/facility-computer-lab.jpg",
  Auditorium: "/images/facility-auditorium.jpg", // shown here is the seminar/assembly room — swap if you have a dedicated auditorium photo
  Library: "/images/facility-library.jpg",
  "Sports Ground": "/images/facility-sports-ground.jpg",
};

export const defaultFacilities = Object.keys(facilityImages); // used when admin hasn't set facilities yet

export const studentLifeItems = [
  { title: "Sports", image: "/images/studentlife-sports.jpg", description: "Annual athletics meet, inter-house relay races, and daily physical education." },
  { title: "Cultural Events", image: "/images/studentlife-cultural.jpg", description: "Independence Day flag hoisting, Teacher's Day celebrations, and annual functions." },
  { title: "Competitions", image: "/images/studentlife-competitions.jpg", description: "World Youth Skills Day project exhibitions, science fairs, and inter-school contests." },
  { title: "Clubs & Societies", image: "/images/studentlife-clubs.jpg", description: "Junior Red Cross / NCC unit — discipline, service, and community engagement." },
];

export const academicPrograms = [
  { level: "Primary", grades: "Classes I – V", icon: "🖍️", description: "Building strong foundations in literacy, numeracy, and curiosity through activity-based learning." },
  { level: "Middle School", grades: "Classes VI – VIII", icon: "📘", description: "Broadening subject exposure with a focus on conceptual understanding and life skills." },
  { level: "Secondary", grades: "Classes IX – X", icon: "🔬", description: "Board-aligned rigorous academics preparing students for their first public examination." },
  { level: "Senior Secondary", grades: "Classes XI – XII", icon: "🎓", description: "Stream specialization (Science, Commerce, Humanities) with career and college guidance." },
];

export const whyChooseUs = [
  { icon: "🧑‍🏫", title: "Experienced Faculty", description: "Qualified, trained teachers dedicated to every student's growth." },
  { icon: "🏛️", title: "Modern Infrastructure", description: "Smart classrooms, labs, and facilities built for 21st-century learning." },
  { icon: "📈", title: "Academic Excellence", description: "Consistently strong board results and a culture of high expectations." },
  { icon: "🤝", title: "Values & Character", description: "Education that shapes responsible, confident citizens, not just exam-takers." },
];

export const newsEvents = [
  { date: "2026-09-25", title: "Annual Sports Day", description: "Inter-house athletics competitions on the main sports ground. Parents welcome." },
  { date: "2026-10-05", title: "Parent-Teacher Meeting", description: "Term 1 progress discussion for all classes. Please check your ward's time slot." },
  { date: "2026-10-18", title: "Science Exhibition", description: "Student projects on display, open to the public in the main auditorium." },
]; // STILL PLACEHOLDER — replace with real upcoming dates once ready to publish

export const testimonials = [
  { name: "Anita Sharma", role: "Parent, Class 6", quote: "The teachers genuinely know each child. My daughter looks forward to school every single day." },
  { name: "Ravi Kumar", role: "Parent, Class 10", quote: "Strong academics without losing sight of values — exactly what we wanted for our son." },
  { name: "Priya Nair", role: "Alumna, Class of 2023", quote: "The foundation I got here carried me through college. I'm grateful for the teachers who pushed me." },
]; // STILL PLACEHOLDER — replace with real testimonials once collected
