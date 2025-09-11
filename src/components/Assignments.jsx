"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaPlus, FaCalendarPlus, FaTrash } from "react-icons/fa"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}

export function Assignments() {
  const [assignments, setAssignments] = useState([])
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")

  // Load saved assignments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("assignments")
    if (saved) setAssignments(JSON.parse(saved))
  }, [])

  // Save to localStorage whenever assignments change
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments))
  }, [assignments])

  const addAssignment = () => {
    if (!title.trim() || !dueDate.trim()) return

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      description,
      dueDate,
      status: "pending",
    }

    setAssignments([...assignments, newAssignment])
    setTitle("")
    setSubject("")
    setDescription("")
    setDueDate("")
  }

  const removeAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id))
  }

  const addToGoogleCalendar = (item) => {
    const start = item.dueDate + "T09:00:00"
    const end = item.dueDate + "T10:00:00"
    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"
    const url = `${baseUrl}&text=${encodeURIComponent(
      item.title,
    )}&dates=${start.replace(/-|:/g, "")}/${end.replace(/-|:/g, "")}&details=${encodeURIComponent(
      item.description || "",
    )}`
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
          Assignment Tracker
        </h1>
        <p className="text-purple-200">Stay organized and never miss a deadline</p>
      </div>

      {/* Form to add assignment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800/40 to-violet-700/40 backdrop-blur-lg border border-purple-400/20 p-6 rounded-2xl shadow-2xl space-y-4"
      >
        <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          Add New Assignment
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-900/50 to-violet-800/50 border border-purple-400/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-900/50 to-violet-800/50 border border-purple-400/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
        </div>

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-900/50 to-violet-800/50 border border-purple-400/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
        />

        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-purple-200 text-sm mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-900/50 to-violet-800/50 border border-purple-400/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
          </div>
          <button
            onClick={addAssignment}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
          >
            <FaPlus className="text-sm" /> Add Assignment
          </button>
        </div>
      </motion.div>

      {/* Assignment list */}
      <div className="space-y-6">
        <h3 className="font-bold text-white text-2xl flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
          Current Assignments
          <span className="text-sm font-normal text-purple-300">({assignments.length})</span>
        </h3>

        {assignments.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-violet-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlus className="text-purple-400 text-xl" />
            </div>
            <p className="text-purple-300 text-lg">No assignments yet</p>
            <p className="text-purple-400 text-sm">Add your first assignment above to get started</p>
          </motion.div>
        )}

        <div className="grid gap-4">
          {assignments.map((assignment, index) => {
            const daysLeft = (new Date(assignment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)

            const isUrgent = daysLeft <= 2
            const isOverdue = daysLeft < 0

            return (
              <motion.div
                key={assignment.id}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={index}
                className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                  isOverdue
                    ? "bg-gradient-to-r from-red-900/60 to-pink-800/60 border border-red-400/30"
                    : isUrgent
                      ? "bg-gradient-to-r from-orange-900/60 to-red-800/60 border border-orange-400/30"
                      : "bg-gradient-to-r from-purple-800/60 to-violet-700/60 border border-purple-400/20"
                }`}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                <div className="relative p-6 flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 ${
                          isOverdue ? "bg-red-400" : isUrgent ? "bg-orange-400" : "bg-purple-400"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg leading-tight">{assignment.title}</h4>
                        {assignment.subject && (
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600/50 to-violet-600/50 text-purple-200 text-xs rounded-full mt-2">
                            {assignment.subject}
                          </span>
                        )}
                      </div>
                    </div>

                    {assignment.description && (
                      <p className="text-purple-200 text-sm leading-relaxed ml-6">{assignment.description}</p>
                    )}

                    <div className="ml-6 space-y-1">
                      <p className="text-purple-300 text-sm flex items-center gap-2">
                        <span>📅</span>
                        Due:{" "}
                        {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>

                      {isOverdue ? (
                        <p className="text-red-300 font-semibold text-sm flex items-center gap-2">
                          <span>⚠️</span>
                          Overdue by {Math.abs(Math.ceil(daysLeft))} day
                          {Math.abs(Math.ceil(daysLeft)) !== 1 ? "s" : ""}!
                        </p>
                      ) : isUrgent ? (
                        <p className="text-orange-300 font-semibold text-sm flex items-center gap-2">
                          <span>⏰</span>
                          Due in {Math.ceil(daysLeft)} day{Math.ceil(daysLeft) !== 1 ? "s" : ""}!
                        </p>
                      ) : (
                        <p className="text-purple-400 text-sm">
                          {Math.ceil(daysLeft)} day{Math.ceil(daysLeft) !== 1 ? "s" : ""} remaining
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 ml-4">
                    <button
                      onClick={() => addToGoogleCalendar(assignment)}
                      className="p-3 bg-gradient-to-r from-purple-600/50 to-violet-600/50 hover:from-purple-500/60 hover:to-violet-500/60 text-white rounded-xl transition-all duration-200 hover:scale-110 shadow-lg"
                      title="Add to Google Calendar"
                    >
                      <FaCalendarPlus className="text-sm" />
                    </button>
                    <button
                      onClick={() => removeAssignment(assignment.id)}
                      className="p-3 bg-gradient-to-r from-red-600/50 to-pink-600/50 hover:from-red-500/60 hover:to-pink-500/60 text-white rounded-xl transition-all duration-200 hover:scale-110 shadow-lg"
                      title="Remove Assignment"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
