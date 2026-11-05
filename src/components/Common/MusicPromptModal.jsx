import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "../../context/MusicContext";
import { useLanguage } from "../../context/LanguageContext";
import "./MusicPromptModal.css";

const MusicPromptModal = () => {
  const { showPrompt, acceptMusic, declineMusic } = useMusic();
  const { lang } = useLanguage();
  const isKh = lang === "kh";

  return (
    <AnimatePresence>
      {showPrompt && (
        <div className="music-prompt-backdrop" onClick={declineMusic}>
          <motion.div
            className="music-prompt-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            {/* Golden corner flourishes */}
            <div className="modal-corner top-left" />
            <div className="modal-corner top-right" />
            <div className="modal-corner bottom-left" />
            <div className="modal-corner bottom-right" />

            {/* Glowing Icon Header */}
            <div className="music-prompt-icon-wrap">
              <motion.div
                className="music-prompt-icon"
                animate={{
                  scale: [1, 1.12, 1],
                  rotate: [0, -6, 6, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                🎵
              </motion.div>
              <div className="music-prompt-rings" />
            </div>

            {/* Title */}
            <h3 className="music-prompt-title">
              {isKh ? "តន្ត្រីមង្គលការ" : "Wedding Music"}
            </h3>

            {/* Subtitle */}
            <p className="music-prompt-names">
              {isKh
                ? "សុវណ្ណ ណារិទ្ធ ♥ ស៊ិន ស្រីចិន"
                : "Sovan Narith ♥ Khmer Sin SreyChen"}
            </p>

            {/* Description message */}
            <p className="music-prompt-desc">
              {isKh
                ? "សូមស្វាគមន៍មកកាន់ធៀបការរបស់យើងខ្ញុំ! តើលោកអ្នកចង់បើកសម្លេងតន្ត្រីពិរោះៗ ដើម្បីបង្កើនបរិយាកាសរីករាយដែរឬទេ?"
                : "Welcome to our wedding invitation! Would you like to play our romantic background music during your visit?"}
            </p>

            {/* Action Buttons */}
            <div className="music-prompt-actions">
              <motion.button
                type="button"
                className="prompt-btn-primary"
                onClick={acceptMusic}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="btn-icon">🎶</span>
                <span>{isKh ? "ចាក់តន្ត្រី" : "Play Music"}</span>
              </motion.button>

              <motion.button
                type="button"
                className="prompt-btn-secondary"
                onClick={declineMusic}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="btn-icon">🔇</span>
                <span>{isKh ? "បន្តដោយគ្មានសម្លេង" : "No, Keep Silent"}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MusicPromptModal;
