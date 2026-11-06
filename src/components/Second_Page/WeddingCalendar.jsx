import React from "react";
import { motion } from "framer-motion";
import "./WeddingCalendar.css";

const WEEKDAYS = {
  kh: ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const TEXTS = {
  kh: {
    monthYear: "ឧសភា ២០៣១",
    subtext: "ថ្ងៃសិរីមង្គលអាពាហ៍ពិពាហ៍ ២០ ឧសភា",
    saveDate: "រក្សាទុកក្នុង Google Calendar",
  },
  en: {
    monthYear: "MAY 2031",
    subtext: "The Sacred Wedding Day • May 20th",
    saveDate: "Add to Google Calendar",
  },
};

const WeddingCalendar = ({ lang = "kh" }) => {
  const isKh = lang === "kh";
  const t = TEXTS[lang] || TEXTS.kh;
  const weekdays = WEEKDAYS[lang] || WEEKDAYS.kh;

  // May 2031:
  // May 1, 2031 is a Thursday (Index 4, where Sun = 0)
  // Total days in May = 31
  // Day 20 is a Tuesday (Index 2 in 4th week)
  const emptyDaysBefore = 4; // Sun, Mon, Tue, Wed are empty
  const totalDays = 31;
  const weddingDay = 20;

  const daysArray = [];
  for (let i = 0; i < emptyDaysBefore; i++) {
    daysArray.push({ day: null, isWedding: false });
  }
  for (let d = 1; d <= totalDays; d++) {
    daysArray.push({ day: d, isWedding: d === weddingDay });
  }

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(
      isKh
        ? "សិរីមង្គលអាពាហ៍ពិពាហ៍ សុវណ្ណ ណារិទ្ធ & ស៊ិន ស្រីចិន"
        : "Wedding of Sovan Narith & Sin SreyChen"
    );
    const details = encodeURIComponent(
      isKh
        ? "សូមគោរពអញ្ជើញចូលរួមពិធីអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ នៅគេហដ្ឋានខាងកូនក្រមុំ ភូមិតួលគគីរ ខេត្តបាត់ដំបង"
        : "Cordially invite you to celebrate the wedding of Sovan Narith & Sin SreyChen at Tuol Koki Village, Battambang Province"
    );
    const location = encodeURIComponent(
      "Tuol Koki Village, Battambang Province, Cambodia"
    );
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20310520T000000Z/20310520T160000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, "_blank");
  };

  return (
    <motion.div
      className="wedding-calendar-wrapper"
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="calendar-header-block text-center">
        <div className="calendar-crown">
          <span className="cal-leaf">❦</span>
          <span className="cal-title">{t.monthYear}</span>
          <span className="cal-leaf">❦</span>
        </div>
        <p className="calendar-subtext">{t.subtext}</p>
      </div>

      <div className="calendar-grid">
        {/* Weekday labels */}
        {weekdays.map((wd, idx) => (
          <div key={idx} className="calendar-weekday">
            {wd}
          </div>
        ))}

        {/* Days grid */}
        {daysArray.map((item, idx) => {
          if (!item.day) {
            return <div key={idx} className="calendar-cell empty" />;
          }

          if (item.isWedding) {
            return (
              <motion.div
                key={idx}
                className="calendar-cell wedding-highlight"
                whileHover={{ scale: 1.15 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
              >
                <span className="wedding-badge-ring">💍</span>
                <span className="wedding-day-num">{item.day}</span>
                <div className="wedding-heart-halo" />
              </motion.div>
            );
          }

          return (
            <div key={idx} className="calendar-cell regular">
              <span>{item.day}</span>
            </div>
          );
        })}
      </div>

      <div className="calendar-action-row text-center">
        <motion.button
          type="button"
          className="btn-cal-add"
          onClick={handleAddToCalendar}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title={isKh ? "បន្ថែមទៅ Google Calendar" : "Add to Google Calendar"}
        >
          <span className="cal-btn-icon">📅</span>
          <span>{t.saveDate}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WeddingCalendar;

