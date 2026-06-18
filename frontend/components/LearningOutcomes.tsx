// src/components/LearningOutcomes.tsx
import React from "react";

interface Outcome {
  week: string;
  emoji: string;
  title: string;
  description: string;
  color: string;
  bg: string;
}

const outcomes: Outcome[] = [
  {
    week: "Week 1",
    emoji: "🤖",
    title: "Introduction to Robotics",
    description:
      "Explore how robots work and simulate building basic mechanical structures. Understand sensors, actuators, and how the physical world meets code.",
    color: "text-cyan-600",
    bg: "bg-cyan-50 border-cyan-200",
  },
  {
    week: "Week 1–2",
    emoji: "🐍",
    title: "Coding Fundamentals",
    description:
      "Learn Python basics from scratch — variables, loops, conditionals, and functions. Write your first programs through games and puzzles.",
    color: "text-violet-600",
    bg: "bg-violet-50 border-violet-200",
  },
  {
    week: "Week 2–3",
    emoji: "🧠",
    title: "Building AI Models",
    description:
      "Demystify machine learning! Train simple AI models that can classify images and make predictions — no PhD required.",
    color: "text-fuchsia-600",
    bg: "bg-fuchsia-50 border-fuchsia-200",
  },
  {
    week: "Week 3",
    emoji: "🔢",
    title: "Logic & Problem Solving",
    description:
      "Sharpen computational thinking through algorithmic challenges, flowcharts, and design patterns that make programs smart and efficient.",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
  },
  {
    week: "Week 4",
    emoji: "🏆",
    title: "Capstone Project",
    description:
      "Design and present your own mini AI or robotics project to a panel. Get real feedback, earn your certificate, and showcase your creation.",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
  },
];

const LearningOutcomes: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-950 via-violet-900 to-purple-900 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-bold tracking-widest uppercase text-cyan-400">Curriculum</span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-white">
            What Your Child Will Learn
          </h2>
          <p className="mt-3 text-indigo-300 max-w-xl mx-auto">
            Four weeks of structured, project-driven learning designed to spark a lifelong passion for technology.
          </p>
        </div>

        {/* Outcome cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((item) => (
            <div
              key={item.title}
              className={`group relative rounded-3xl border p-7 hover:scale-[1.02] hover:shadow-xl transition-all duration-200 bg-white ${item.bg}`}
            >
              {/* Week badge */}
              <span className={`text-xs font-bold uppercase tracking-wider ${item.color} mb-3 block`}>
                {item.week}
              </span>
              {/* Emoji */}
              <div className="text-4xl mb-3">{item.emoji}</div>
              {/* Title */}
              <h3 className={`text-lg font-bold ${item.color} mb-2`}>{item.title}</h3>
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}

          {/* Bonus card */}
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur p-7 flex flex-col justify-center items-center text-center hover:bg-white/15 transition-all duration-200">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="text-lg font-bold text-white mb-2">Certified & Career-Ready</h3>
            <p className="text-indigo-300 text-sm leading-relaxed">
              Every participant receives a digital certificate of completion. A foundation they'll be proud of.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
