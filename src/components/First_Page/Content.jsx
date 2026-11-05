import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const Content = ({ text, lang }) => (
  <motion.div
    className="first-page-content text-center"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1
      className="first-page-title mb-2"
      variants={itemVariants}
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      {text.initials}
    </motion.h1>

    <motion.div className="heart-divider-line" variants={itemVariants}>
      <span className="hd-line" />
      <motion.span
        className="hd-heart"
        animate={{ scale: [1, 1.25, 1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        ♥
      </motion.span>
      <span className="hd-line" />
    </motion.div>

    <motion.h2
      key={text.names}
      className={`first-page-names mb-3 ${lang}`}
      variants={itemVariants}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text.names}
    </motion.h2>

    <motion.h3
      key={text.join}
      className={`first-page-subtitle mb-4 ${lang}`}
      variants={itemVariants}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {text.join}
    </motion.h3>

    <motion.div variants={itemVariants}>
      <motion.div
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{ display: "inline-block" }}
      >
        <Link to="/second" className={`btn btn-lg first-page-btn ${lang}`}>
          <span>{text.button}</span>
          <span style={{ marginLeft: "8px", display: "inline-block" }}>✨</span>
        </Link>
      </motion.div>
    </motion.div>
  </motion.div>
);

export default Content;
