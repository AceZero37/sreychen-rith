import React from "react";
import { useMusic } from "../../context/MusicContext";
import { useLanguage } from "../../context/LanguageContext";
import "./MusicPlayer.css";

const MusicPlayer = () => {
  const { isPlaying, togglePlay } = useMusic();
  const { lang } = useLanguage();

  const tooltipText = isPlaying
    ? lang === "kh" ? "ផ្អាកតន្ត្រី" : "Pause Music"
    : lang === "kh" ? "ចាក់តន្ត្រី" : "Play Music";

  return (
    <div className="music-player-container">
      {/* Floating Notes when playing */}
      {isPlaying && (
        <div className="music-notes-container" aria-hidden="true">
          <span className="floating-note note-1">♪</span>
          <span className="floating-note note-2">♫</span>
          <span className="floating-note note-3">♬</span>
          <span className="floating-note note-4">♩</span>
        </div>
      )}

      {/* Music Action Button */}
      <button
        type="button"
        className={`music-toggle-btn ${isPlaying ? "playing" : "paused"}`}
        onClick={togglePlay}
        aria-label={tooltipText}
        title={tooltipText}
      >
        {/* Pulsing Aura Rings when playing */}
        {isPlaying && <div className="music-pulse-ring" />}
        {isPlaying && <div className="music-pulse-ring delay" />}

        {/* Inner Disc with Icons & Equalizer */}
        <div className="music-btn-inner">
          {isPlaying ? (
            <div className="equalizer-bars" aria-hidden="true">
              <span className="eq-bar bar-1" />
              <span className="eq-bar bar-2" />
              <span className="eq-bar bar-3" />
              <span className="eq-bar bar-4" />
            </div>
          ) : (
            <svg
              className="music-play-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </div>
      </button>

      {/* Helper hint text */}
      <div className="music-label-pill">
        <span className="music-disc-icon">💿</span>
        <span className="music-label-text">
          {isPlaying
            ? (lang === "kh" ? "កំពុងចាក់ចម្រៀង" : "Playing Music")
            : (lang === "kh" ? "ចាក់តន្ត្រី" : "Play Music")}
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;
