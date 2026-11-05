import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Content = ({ text, lang }) => (
  <motion.div
    className="first-page-content text-center"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1 className="first-page-title mb-2" variants={itemVariants}>
      {text.initials}
    </motion.h1>

    <motion.div className="heart-divider-line" variants={itemVariants}>
      <span className="hd-line" />
      <span className="hd-heart">♥</span>
      <span className="hd-line" />
    </motion.div>

    <motion.h2 className={`first-page-names mb-3 ${lang}`} variants={itemVariants}>
      {text.names}
    </motion.h2>

    <motion.h3 className={`first-page-subtitle mb-4 ${lang}`} variants={itemVariants}>
      {text.join}
    </motion.h3>

    <motion.div variants={itemVariants}>
      <Link to="/second" className={`btn btn-lg first-page-btn ${lang}`}>
        {text.button}
      </Link>
    </motion.div>
  </motion.div>
);

export default Content;
