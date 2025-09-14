"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import StarBackground from "../components/StarBackground";
import Sidebar from "../components/Sidebar";

import { FaBookOpen, FaGraduationCap, FaCalendarAlt } from "react-icons/fa"

const years = [
    {
        name: "1st Year",
        icon: <FaGraduationCap size={40} />,
        color: "from-purple-600 to-indigo-600",
        description: "Foundation courses and core subjects",
        link: "https://drive.google.com/drive/u/2/folders/1sk9dw0TU03-O-bNl25qnUNEHfjBMJpcN",
    },
    {
        name: "2nd Year",
        icon: <FaBookOpen size={40} />,
        color: "from-violet-600 to-purple-600",
        description: "Intermediate courses & specialization basics",
        link: "https://drive.google.com/file/d/your-2nd-year-link/view?usp=sharing",
    },
    {
        name: "3rd Year",
        icon: <FaCalendarAlt size={40} />,
        color: "from-indigo-600 to-blue-600",
        description: "Advanced technical & elective subjects",
        link: "https://drive.google.com/file/d/your-3rd-year-link/view?usp=sharing",
    },
    {
        name: "4th Year",
        icon: <FaGraduationCap size={40} />,
        color: "from-purple-500 to-pink-600",
        description: "Final year projects and specializations",
        link: "https://drive.google.com/file/d/your-4th-year-link/view?usp=sharing",
    },
]


export default function Syllabus() {
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main Content */}
            <div
                className={`flex-1 relative z-10 transition-all duration-300 overflow-auto 
          p-4 sm:p-6 ${isOpen ? "lg:ml-64" : "lg:ml-30"}`}
            >
                <StarBackground />

                <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-3 sm:space-y-4">
                        <h1 className="text-3xl sm:text-6xl font-bold">
                            Explore{" "}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Syllabus
                            </span>
                        </h1>
                        <p className="text-base sm:text-xl text-purple-200 max-w-2xl mx-auto">
                            Choose your year to view the syllabus and subjects covered
                        </p>
                    </div>

                    {/* Year Cards Grid with Flip Effect */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {years.map((year, index) => (
<div key={index} className="group perspective">
  <div className="relative w-full h-64 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 cursor-pointer">
    {/* Front Side */}
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-lg rotate-y-0 backface-hidden">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${year.color} shadow-md`}>
        {year.icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white">{year.name}</h3>
      <p className="text-sm text-purple-300">{year.description}</p>
    </div>

    {/* Back Side */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-slate-900 rounded-xl p-6 flex flex-col items-center justify-center rotate-y-180 backface-hidden">
      <h3 className="text-xl font-bold mb-2">{year.name}</h3>
      <p className="text-purple-300 text-sm mb-4">
        Click below to access the syllabus of this year
      </p>
      <a
        href={year.link}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold shadow-md transition"
      >
        Open Syllabus
      </a>
    </div>
  </div>
</div>

                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="text-center">
                        <div className="inline-block px-4 sm:px-6 py-2 bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-500/20">
                            <p className="text-purple-300 text-sm sm:text-base">
                                Learn, grow, and master your subjects year by year!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
