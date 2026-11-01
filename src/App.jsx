import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Herosection from './components/herosection';
import SearchPage from './components/Searchpage';
import Footersection from './components/footersection';
import AIChatAssistant from './components/AIChatAssistant';
import AdminDashboard from './adminDashboard';
import { Navigate } from 'react-router-dom';
 const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Agar token nahi hai ya role 'admin' nahi hai, toh home page par bhej do
  if (!token || role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Agar admin hai, toh dashboard dikhao
  return children;
};

const App = () => {
   


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const role = params.get('role');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      window.dispatchEvent(new Event('storage'));
      // यूआरएल को साफ करने के लिए ताकि बार-बार टोकन न दिखे
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
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
      <Routes>
        {/* 1. Admin Dashboard - Bilkul alag aur saaf page, koi navbar/footer nahi */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        {/* 2. Baaki saare pages - Jinke sath Navbar aur Footer dikhenge */}
        <Route path="/*" element={
          <div>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <AIChatAssistant />

            <Routes>
              <Route path="/" element={<Herosection />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>

            <Footersection />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;





// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/navbar';
// import Herosection from './components/herosection';
// import SearchPage from './components/Searchpage';
// import Footersection from './components/footersection';
// import AIChatAssistant from './components/AIChatAssistant';
// import AdminDashboard from './adminDashboard';

// const App = () => {
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get('token');
//     const role = params.get('role');

//     if (token) {
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);
//       // यूआरएल को साफ करने के लिए ताकि बार-बार टोकन न दिखे
//       window.history.replaceState({}, document.title, window.location.pathname);
//     }
//   }, []);
//   const [darkMode, setDarkMode] = useState(false);

//   // डार्क मोड ऑन होने पर बॉडी पर 'dark-theme' क्लास लग जाएगी
//   useEffect(() => {
//     if (darkMode) {
//       document.body.classList.add('dark-theme');
//     } else {
//       document.body.classList.remove('dark-theme');
//     }
//   }, [darkMode]);

//   return (
//     <Router>
//       <div>
//         {/* Navbar को darkMode और setDarkMode पास किया */}
//         <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
//         <AIChatAssistant/>


//         <Routes>
//           <Route path="/" element={<Herosection />} />
//           <Route path="/search" element={<SearchPage />} />
//         </Routes>

//         <Footersection />
//       </div>
//     </Router>
//   );
// };

// export default App;

