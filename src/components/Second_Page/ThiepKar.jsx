import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OurStory from "./OurStory";
import FlipCountdown from "./FlipCountdown";
import PhotoGallery from "./PhotoGallery";
import "./ThiepKar.css";

const INITIAL_WISHES = [
  {
    name: "សុខា & គន្ធា",
    message: "សូមជូនពរឱ្យប្អូនទាំងពីរស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំជានិច្ច! 💖",
    time: "2 នាទីមុន",
  },
  {
    name: "David & Jessica",
    message: "Wishing you a lifetime of endless love, joy, and blessed happiness! Congratulations Ry & Rith! 🥂✨",
    time: "10 minutes ago",
  },
  {
    name: "បងប្រុស ពិសិដ្ឋ",
    message: "សិរីសួស្តី ជ័យមង្គល វិបុលសុខ! កូនកំលោះសង្ហា កូនក្រមុំស្អាត សមគ្នាតែម្ដង! 🎉",
    time: "30 នាទីមុន",
  },
];

const CEREMONIAL_SCHEDULE = [
  {
    time: "07:00",
    ampmKh: "ព្រឹក",
    ampmEn: "AM",
    icon: "🌅",
    titleKh: "ពិធីជួបជុំញាតិមិត្ត និងហែកូនកំលោះ (ហែកំណត់)",
    titleEn: "Gathering & Groom's Procession (Hae Chamnoun)",
    descKh:
      "ជួបជុំបងប្អូន ញាតិមិត្តជិតឆ្ងាយ និងរៀបចំហែកូនកំលោះចូលរោងជ័យ រៀបចំជំនូនផ្លែឈើ",
    descEn:
      "Relatives gather to escort the groom in the traditional procession to the wedding hall with fruit trays.",
  },
  {
    time: "08:30",
    ampmKh: "ព្រឹក",
    ampmEn: "AM",
    icon: "🍎",
    titleKh: "ពិធីរៀបរាប់ផ្លែឈើ និងពិសាអាហារពេលព្រឹក",
    titleEn: "Fruit Offering Ceremony & Morning Feast",
    descKh:
      "ពិធីរាប់ជំនូនផ្លែឈើ និងអញ្ជើញភ្ញៀវកិត្តិយសទាំងអស់ទទួលទានអាហារពេលព្រឹកជុំគ្នា",
    descEn:
      "Ceremonial counting and offering of wedding fruits, followed by breakfast for all honored guests.",
  },
  {
    time: "09:30",
    ampmKh: "ព្រឹក",
    ampmEn: "AM",
    icon: "✂️",
    titleKh: "ពិធីកាត់សក់បង្កក់សិរី",
    titleEn: "Hair Cutting & Cleansing Blessing (Kat Sok)",
    descKh:
      "ពិធីកាត់សក់សិរីសួស្តី ជម្រះឧបទ្រពចង្រៃ និងប្រសិទ្ធពរជ័យសិរីមង្គលដល់គូស្វាមីភរិយាថ្មី",
    descEn:
      "Symbolic hair cleansing and cutting ceremony to purge misfortune and bring good luck and purity.",
  },
  {
    time: "11:00",
    ampmKh: "ព្រឹក",
    ampmEn: "AM",
    icon: "💍",
    titleKh: "ពិធីសំពះផ្ទឹម ចងដៃ និងបាចផ្កាស្លា",
    titleEn: "Sacred Pairing & Red Thread Blessing (Sompeas Ptem)",
    descKh:
      "ពិធីសំពះផ្ទឹម ចងអំបោះក្រហម និងបាចផ្កាស្លា ប្រសិទ្ធពរជ័យឱ្យស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង",
    descEn:
      "The sacred wrist tying ceremony with red threads and shower of areca flowers for eternal marriage bond.",
  },
  {
    time: "05:00",
    ampmKh: "ល្ងាច",
    ampmEn: "PM",
    icon: "🥂",
    isHighlight: true,
    titleKh: "ពិធីទទួលបដិសណ្ឋារកិច្ច និងពិសាភោជនាហារ",
    titleEn: "Grand Reception, Dinner Banquet & Music",
    descKh:
      "ទទួលស្វាគមន៍ភ្ញៀវកិត្តិយស ពិសាភោជនាហារពេលល្ងាច រាំកម្សាន្ត និងថតរូបអនុស្សាវរីយ៍",
    descEn:
      "Welcome reception banquet, joyous dinner celebration, champagne toast, live music, and dancing.",
  },
];

