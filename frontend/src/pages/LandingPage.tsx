
"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Rocket, Github, Linkedin, Mail, Users, Code, ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion } from "framer-motion"
import AerospaceBackground from "../components/AerospaceBackground"

interface TeamMember {
  name: string
  role: string
  image: string
  github?: string
  linkedin?: string
  email?: string
}

const developers: TeamMember[] = [
  {
    name: "Rajesh Yadav",
    role: "Lead Developer",
    image:
      "",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    email: "",
  },
  
]

const contentTeam: TeamMember[] = [
  {
    name: "Manish Kumar",
    role: "Content Team",
    image:
      "",
    linkedin: "https://linkedin.com/in/",
    email: "",
  },
  {
    name: "Prince Kumar",
    role: "Content Team",
    image:
      "",
    linkedin: "https://linkedin.com/in/",
    email: "",
  },
  
]

interface TeamDialogProps {
  isOpen: boolean
  onClose: () => void
  team: TeamMember[]
  title: string
}

const TeamDialog: React.FC<TeamDialogProps> = ({ isOpen, onClose, team, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  if (!isOpen) return null

  // Make sure we have a valid team array and it's not empty
  if (!team || team.length === 0) {
    console.error("Team array is empty or undefined")
    return null
  }

  const member = team[currentIndex]

  // Make sure we have a valid member
  if (!member) {
    console.error("Current team member is undefined")
    return null
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex >= team.length) nextIndex = 0
      if (nextIndex < 0) nextIndex = team.length - 1
      return nextIndex
    })
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-xl p-6 max-w-2xl w-full relative"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} / {team.length}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className=" mt-2 px-2  py-2 bg-gradient-to-r from-blue-50 to-indigo-600 text-white rounded-lg text-sm font-sm hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-1"
            >
              <X className="h-4 w-10" />
              <span></span>
            </motion.button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden backdrop-blur-sm">
            <div className="relative aspect-w-16 aspect-h-9">
              <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-blue-300 text-lg mb-6">{member.role}</p>
              <div className="flex space-x-4">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-white transition-colors">
                    <Mail className="h-6 w-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={() => paginate(-1)}
            className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 ml-2 text-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={() => paginate(1)}
            className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 mr-2 text-white transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="ml-100 mt-6 px-4  py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-1"
        >
          <X className="h-3 w-3" />
          <span>Close</span>
        </motion.button> */}
      </div>
    </div>
  )
}

const LandingPage: React.FC = () => {
  const [showDevelopers, setShowDevelopers] = useState(false)
  const [showContentTeam, setShowContentTeam] = useState(false)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-indigo-900 via-blue-900 to-black z-[20]">
      
      <AerospaceBackground  />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-[10]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
        }}
        
      ></div>

      <div className="container mx-auto px-4 py-16 flex-1 flex flex-col justify-center items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Rocket className="h-20 w-20 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Aerospace Engineering</h1>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">IIEST SHIBPUR</h2>
          <h3 className="text-2xl md:text-3xl font-light text-blue-200 mb-8">Study Materials Portal</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Access comprehensive study materials for all four years of Aerospace Engineering curriculum. Everything you
            need for your academic journey, organized by year and semester.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
        >
          <Link to="/auth">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg shadow-lg flex items-center justify-center text-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Login / Signup
            </motion.button> */}
          </Link>

          <Link to="/years">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg flex items-center justify-center text-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Study Now
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: [100, 0, 20, 0], opacity: 1 }}
        transition={{
          duration: 2,
          times: [0, 0.6, 0.8, 1],
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 10,
        }}
        className="absolute bottom-10 right-10 z-10 hidden md:block"
      >
        <Rocket className="h-16 w-16 text-white transform -rotate-45" />
        <motion.div
          animate={{
            height: [0, 40, 20, 30, 0],
            opacity: [0, 0.8, 0.6, 0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 10,
          }}
          className="absolute bottom-0 left-1/2 w-2 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full"
          style={{ transformOrigin: "bottom", transform: "translateX(-50%) rotate(-45deg)" }}
        />
      </motion.div>

      <footer className="w-full pb-16 pt-2 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10  bg-opacity-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowContentTeam(true)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <Users className="h-5 w-5" />
          <span>Content Team</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDevelopers(true)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <Code className="h-5 w-5" />
          <span>Meet the Developers</span>
        </motion.button>
        <p className="text-gray-400 text-center">© 2025 Department of Aerospace Engineering</p>
      </footer>

      {/* Render the TeamDialog components conditionally */}
      {showDevelopers && (
        <TeamDialog
          isOpen={showDevelopers}
          onClose={() => setShowDevelopers(false)}
          team={developers}
          title="Development Team"
        />
      )}

      {showContentTeam && (
        <TeamDialog
          isOpen={showContentTeam}
          onClose={() => setShowContentTeam(false)}
          team={contentTeam}
          title="Content Team"
        />
      )}
    </div>
  )
}

export default LandingPage


