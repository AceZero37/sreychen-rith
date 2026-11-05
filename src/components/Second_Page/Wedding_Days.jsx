import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "./Second_Page.css";

const TEXTS = {
  kh: {
    title: "សិរីមង្គលអាពាហ៍ពិពាហ៍",
    groomLabel: "កូនប្រុសបង",
    groomName: "សុវណ្ណ ណារិទ្ធ",
    brideLabel: "កូនស្រីបង",
    brideName: "ស៊ិន ស្រីចិន",
    dateLabel: "ថ្ងៃផ្តើមមង្គលការ",
    date: "២០ ឧសភា ២០៣១",
    location: "ភូមិតួលគគីរ ខេត្តបាត់ដំបង",
    viewMore: "មើលបន្ថែម",
  },
  en: {
    title: "The Wedding Day",
    groomLabel: "Groom's Name",
    groomName: "Sovan Narith",
    brideLabel: "Bride's Name",
    brideName: "Sin SreyChen",
    dateLabel: "Wedding Date Start at",
    date: "20 May 2031",
    location: "Tuol Koki Village, Battambang Province",
    viewMore: "View More",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const Wedding_Days = ({ lang = "kh" }) => {
  const t = TEXTS[lang] || TEXTS.kh;

  return (
    <div className="wedding-days-bg centered">
      <div className="wedding-days-overlay" />
      <motion.div
        className="wedding-days-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h2 className="wedding-days-title" variants={itemVariants}>
          {t.title}
        </motion.h2>

        <motion.div className="wedding-days-names" variants={itemVariants}>
          <motion.div
            className="wedding-days-person"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <p className="label">{t.groomLabel}</p>
            <p className="name">{t.groomName}</p>
          </motion.div>
          <motion.div
            className="wedding-days-and"
            animate={{ scale: [1, 1.18, 1], rotate: [0, -3, 3, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            &amp;
          </motion.div>
          <motion.div
            className="wedding-days-person"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <p className="label">{t.brideLabel}</p>
            <p className="name">{t.brideName}</p>
          </motion.div>
        </motion.div>

        <motion.div className="wedding-days-date" variants={itemVariants}>
          <p className="date-label">{t.dateLabel}</p>
          <p className="date">{t.date}</p>
          <p className="location">{t.location}</p>
        </motion.div>

        <motion.div
          className="wedding-days-viewmore"
          variants={itemVariants}
          onClick={() => {
            const el = document.getElementById("thiep-kar-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          title={lang === "kh" ? "ចុចដើម្បីមើលធៀបការ" : "Click to view wedding invitation"}
          role="button"
          tabIndex={0}
        >
          <span>{t.viewMore}</span>
          <div className="mouse-scroll" />
          <div className="mouse-scroll" />
          <div className="mouse-scroll" />
        </motion.div>
      </motion.div>
    </div>
  );
};

Wedding_Days.propTypes = {
  lang: PropTypes.oneOf(["en", "kh"]),
};

export default Wedding_Days;
