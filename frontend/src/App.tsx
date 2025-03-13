import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import YearsPage from './pages/YearsPage';
import YearDetailPage from './pages/YearDetailPage';
import SemesterPage from './pages/SemesterPage';
import SubjectPage from './pages/SubjectPage';
import BookmarksPage from './pages/BookmarksPage';
import ParticleBackground from './components/ParticleBackground';
import EnhancedBackground from './components/EnhancedBackground';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-black text-white">
          <ParticleBackground />
          <EnhancedBackground />
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
      </Router>
    </AuthProvider>
  );
}

export default App;