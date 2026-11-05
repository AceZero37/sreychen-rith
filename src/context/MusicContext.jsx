import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Check if first-visit prompt has been answered this session
  useEffect(() => {
    try {
      const prompted = sessionStorage.getItem("wedding_music_prompt_shown");
      if (!prompted) {
        // Small delay so page renders nicely before modal appears
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const playMusic = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.log("Audio play postponed or denied:", err);
      setIsPlaying(false);
    }
  };

  const pauseMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const acceptMusic = () => {
    try {
      sessionStorage.setItem("wedding_music_prompt_shown", "true");
    } catch {
      // ignore
    }
    setShowPrompt(false);
    playMusic();
  };

  const declineMusic = () => {
    try {
      sessionStorage.setItem("wedding_music_prompt_shown", "true");
    } catch {
      // ignore
    }
    setShowPrompt(false);
  };

  return (
    <MusicContext.Provider
      value={{
        audioRef,
        isPlaying,
        playMusic,
        pauseMusic,
        togglePlay,
        showPrompt,
        setShowPrompt,
        acceptMusic,
        declineMusic,
      }}
    >
      <audio
        ref={audioRef}
        src="/assets/music/background_sound.mp3"
        loop
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
