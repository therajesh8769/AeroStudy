import { Year } from '../types';
import { fetchMaterials } from "./fetchMaterial";



export const yearsData: Year[] = [
  {
    id: 1,
    name: "First Year",
    planet: "",
    planetImage: "/1st.jpg",
    semesters: [
      {
        id: "1-odd",
        name: "Odd Semester(G4-G8)",
        subjects: [
          
          { id: "1-1", name: "Mathematics I", code: "MA1101", materials: []},
          { id: "1-2", name: "Chemistry", code: "CH1102", materials: []  },
          { id: "1-3", name: "Intro to Computing", code: "CS1103", materials: [] },
          { id: "1-4", name: "Mechanics", code: "AE1104", materials: [] },
          { id: "1-5", name: "English", code: "HM1105", materials: [] },
          { id: "1-6", name: "Chemistry Lab", code: "CH1106", materials: [] },
          { id: "1-7", name: "Computer Lab", code: "CS1107", materials: [] },
          { id: "1-8", name: "Drawing", code: "AM1108", materials: [] }
        ]
        
      },
      {
        id: "1-even",
        name: "Even Semester",
        subjects: [
          { id: "1-9", name: "Mathematics II", code: "MA1109", materials: [] },
          { id: "1-10", name: "Physics", code: "PH1110", materials: [] },
         
          { id: "1-11", name: "Basic Electrical Engineering", code: "EE1111", materials: [] },
          { id: "1-12", name: "Ecology & Environment", code: "CE1112", materials: [] },
          { id: "1-13", name: "Sociology & Professional Ethics", code: "HM1113", materials: [] },
          { id: "1-14", name: " Physics Lab", code: "PH1114", materials: [] },
          { id: "1-15", name: "Electrical Lab", code: "EE1115", materials: [] },
          { id: "1-16", name: "Workshop", code: "AM1116", materials: [] }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Second Year",
    planet: "",
    planetImage: "/2nd.jpg",
    semesters: [
      {
        id: "2-odd",
        name: "Odd Semester",
        subjects: [
          { id: "2-1", name: "Engineering Mathematics III", code: "MA2101", materials: [] },
          { id: "2-2", name: "Fluid Dynamics", code: "AE2101", materials: [] },
          { id: "2-3", name: "Strength of Materials", code: "AE2102", materials: [] },
          { id: "2-4", name: "Dynamics", code: "AE2103", materials: [] },
          { id: "2-5", name: "Basic Flight Mechanics", code: "AE2104", materials: [] },
          { id: "2-6", name: "Fluid Dynamics Laboratory", code: "AE2171", materials: [] },
          { id: "2-7", name: "Strength of Materials Laboratory", code: "AM2171", materials: [] },
          { id: "2-8", name: "Machine Drawing", code: "AM2172", materials: [] },
          { id: "2-9", name: "Seminar/Mini Project -I", code: "AE2191", materials: [] }
        ]
      },
      {
        id: "2-even",
        name: "Even Semester",
        subjects: [
          { id: "2-10", name: "Fundamentals of Viscous Flow", code: "AE2201", materials: [] },
          { id: "2-11", name: "Advanced Strength of Materials", code: "AE2202", materials: [] },
          { id: "2-12", name: "Theory of Vibration", code: "AE2203", materials: [] },
          { id: "2-13", name: "Engineering Thermodynamics", code: "AE2204", materials: [] },
          { id: "2-14", name: "Aircraft Performance", code: "AE2205", materials: [] },
          { id: "2-15", name: "Computational Solid Mechanics Laboratory", code: "AE2271", materials: [] },
          { id: "2-16", name: "CAD Laboratory", code: "AE2273", materials: [] },
          { id: "2-17", name: "Mathematical Modeling and Simulation Laboratory", code: "AE2274", materials: [] }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Third Year",
    planet: "",
    planetImage: "/3rd.jpg",
    semesters: [
      {
        id: "3-odd",
        name: "Odd Semester",
        subjects: [
          { id: "3-1", name: "Low Speed Aerodynamics", code: "AE3101", materials: [] },
          { id: "3-2", name: "Aircraft Stability and Control", code: "AE3102", materials: [] },
          { id: "3-3", name: "Numerical Method and Computational Tools", code: "AE3103", materials: [] },
          { id: "3-4", name: "Aircraft Dynamics and Navigation", code: "AE3104", materials: [] },
          { id: "3-5", name: "Composites and Structures", code: "AE3105", materials: [] },
          { id: "3-6", name: "Low Speed Aerodynamics Laboratory", code: "AE3171", materials: [] },
          { id: "3-7", name: "Aircraft Stability & Control Laboratory", code: "AE3172", materials: [] },
          { id: "3-8", name: "Numerical Method and Computational Tools Laboratory", code: "AE3173", materials: [] }
        ]
      },
      {
        id: "3-even",
        name: "Even Semester",
        subjects: [
          { id: "3-9", name: "High Speed Aerodynamics", code: "AE3201", materials: [] },
          { id: "3-10", name: "Theory of Propulsion", code: "AE3202", materials: [] },
          { id: "3-11", name: "Aerospace Structures", code: "AE3203", materials: [] },
          { id: "3-12", name: "Introduction to FEM and Applications", code: "AE3204", materials: [] },
          { id: "3-13", name: "Orbital Mechanics", code: "AE3205", materials: [] },
          { id: "3-14", name: "High Speed Aerodynamics Laboratory", code: "AE3271", materials: [] },
          { id: "3-15", name: "Propulsion Laboratory", code: "AE3272", materials: [] },
          { id: "3-16", name: "Aircraft Design and Flight Training", code: "AE3273", materials: [] }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Fourth Year",
    planet: "",
    planetImage: "/4th.jpg",
    semesters: [
      {
        id: "4-odd",
        name: "Odd Semester",
        subjects: [
          { id: "4-1", name: "Computational Fluid Dynamics", code: "AE4101", materials: [] },
          { id: "4-2", name: "Jet and Rocket Propulsion", code: "AE4102", materials: [] },
          { id: "4-3", name: "Core Elective–I(LIST-I)", code: "CE1", materials: [] },
          { id: "4-4", name: "Open Elective – I (HSS-II)", code: "OE1", materials: [] },
          { id: "4-5", name: "Aerospace Structures Laboratory", code: "AE4171", materials: [] },
          { id: "4-6", name: "Aircraft Design and Manufacturing Techniques", code: "AE4172", materials: [] },
          { id: "4-7", name: "B. Tech Project/1", code: "AE4191", materials: [] },
          { id: "4-8", name: "Internship from 6th Sem(Evaluation)", code: "AE4192", materials: [] }
        ]
      },
      {
        id: "4-even",
        name: "Even Semester",
        subjects: [
          { id: "4-9", name: "Turbulent Flow", code: "AE4201", materials: [] },
          { id: "4-10", name: "Core Elective – II(LIST-II)", code: "CE2", materials: [] },
          { id: "4-11", name: "Open Elective II(LIST-III)", code: "OE2", materials: [] },
          { id: "4-12", name: "B. Tech Project /2", code: "AE44291", materials: [] },
          { id: "4-13", name: "Seminar", code: "AE4292", materials: [] },
          { id: "4-14", name: "Comprehensive Viva", code: "AE4293", materials: [] },
          
        ]
      }
    ]
  },
  {
    id: 5,
    name: "GATE",
    planet: "",
    planetImage: "/gate.jpg",
    semesters: [
      {
        id: "Notes",
        name: "Notes",
        subjects: [
          { id: "gate-notes1", name: "Aerodynamics", code: "AEN1", materials: [] },
          { id: "gate-notes2", name: "Fluid Dynamics", code: "FMN2", materials: [] },
          { id: "gate-notes3", name: "Gas Dynamics", code: "GDN3", materials: [] },
          { id: "gate-notes4", name: "Aptitude", code: "GAN4", materials: [] },
          { id: "gate-notes5", name: "Jet Propulsion", code: "JPN5", materials: [] },
          { id: "gate-notes6", name: "Mathematics", code: "MAN6", materials: [] },
          { id: "gate-notes7", name: "Rocket Propulsion", code: "RPN7", materials: [] },
          { id: "gate-notes8", name: "Strength of Materials", code: "SOMN8", materials: [] },
          { id: "gate-notes9", name: "Thermodynamic", code: " thermo9", materials: [] }
        
        ]
      },
      {
        id: "Assignments",
        name: "Assignments",
        subjects: [
          { id: "gate-assign1", name: "Fluid Mechanics", code: 'FM4', materials: [] },
          { id: "gate-assign2", name: "Mathematics", code: 'Math8', materials: [] },
          { id: "gate-assign3", name: "General Aptitude", code: 'GA7', materials: [] },
          { id: "gate-assign4", name: "Thermodynamics", code: 'Thermo10', materials: [] },
          { id: "gate-assign5", name: "Flight Mechanics", code: 'FLM5', materials: [] },
         
          { id: "gate-assign7", name: "Gas Dynamics", code: 'GD6', materials: [] },
          { id: "gate-assign8", name: "Aerodynamics", code: 'AE2', materials: [] },
          { id: "gate-assign9", name: "Space Dynamics", code: 'SD9', materials: [] },
          { id: "gate-assign10", name: "Vibration", code: 'Vib11', materials: [] },
          { id: "gate-assign11", name: "Engineering Mechanics", code: 'EM3', materials: [] }
        ]
        
      }
    ]
  }
];
// export const fetchAllMaterials = async (years: Year[]): Promise<Year[]> => {
//   for (const year of years) {
//     for (const semester of year.semesters) {
//       for (const subject of semester.subjects) {
//         if (subject.code) {
//           try {
//             subject.materials = await fetchMaterials(subject.code);
//           } catch (error) {
//             console.error(`Error fetching materials for ${subject.name}:`, error);
//           }
//         }
//       }
//     }
//   }
//   return years;
// };