import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeddingCalendar from "./WeddingCalendar";
import "./FlipCountdown.css";

const WEDDING_DATE = new Date("2031-05-20T07:00:00");

// Individual Flip Unit with split-flap card styling and 3D flip animation
const FlipUnit = ({ value, label, delay = 0 }) => {
  const formatted = String(value).padStart(2, "0");

  return (
    <motion.div
      className="flip-unit-container"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="flip-card-box">
        {/* Subtle top glare */}
        <div className="flip-card-glare" />

        {/* Center horizontal split divider line with notches */}
        <div className="flip-card-divider">
          <span className="notch notch-left" />
          <span className="divider-line" />
          <span className="notch notch-right" />
        </div>

        {/* Animated digit with 3D flip effect on value change */}
        <div className="flip-digits-wrap">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={formatted}
              className="flip-digit"
              initial={{ rotateX: 90, opacity: 0, scale: 0.95 }}
              animate={{ rotateX: 0, opacity: 1, scale: 1 }}
              exit={{ rotateX: -90, opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.45,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {formatted}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="flip-unit-label">{label}</span>
    </motion.div>
  );
};

const FlipCountdown = ({ lang = "kh" }) => {
  const isKh = lang === "kh";
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = WEDDING_DATE - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="countdown-card"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="section-header text-center">
        <span className="section-badge">
          {isKh ? "រាប់ថយក្រោយ" : "Counting Down"}
        </span>
        <h3 className="countdown-heading">
          {isKh
            ? "⏳ រាប់ថយក្រោយដល់ថ្ងៃសិរីមង្គល ២០ ឧសភា ២០៣១"
            : "⏳ Countdown to The Big Day: May 20, 2031"}
        </h3>
        <p className="countdown-subtext">
          {isKh
            ? "រាល់វិនាទីដែលកន្លងផុត គឺខិតជិតទៅរកថ្ងៃដែលពួកយើងសច្ចាស្រឡាញ់គ្នារៀងរហូត"
            : "Every passing second brings us closer to our forever"}
        </p>
      </div>

      <div className="flip-countdown-wrapper">
        <FlipUnit value={timeLeft.days} label={isKh ? "ថ្ងៃ" : "Days"} delay={0} />
        <div className="flip-separator">:</div>
        <FlipUnit value={timeLeft.hours} label={isKh ? "ម៉ោង" : "Hours"} delay={0.08} />
        <div className="flip-separator">:</div>
        <FlipUnit value={timeLeft.minutes} label={isKh ? "នាទី" : "Mins"} delay={0.16} />
        <div className="flip-separator">:</div>
        <FlipUnit value={timeLeft.seconds} label={isKh ? "វិនាទី" : "Secs"} delay={0.24} />
      </div>

      {/* Visual Monthly Calendar for May 2031 */}
      <WeddingCalendar lang={lang} />
    </motion.div>
  );
};

export default FlipCountdown;
