import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { yearsData } from '../data/yearsData';
import { Calendar } from 'lucide-react';

const YearDetailPage: React.FC = () => {
  const { yearId } = useParams<{ yearId: string }>();
  const year = yearsData.find(y => y.id.toString() === yearId);
  console.log(year?.planetImage);
  if (!year) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Year not found</h2>
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
        <div className="flex flex-col md:flex-row items-center mb-12 space-y-6 md:space-y-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-40 h-40 md:w-60 md:h-60 relative mr-8"
          >
            <motion.div 
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 100, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500"
            >
              <img 
                src={year.planetImage} 
                alt={year.planet} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              animate={{ 
                rotate: -360,
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute w-16 h-16 rounded-full bg-gray-800 border-2 border-yellow-400 top-0 right-0"
              style={{ 
                boxShadow: '0 0 15px rgba(255, 204, 0, 0.7)',
              }}
            >
              <div className="w-full h-full rounded-full bg-gray-700"></div>
            </motion.div>
          </motion.div>
          
          <div className="md:flex-1">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold text-white mb-2"
            >
              {year.name} 
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-blue-300 text-xl mb-6"
            >
              Select a semester to continue
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-300"
            >
              <p>Total subjects: {year.semesters.reduce((total, sem) => total + sem.subjects.length, 0)}</p>
              <p>Semesters: {year.semesters.length}</p>
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {year.semesters.map((semester, index) => (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Link to={`/year/${year.id}/semester/${semester.id}`}>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-8 rounded-xl shadow-lg ${
                    index === 0 
                      ? 'border-2 border-orange-500' 
                      : 'border-2 border-sky-500'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <Calendar className="h-8 w-8 mr-3 text-white opacity-80" />
                    <h2 className="text-2xl font-bold text-white">{semester.name}</h2>
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    {semester.subjects.length} subjects available
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {semester.subjects.slice(0, 4).map(subject => (
                      <div key={subject.id} className="bg-white bg-opacity-10 rounded px-3 py-2">
                        <p className="text-sm text-white truncate">{subject.name}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.span 
                      className="text-white text-sm"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      View all subjects →
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/years" className="text-blue-400 hover:underline">
            ← Back to all years
          </Link>
        </div>
      </div>
    </div>
  );
};

export default YearDetailPage;