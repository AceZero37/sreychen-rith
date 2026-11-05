import React from "react";
import { motion } from "framer-motion";
import "./OurStory.css";

const STORY_MILESTONES = [
  {
    year: "2021",
    icon: "💫",
    titleKh: "ថ្ងៃជួបគ្នាដំបូង",
    titleEn: "When We First Met",
    descKh:
      "ថ្ងៃមួយដែលចៃដន្យ ប៉ុន្តែបានក្លាយជាការចាប់ផ្តើមនៃដំណើរជីវិតរួមគ្នា។ ការសន្ទនាដ៏សាមញ្ញមួយ បានបើកទ្វារបេះដូងឱ្យពួកយើងស្គាល់គ្នា។",
    descEn:
      "A simple, serendipitous encounter that became the beginning of our journey. A gentle conversation that opened the door to our hearts.",
    image: "/assets/images/3.jpg",
  },
  {
    year: "2022",
    icon: "☕",
    titleKh: "ការណាត់ជួបដំបូង",
    titleEn: "Our First Date",
    descKh:
      "កែវកាហ្វេដ៏កក់ក្តៅ និងស្នាមញញឹមអៀនប្រៀន។ ពួកយើងបានចំណាយពេលជជែកគ្នារាប់ម៉ោងដោយមិនដឹងខ្លួន រហូតដល់ថ្ងៃលិច។",
    descEn:
      "Warm coffee and nervous, happy smiles. We lost track of time talking about dreams and laughter until the sun dipped below the horizon.",
    image: "/assets/images/4.jpg",
  },
  {
    year: "2024",
    icon: "✈️",
    titleKh: "ដំណើរកម្សាន្ត & ការយល់ចិត្តគ្នា",
    titleEn: "Adventures & Growing Together",
    descKh:
      "រួមដំណើរកម្សាន្តទៅកាន់ទីកន្លែងថ្មីៗ ឆ្លងកាត់ទាំងពេលវេលារីករាយ និងការលំបាក ដោយនៅក្បែរគ្នាជានិច្ច និងកាន់តែយល់ចិត្តគ្នា។",
    descEn:
      "Exploring new destinations hand-in-hand. Through every joyful moment and challenge, our love deepened into an unshakable bond.",
    image: "/assets/images/7.jpg",
  },
  {
    year: "2026",
    icon: "💍",
    titleKh: "ការសុំរៀបការ — នាងយល់ព្រម!",
    titleEn: "The Proposal — She Said YES!",
    descKh:
      "ក្រោមពន្លឺព្រះច័ន្ទដ៏រ៉ូមែនទិក ដោយក្តីរំភើបនិងក្តីស្រឡាញ់ពេញបេះដូង សំណួរមួយត្រូវបានសួរ... ហើយនាងបានយល់ព្រមទាំងទឹកភ្នែករីករាយ! 💖",
    descEn:
      "Under an enchanting starlit sky, with a heart overflowing with love: 'Will you marry me?' With tears of joy, she said YES! 💖",
    image: "/assets/images/8.jpg",
  },
  {
    year: "2031",
    icon: "💒",
    titleKh: "ថ្ងៃមង្គលការ — ជារៀងរហូត",
    titleEn: "Our Wedding Day — Forever Begins",
    descKh:
      "ថ្ងៃដែលពួកយើងសច្ចាស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង ចំពោះមុខមាតាបិតា បងប្អូន និងមិត្តភក្តិជាទីស្រឡាញ់ទាំងអស់។",
    descEn:
      "The sacred day we unite as husband and wife, promising a lifetime of love and devotion surrounded by our beloved family and friends.",
    image: "/assets/images/9.jpg",
  },
];

const OurStory = ({ lang = "kh" }) => {
  const isKh = lang === "kh";

  return (
    <div className="story-section-card">
      {/* Section Header with repeat scroll animation */}
      <motion.div
        className="section-header text-center"
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-badge">
          {isKh ? "ដំណើរនៃសេចក្តីស្រឡាញ់" : "Our Journey"}
        </span>
        <h2 className="section-title">
          {isKh ? "រឿងរ៉ាវស្នេហារបស់ពួកយើង" : "Our Love Story"}
        </h2>
        <p className="section-subtitle">
          {isKh
            ? "គ្រប់ជំហាននៃការធ្វើដំណើរ គឺពោរពេញដោយក្តីស្រឡាញ់ ស្នាមញញឹម និងការចងចាំដ៏ស្រស់ស្អាត"
            : "Every step of our journey has been woven with laughter, devotion, and cherished memories"}
        </p>
        <div className="small-golden-divider" />
      </motion.div>

      {/* Story Timeline */}
      <div className="story-timeline-container">
        {/* Central vine line */}
        <div className="story-central-line" />

        {STORY_MILESTONES.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              className={`story-milestone-item ${isEven ? "left-side" : "right-side"}`}
              initial={{
                opacity: 0,
                x: isEven ? -60 : 60,
                scale: 0.94,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Center icon badge on timeline line */}
              <motion.div
                className="story-center-node"
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
              >
                <span className="story-node-icon">{item.icon}</span>
                <span className="story-node-year">{item.year}</span>
              </motion.div>

              {/* Card content */}
              <motion.div
                className="story-card-box"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <div className="story-card-img-wrap">
                  <img
                    src={item.image}
                    alt={isKh ? item.titleKh : item.titleEn}
                    className="story-card-img"
                    loading="lazy"
                  />
                  <span className="story-year-pill">{item.year}</span>
                </div>

                <div className="story-card-body">
                  <h3 className="story-milestone-title">
                    {isKh ? item.titleKh : item.titleEn}
                  </h3>
                  <p className="story-milestone-desc">
                    {isKh ? item.descKh : item.descEn}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OurStory;
