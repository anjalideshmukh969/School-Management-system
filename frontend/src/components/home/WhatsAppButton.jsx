import { motion } from "framer-motion";

const FALLBACK_PHONE = "7389644236";

// Formats a 10-digit Indian mobile number for a wa.me link
const waLink = (phone) => `https://wa.me/91${(phone || "").replace(/\D/g, "")}`;

/**
 * Fixed floating WhatsApp button, visible while scrolling the homepage.
 * Always renders using the real school number, falling back to the known
 * number if the database record doesn't have one saved yet.
 */
const WhatsAppButton = ({ phone }) => {
  const number = phone || FALLBACK_PHONE;

  return (
    <motion.a
      href={waLink(number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/20 flex items-center justify-center text-2xl"
    >
      💬
    </motion.a>
  );
};

export default WhatsAppButton;