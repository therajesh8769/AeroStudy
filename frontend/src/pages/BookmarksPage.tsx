import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Bookmark, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { yearsData } from '../data/yearsData';

const BookmarksPage: React.FC = () => {
  const { user, removeBookmark } = useAuth();
  
  // Find all bookmarked subjects
  const bookmarkedSubjects = user?.bookmarks.map(bookmarkId => {
    for (const year of yearsData) {
      for (const semester of year.semesters) {
        const subject = semester.subjects.find(s => s.id === bookmarkId);
        if (subject) {
          return {
            ...subject,
            year,
            semester
          };
        }
      }
    }
    return null;
  }).filter(Boolean) || [];
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/years" className="inline-flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Years
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Bookmarks
          </h1>
          <p className="text-blue-300 text-xl">
            Quick access to your saved subjects
          </p>
        </motion.div>
        
        {bookmarkedSubjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-8 text-center"
          >
            <Bookmark className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-white mb-2">No bookmarks yet</h2>
            <p className="text-gray-400 mb-6">
              You haven't bookmarked any subjects. Browse the curriculum and bookmark subjects for quick access.
            </p>
            <Link 
              to="/years" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Browse Subjects
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedSubjects.map((subject: any, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <Book className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                    <h2 className="text-xl font-bold text-white">{subject.name}</h2>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded mr-2">
                      {subject.code}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {subject.year.name} • {subject.semester.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Link 
                      to={`/subject/${subject.id}`}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      View materials →
                    </Link>
                    
                    <button 
                      onClick={() => removeBookmark(subject.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                      title="Remove bookmark"
                    >
                      <Bookmark className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;