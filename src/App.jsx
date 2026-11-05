import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import { MusicProvider } from "./context/MusicContext";
import MusicPlayer from "./components/Common/MusicPlayer";
import MusicPromptModal from "./components/Common/MusicPromptModal";
import Homepage from "./components/First_Page/Homepage";
import SecondHomepage from "./components/Second_Page/Homepage";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route path="/second" element={<SecondHomepage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <LanguageProvider>
      <MusicProvider>
        <Router>
          <MusicPlayer />
          <MusicPromptModal />
          <AnimatedRoutes />
        </Router>
      </MusicProvider>
    </LanguageProvider>
  );
}

export default App;
