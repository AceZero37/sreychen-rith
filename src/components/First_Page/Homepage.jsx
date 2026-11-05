import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import GoldenParticles from "./GoldenParticles";
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

const pageVariants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
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
