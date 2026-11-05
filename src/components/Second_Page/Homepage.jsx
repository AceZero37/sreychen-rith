import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Content from "./Content";
import FlagSelect from "../Common/FlagSelect";
import { useLanguage } from "../../context/LanguageContext";
import "./Second_Page.css";

const pageVariants = {
  initial: { opacity: 0, scale: 0.99 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const SecondHomepage = () => {
  const { lang } = useLanguage();

  return (
    <motion.div
      className="page-wrapper"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="second-page-wrapper position-relative">
        <div className="second-page-fixed-bg" aria-hidden="true" />
        <div className="second-page-fixed-overlay" aria-hidden="true" />

        <nav className="second-page-nav d-flex justify-content-between align-items-center w-100 p-3 p-md-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="second-page-back-btn"
              title={lang === "kh" ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>{lang === "kh" ? "ទំព័រដើម" : "Home"}</span>
            </Link>
          </motion.div>
          <FlagSelect className="second-page-flag-select" />
        </nav>

        <Content lang={lang} />
      </div>
    </motion.div>
  );
};

export default SecondHomepage;
