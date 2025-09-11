"use client";
import { useEffect, useState } from "react";

export const UpcomingDeadlines = () => {
  const [assignments, setAssignments] = useState([]);

  // Load from localStorage (same as Assignments)
  useEffect(() => {
    const saved = localStorage.getItem("assignments");
    if (saved) setAssignments(JSON.parse(saved));
  }, []);

  // Filter only those due in the next 7 days
  const upcoming = assignments.filter((a) => {
    const daysLeft = (new Date(a.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return daysLeft >= 0 && daysLeft <= 7;
  });

  return (
    <div className="space-y-2">
      <h4 className="font-bold">Upcoming Deadlines</h4>
      {upcoming.length === 0 ? (
        <p className="text-gray-300">No deadlines this week 🎉</p>
      ) : (
        <ul className="space-y-2">
          {upcoming.map((a) => (
            <li key={a.id} className="p-2 bg-white/20 rounded">
              <span className="font-semibold">{a.title}</span>  
              <span className="text-sm text-gray-300 ml-2">
                ({new Date(a.dueDate).toDateString()})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
