// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage';
// import AuthPage from './pages/AuthPage';
// import YearsPage from './pages/YearsPage';
// import YearDetailPage from './pages/YearDetailPage';
// import SemesterPage from './pages/SemesterPage';
// import SubjectPage from './pages/SubjectPage';
// import BookmarksPage from './pages/BookmarksPage';
// import Layout from "./components/Layout"
// import AerospaceBackground from './components/AerospaceBackground';
// function App() {
//   return (
//     <AuthProvider>
// <AerospaceBackground />
//       <Router>
//         <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-black text-white z-[20]">
//           {/* <ParticleBackground /> */} 
//            {/* <EnhancedBackground /> */}
         
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/years" element={<YearsPage />} />
//             <Route path="/year/:yearId" element={<YearDetailPage />} />
//             <Route path="/year/:yearId/semester/:semesterId" element={<SemesterPage />} />
//             <Route path="/subject/:subjectId" element={<SubjectPage />} />
//             <Route path="/bookmarks" element={<BookmarksPage />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage"
import AuthPage from "./pages/AuthPage"
import YearsPage from "./pages/YearsPage"
import YearDetailPage from "./pages/YearDetailPage"
import SemesterPage from "./pages/SemesterPage"
import SubjectPage from "./pages/SubjectPage"
import BookmarksPage from "./pages/BookmarksPage"
import AerospaceBackground from "./components/AerospaceBackground"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative min-h-screen">
          {/* Position the background absolutely to cover the entire viewport */}
          <div className="fixed inset-0 z-0">
            <AerospaceBackground />
          </div>

          {/* Content container with gradient overlay */}
          <div className="relative min-h-screen  to-black/80 text-white z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/years" element={<YearsPage />} />
              <Route path="/year/:yearId" element={<YearDetailPage />} />
              <Route path="/year/:yearId/semester/:semesterId" element={<SemesterPage />} />
              <Route path="/subject/:subjectId" element={<SubjectPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

