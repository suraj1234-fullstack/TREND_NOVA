import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Herosection from './components/herosection';
import SearchPage from './components/Searchpage';
import Footersection from './components/footersection';
import AIChatAssistant from './components/AIChatAssistant';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // डार्क मोड ऑन होने पर बॉडी पर 'dark-theme' क्लास लग जाएगी
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  return (
    <Router>
      <div>
        {/* Navbar को darkMode और setDarkMode पास किया */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <AIChatAssistant/>


        <Routes>
          <Route path="/" element={<Herosection />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>

        <Footersection />
      </div>
    </Router>
  );
};

export default App;