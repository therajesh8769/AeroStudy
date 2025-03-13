import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, ArrowLeft } from 'lucide-react';
import { yearsData } from '../data/yearsData';

const SemesterPage: React.FC = () => {
  const { yearId, semesterId } = useParams<{ yearId: string; semesterId: string }>();
  
  const year = yearsData.find(y => y.id.toString() === yearId);
  const semester = year?.semesters.find(s => s.id === semesterId);
  
  if (!year || !semester) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Semester not found</h2>
          <Link to="/years" className="text-blue-400 hover:underline">
            Go back to years
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to={`/year/${yearId}`} className="inline-flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {year.name}
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            {year.name} - {semester.name}
          </h1>
          <p className="text-blue-300 text-xl">
            Select a subject to view study materials
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {semester.subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link to={`/subject/${subject.id}`}>
                <motion.div 
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <Book className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                      <h2 className="text-xl font-bold text-white">{subject.name}</h2>
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded">
                        {subject.code}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-400">
                        View materials
                      </span>
                      <motion.span 
                        className="text-blue-400 text-sm"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SemesterPage;
