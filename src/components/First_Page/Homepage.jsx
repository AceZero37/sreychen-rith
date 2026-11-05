import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import "./First_Page.css";
import { useLanguage } from "../../context/LanguageContext";

const text = {
  kh: {
    initials: "R&R",
    names: "សុវណ្ណ ណារិទ្ធ & ស៊ិន ស្រីចិន",
    join: "សូមចូលរួមពិធីមង្គលការរបស់ពួកយើង",
    button: "មើលបន្ថែម",
    thank: "សូមអរគុណដែលបានចូលរួមថ្ងៃពិសេសរបស់យើង",
  },
  en: {
    initials: "R&R",
    names: "Sovan Narith & Sin SreyChen",
    join: "Please Join Our Wedding",
    button: "View More",
    thank: "Thank you for joining us on our special day",
  },
};

const GoldenParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <div className="golden-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="g-particle"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

const pageVariants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: "easeIn" } },
};

const Homepage = () => {
  const { lang } = useLanguage();

  return (
    <motion.div
      className="page-wrapper"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="first-page-bg d-flex flex-column justify-content-center align-items-center position-relative">
        <div className="first-page-overlay" />
        <GoldenParticles />
        <Header />
        <Content text={text[lang] || text.kh} lang={lang} />
        <Footer text={text[lang] || text.kh} />
      </div>
    </motion.div>
  );
};

export default Homepage;