const ThiepKar = ({ lang = "kh" }) => {
  // Wishes State
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem("wedding_wishes");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });
  const [senderName, setSenderName] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [showHearts, setShowHearts] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle wish submission
  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!senderName.trim() || !senderMessage.trim()) return;

    const newWish = {
      name: senderName.trim(),
      message: senderMessage.trim(),
      time: lang === "kh" ? "ទើបតែផ្ញើ" : "Just now",
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem("wedding_wishes", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSenderName("");
    setSenderMessage("");
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 3000);
  };

  // Copy address to clipboard
  const handleCopyAddress = () => {
    const address =
      lang === "kh"
        ? "ភូមិតួលគគីរ ខេត្តបាត់ដំបង"
        : "Tuol Koki Village, Battambang Province";
    navigator.clipboard.writeText(address);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const isKh = lang === "kh";

  return (
    <section id="thiep-kar-section" className="thiepkar-wrapper">
      {/* Floating Rose Petals / Sparks background */}
      <div className="petals-container" aria-hidden="true">
        <span className="petal petal-1">🌸</span>
        <span className="petal petal-2">✨</span>
        <span className="petal petal-3">🌺</span>
        <span className="petal petal-4">💛</span>
        <span className="petal petal-5">🌸</span>
        <span className="petal petal-6">✨</span>
        <span className="petal petal-7">💖</span>
        <span className="petal petal-8">🌺</span>
      </div>

      {/* Heart burst on wish send */}
      {showHearts && (
        <div className="heart-burst-container" aria-hidden="true">
          <span className="heart-pop h1">💖</span>
          <span className="heart-pop h2">✨</span>
          <span className="heart-pop h3">🎉</span>
          <span className="heart-pop h4">❤️</span>
          <span className="heart-pop h5">🥰</span>
        </div>
      )}

      {/* Copy Toast */}
      {copiedToast && (
        <div className="toast-notification">
          ✓ {isKh ? "បានចម្លងអាសយដ្ឋានដោយជោគជ័យ!" : "Address copied to clipboard!"}
        </div>
      )}

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            className="scroll-to-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            title={isKh ? "ត្រឡប់ទៅខាងលើ" : "Back to top"}
            aria-label="Back to top"
          >
            <svg
              className="scroll-to-top-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="thiepkar-container">
        {/* ================= 1. TRADITIONAL THIEP KAR (INVITATION CARD) ================= */}
        <motion.div
          className="thiepkar-card"
          initial={{ opacity: 0, y: 45, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.12 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Sacred Heading */}
          <motion.div
            className="thiepkar-header text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="traditional-crown">
              <span className="sacred-leaf">❦</span>
              <span className="sacred-circle">✦</span>
              <span className="sacred-leaf">❦</span>
            </div>
            <h3 className="thiepkar-blessing">
              {isKh
                ? "សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ"
                : "Auspicious & Blessed Matrimony"}
            </h3>
            <h1 className="thiepkar-main-title">
              {isKh ? "ធៀបការអាពាហ៍ពិពាហ៍" : "Wedding Invitation"}
            </h1>
            <p className="thiepkar-sub-blessing">
              {isKh
                ? "សិរីមង្គលអាពាហ៍ពិពាហ៍ នៃគូស្វាមីភរិយាថ្មី"
                : "The Holy Union of Two Hearts"}
            </p>
            <div className="golden-divider">
              <span className="line" />
              <span className="ring-icon">💍</span>
              <span className="line" />
            </div>
          </motion.div>

          {/* Parents Section - Traditional Symmetrical Layout */}
          <motion.div
            className="traditional-parents-tablet"
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Shared Header */}
            <div className="parents-shared-header text-center">
              <div className="traditional-mini-crown">
                <span className="mini-leaf">❦</span>
                <span className="mini-star">✦</span>
                <span className="mini-leaf">❦</span>
              </div>
              <h3 className="parents-shared-title">
                {isKh ? "មាតាបិតាទាំងសងខាង" : "The Honored Parents"}
              </h3>
              <div className="parents-header-divider">
                <span className="p-line" />
                <span className="p-knot">⚜</span>
                <span className="p-line" />
              </div>
            </div>

            {/* Symmetrical Two-Wing Columns with Center Pillar */}
            <div className="parents-symmetrical-grid">
              {/* Left Column: Groom's Family */}
              <motion.div
                className="family-wing groom-wing"
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="wing-header">
                  <span className="wing-badge groom-badge">
                    {isKh ? "ខាងកូនប្រុស" : "Groom's Side"}
                  </span>
                </div>

                <div className="wing-body">
                  <div className="parent-row">
                    <span className="parent-title-kh">{isKh ? "លោកឪពុក ៖" : "Father:"}</span>
                    <span className="parent-full-name">{isKh ? "អ៊ួយ សុវណ្ណ" : "Ouy Sovan"}</span>
                  </div>
                  <div className="parent-row">
                    <span className="parent-title-kh">{isKh ? "អ្នកម្តាយ ៖" : "Mother:"}</span>
                    <span className="parent-full-name">{isKh ? "ទូច ស្រីនាង" : "Touch Sreyniang"}</span>
                  </div>
                </div>

                <div className="wing-child-status">
                  <span className="child-tag">{isKh ? "កូនប្រុស ៖" : "Son:"}</span>
                  <span className="child-name">{isKh ? "សុវណ្ណ ណារិទ្ធ" : "Sovan Narith"}</span>
                </div>
              </motion.div>

              {/* Center Pillar: Sacred Union Rings & Lotus */}
              <div className="parents-center-pillar">
                <span className="pillar-vine top" />
                <motion.div
                  className="pillar-emblem"
                  animate={{ scale: [1, 1.15, 1], rotate: [0, -4, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <span className="pillar-rings">💍</span>
                </motion.div>
                <span className="pillar-union-text">{isKh ? "ភ្ជាប់និស្ស័យ" : "In Union"}</span>
                <span className="pillar-vine bottom" />
              </div>

              {/* Right Column: Bride's Family */}
              <motion.div
                className="family-wing bride-wing"
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="wing-header">
                  <span className="wing-badge bride-badge">
                    {isKh ? "ខាងកូនស្រី" : "Bride's Side"}
                  </span>
                </div>

                <div className="wing-body">
                  <div className="parent-row">
                    <span className="parent-title-kh">{isKh ? "លោកឪពុក ៖" : "Father:"}</span>
                    <span className="parent-full-name">{isKh ? "ពេជ្រ ចន្ធូ" : "Pech Chanthou"}</span>
                  </div>
                  <div className="parent-row">
                    <span className="parent-title-kh">{isKh ? "អ្នកម្តាយ ៖" : "Mother:"}</span>
                    <span className="parent-full-name">{isKh ? "ស៊ិន សារ៉ាន់" : "Sin Saran"}</span>
                  </div>
                </div>

                <div className="wing-child-status">
                  <span className="child-tag">{isKh ? "កូនស្រី ៖" : "Daughter:"}</span>
                  <span className="child-name">{isKh ? "ស៊ិន ស្រីចិន" : "Sin SreyChen"}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Formal Invitation Message */}
          <motion.div
            className="thiepkar-invitation-text text-center"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <p>
              {isKh
                ? "យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្តជិតឆ្ងាយទាំងអស់ មេត្តាអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រី របស់យើងខ្ញុំ"
                : "We cordially invite you, our distinguished guests, family, and cherished friends, to grace our celebration with your presence and bestow your blessings upon the marriage of our beloved son and daughter."}
            </p>
          </motion.div>

          {/* Bride & Groom Couple Presentation Cards */}
          <div className="couple-cards-container">
            {/* Groom Card */}
            <motion.div
              className="couple-person-card groom-card"
              initial={{ opacity: 0, x: -60, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="couple-photo-wrapper">
                <img
                  src="/assets/images/1.jpg"
                  alt="Groom Sovan Narith"
                  className="couple-photo"
                />
                <span className="couple-role-badge">
                  {isKh ? "កូនកំលោះ" : "Groom"}
                </span>
              </div>
              <h2 className="couple-person-name">
                {isKh ? "សុវណ្ណ ណារិទ្ធ" : "Sovan Narith"}
              </h2>
              <span className="couple-nickname">(Rith)</span>
              <p className="couple-honor">
                {isKh ? "កូនប្រុសច្បង" : "Beloved Son"}
              </p>
            </motion.div>

            {/* Center Heart Rings & Connected By Love */}
            <motion.div
              className="couple-center-connector"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              <div className="connector-rings">
                <span className="ring-pulse">❤️</span>
              </div>
              <span className="connector-text">
                {isKh ? "ភ្ជាប់និស្ស័យ" : "Tied in Love"}
              </span>
            </motion.div>

            {/* Bride Card */}
            <motion.div
              className="couple-person-card bride-card"
              initial={{ opacity: 0, x: 60, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="couple-photo-wrapper">
                <img
                  src="/assets/images/2.jpg"
                  alt="Bride Sin SreyChen"
                  className="couple-photo"
                />
                <span className="couple-role-badge">
                  {isKh ? "កូនក្រមុំ" : "Bride"}
                </span>
              </div>
              <h2 className="couple-person-name">
                {isKh ? "ស៊ិន ស្រីចិន" : "Sin SreyChen"}
              </h2>
              <span className="couple-nickname">(Mey)</span>
              <p className="couple-honor">
                {isKh ? "កូនស្រីច្បង" : "Beloved Daughter"}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ================= 2. OUR STORY SECTION ================= */}
        <OurStory lang={lang} />

        {/* ================= 3. WEDDING CEREMONIAL PROGRAM (SCHEDULE) ================= */}
        <motion.div
          className="thiepkar-section-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              {isKh ? "កាលវិភាគពិធី" : "Timeline"}
            </span>
            <h2 className="section-title">
              {isKh ? "កម្មវិធីបុណ្យអាពាហ៍ពិពាហ៍" : "Wedding Ceremonial Program"}
            </h2>
            <p className="section-subtitle">
              {isKh
                ? "ថ្ងៃអាទិត្យ ទី២០ ខែឧសភា ឆ្នាំ២០៣១"
                : "Sunday, May 20th, 2031"}
            </p>
            <div className="small-golden-divider" />
          </motion.div>

          <div className="timeline-container">
            {CEREMONIAL_SCHEDULE.map((item, idx) => (
              <motion.div
                key={idx}
                className={`timeline-item ${item.isHighlight ? "highlight" : ""}`}
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ x: 6 }}
              >
                <div className="timeline-time">
                  <span className="time-digit">{item.time}</span>
                  <span className="time-ampm">{isKh ? item.ampmKh : item.ampmEn}</span>
                </div>
                <motion.div
                  className="timeline-marker"
                  whileHover={{ scale: 1.25, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <span className="marker-icon">{item.icon}</span>
                </motion.div>
                <div className="timeline-content">
                  <h4 className="timeline-title">
                    {isKh ? item.titleKh : item.titleEn}
                  </h4>
                  <p className="timeline-desc">
                    {isKh ? item.descKh : item.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= 4. FLIP-CARD COUNTDOWN ================= */}
        <FlipCountdown lang={lang} />

        {/* ================= 5. LOCATION & DIRECTIONS ================= */}
        <motion.div
          className="location-section-card"
          initial={{ opacity: 0, y: 45, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.18 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-header text-center">
            <span className="section-badge">
              {isKh ? "ទីតាំងប្រារព្ធពិធី" : "Venue Location"}
            </span>
            <h2 className="section-title">
              {isKh ? "ទីកន្លែងរៀបចំមង្គលការ" : "Wedding Reception Venue"}
            </h2>
            <div className="small-golden-divider" />
          </div>

          <div className="location-info-card">
            <motion.div
              className="location-pin-icon"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              📍
            </motion.div>
            <div className="location-details">
              <h3>
                {isKh
                  ? "គេហដ្ឋានខាងកូនក្រមុំ (រោងជ័យ)"
                  : "The Bride's Residence (Wedding Hall)"}
              </h3>
              <p className="address-text">
                {isKh
                  ? "ភូមិតួលគគីរ ខេត្តបាត់ដំបង"
                  : "Tuol Koki Village, Battambang Province"}
              </p>
            </div>
            <div className="location-actions">
              <motion.button
                type="button"
                className="btn-location-action btn-copy"
                onClick={handleCopyAddress}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                📋 {isKh ? "ចម្លងទីតាំង" : "Copy Location"}
              </motion.button>
              <motion.a
                href="https://maps.app.goo.gl/XQPLV53xsXbMKouY8?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-location-action btn-map"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                🗺️ {isKh ? "បើកផែនទី" : "Open Map"}
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ================= 6. MEMORY ALBUM / PHOTO GALLERY ================= */}
        <PhotoGallery lang={lang} />

        {/* ================= 7. WEDDING GIFT / QR CODE (ចំណងដៃ) ================= */}
        <motion.div
          className="gift-section-card"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-header text-center">
            <span className="section-badge">
              {isKh ? "ចំណងដៃមង្គលការ" : "Wedding Gift"}
            </span>
            <h2 className="section-title">
              {isKh ? "ចំណងដៃ & ពរជ័យមង្គល" : "Send Blessings & Wedding Gift"}
            </h2>
            <p className="section-subtitle">
              {isKh
                ? "វត្តមាន និងពរជ័យរបស់លោកអ្នកគឺជាកាដូដ៏មានតម្លៃបំផុតសម្រាប់ពួកយើង"
                : "Your presence and prayers are the greatest gift of all"}
            </p>
            <div className="small-golden-divider" />
          </div>

          <div className="gift-cards-row">
            {/* QR Card */}
            <motion.div
              className="gift-qr-card"
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="qr-badge">ABA / BAKONG QR</div>
              <div className="qr-box">
                {/* Visual QR Code Representation */}
                <div className="qr-visual">
                  <svg
                    width="140"
                    height="140"
                    viewBox="0 0 100 100"
                    fill="#181234"
                  >
                    <rect width="100" height="100" fill="#fff" rx="8" />
                    <rect x="10" y="10" width="24" height="24" fill="#7f53ac" />
                    <rect x="14" y="14" width="16" height="16" fill="#fff" />
                    <rect x="18" y="18" width="8" height="8" fill="#7f53ac" />

                    <rect x="66" y="10" width="24" height="24" fill="#7f53ac" />
                    <rect x="70" y="14" width="16" height="16" fill="#fff" />
                    <rect x="74" y="18" width="8" height="8" fill="#7f53ac" />

                    <rect x="10" y="66" width="24" height="24" fill="#7f53ac" />
                    <rect x="14" y="70" width="16" height="16" fill="#fff" />
                    <rect x="18" y="74" width="8" height="8" fill="#7f53ac" />

                    <rect x="42" y="12" width="6" height="6" fill="#ffe873" />
                    <rect x="52" y="12" width="6" height="6" fill="#181234" />
                    <rect x="42" y="24" width="6" height="6" fill="#181234" />
                    <rect x="52" y="24" width="6" height="6" fill="#ffe873" />

                    <rect x="40" y="40" width="20" height="20" fill="#ffe873" rx="4" />
                    <text x="43" y="55" fontSize="11" fill="#181234">💖</text>

                    <rect x="12" y="44" width="6" height="6" fill="#181234" />
                    <rect x="24" y="44" width="6" height="6" fill="#7f53ac" />
                    <rect x="70" y="44" width="8" height="6" fill="#181234" />
                    <rect x="82" y="44" width="6" height="6" fill="#7f53ac" />
                    <rect x="44" y="70" width="6" height="6" fill="#7f53ac" />
                    <rect x="54" y="76" width="8" height="6" fill="#181234" />
                    <rect x="70" y="70" width="6" height="6" fill="#ffe873" />
                    <rect x="80" y="78" width="8" height="6" fill="#7f53ac" />
                  </svg>
                </div>
                <div className="qr-info">
                  <p className="account-holder">SOVAN NARITH / KHMER SIN SREYCHEN</p>
                  <p className="account-sub">
                    {isKh ? "ចំណងដៃតាមរយៈគណនីធនាគារ" : "Digital Wedding Gift"}
                  </p>
                </div>
              </div>
              <p className="qr-thank-note">
                {isKh
                  ? "«សូមអរគុណសម្រាប់ទឹកចិត្ត និងការជូនពរដ៏កក់ក្តៅរបស់លោកអ្នក»"
                  : "“Thank you wholeheartedly for your love, support, and blessings.”"}
              </p>
            </motion.div>

            {/* Wishes Form & Live Board */}
            <motion.div
              className="wishes-board-card"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="wishes-title">
                ✍️ {isKh ? "ផ្ញើសារជូនពរដល់គូស្នេហ៍" : "Send Wedding Wishes"}
              </h3>
              <form onSubmit={handleWishSubmit} className="wish-form">
                <input
                  type="text"
                  placeholder={
                    isKh
                      ? "ឈ្មោះរបស់អ្នក (Your Name)..."
                      : "Your Name..."
                  }
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="wish-input"
                  required
                />
                <textarea
                  placeholder={
                    isKh
                      ? "សរសេរសារជូនពរនៅទីនេះ (Write your blessing)..."
                      : "Write your warm blessing here..."
                  }
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  className="wish-textarea"
                  rows="3"
                  required
                />
                <motion.button
                  type="submit"
                  className="wish-submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💌 {isKh ? "ផ្ញើសារជូនពរ" : "Send Blessing"}
                </motion.button>
              </form>

              {/* Recent Wishes List */}
              <div className="wishes-feed">
                <h4 className="feed-header">
                  💬 {isKh ? "សារជូនពរពីភ្ញៀវកិត្តិយស" : "Recent Guest Wishes"}
                </h4>
                <div className="feed-list">
                  {wishes.map((w, index) => (
                    <motion.div
                      key={index}
                      className="wish-item"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="wish-top">
                        <span className="wish-author">{w.name}</span>
                        <span className="wish-time">{w.time}</span>
                      </div>
                      <p className="wish-text">{w.message}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ================= 8. FOOTER THANK YOU ================= */}
        <motion.div
          className="thiepkar-footer text-center"
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="footer-rings"
            animate={{ scale: [1, 1.25, 1], rotate: [0, -6, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          >
            💍 & 💍
          </motion.div>
          <h2 className="footer-names">Sovan Narith &amp; Khmer Sin SreyChen</h2>
          <p className="footer-kh-names">សុវណ្ណ ណារិទ្ធ &amp; ស៊ិន ស្រីចិន</p>
          <p className="footer-thank">
            {isKh
              ? "សូមអរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះការអញ្ជើញចូលរួមរបស់លោកអ្នក!"
              : "Thank you from the bottom of our hearts for being part of our special day!"}
          </p>
          <span className="footer-date">May 20, 2031 • Battambang, Cambodia</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ThiepKar;
