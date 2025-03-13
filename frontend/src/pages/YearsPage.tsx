// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { yearsData } from '../data/yearsData';

// const YearsPage: React.FC = () => {
//   return (
//     <div className="min-h-screen py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-bold text-center text-white mb-12"
//         >
//           Select Your Academic Year
//         </motion.h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {yearsData.map((year, index) => (
//             <motion.div
//               key={year.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <Link to={`/year/${year.id}`}>
//                 <motion.div 
//                   whileHover={{ scale: 1.05, rotate: 1 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full"
//                 >
//                   <div className="relative h-48 overflow-hidden">
//                     <img 
//                       src={year.planetImage} 
//                       alt={year.planet}
//                       className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-70"></div>
//                     <div className="absolute bottom-4 left-4 text-white">
//                       <h3 className="text-xl font-bold"></h3>
//                     </div>
//                   </div>
                  
//                   <div className="p-6">
//                     <h2 className="text-2xl font-bold text-white mb-2">{year.name}</h2>
//                     <p className="text-blue-200 mb-4">
//                       {year.semesters.length} semesters • {year.semesters.reduce((total, sem) => total + sem.subjects.length, 0)} subjects
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-blue-300">
//                         {year.semesters[0].name} & {year.semesters[1].name}
//                       </span>
//                       <motion.span 
//                         className="text-white text-sm"
//                         animate={{ x: [0, 5, 0] }}
//                         transition={{ repeat: Infinity, duration: 1.5 }}
//                       >
//                         Explore →
//                       </motion.span>
//                     </div>
//                   </div>
//                 </motion.div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YearsPage;
// frontend/components/YearsPage.tsx
// frontend/components/YearsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { yearsData } from '../data/yearsData';

const YearsPage: React.FC = () => {
  // Use the static data – no fetching here
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          Select Your Academic Year
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {yearsData.map((year, index) => (
            <motion.div
              key={year.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/year/${year.id}`}>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={year.planetImage} 
                      alt={year.planet}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-70"></div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{year.name}</h2>
                    <p className="text-blue-200 mb-4">
                      {year.semesters.length} semesters • {year.semesters.reduce((total, sem) => total + sem.subjects.length, 0)} subjects
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-300">
                        {year.semesters[0].name} & {year.semesters[1].name}
                      </span>
                      <motion.span 
                        className="text-white text-sm"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        Explore →
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

export default YearsPage;
