// src/components/HeroSection.tsx
import React from "react";

interface HeroSectionProps {
  onEnrollClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnrollClick }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-900 to-purple-900">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-fuchsia-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Floating emoji decorations */}
      <span className="absolute top-24 right-[8%] text-5xl animate-bounce hidden md:block select-none" style={{ animationDuration: "2.8s" }}>🤖</span>
      <span className="absolute top-40 left-[6%] text-4xl animate-bounce hidden md:block select-none" style={{ animationDuration: "3.4s" }}>⚡</span>
      <span className="absolute bottom-32 left-[12%] text-4xl animate-bounce hidden md:block select-none" style={{ animationDuration: "2.2s" }}>💡</span>
      <span className="absolute bottom-24 right-[14%] text-3xl animate-bounce hidden md:block select-none" style={{ animationDuration: "3.0s" }}>🚀</span>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        {/* Eyebrow label */}
        <span className="inline-block bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-sm font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8">
          Summer 2026 · Online · Ages 8–14
        </span>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Where Kids Build{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
            Tomorrow's Technology
          </span>{" "}
          Today
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          The <strong className="text-white">AI & Robotics Summer Workshop</strong> gives curious minds aged
          8–14 a hands-on adventure in coding, robotics, and artificial intelligence — no experience needed.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEnrollClick}
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/50"
          >
            Enroll Now — ₹2,999
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
          <a
            href="#details"
            className="text-indigo-300 hover:text-white underline underline-offset-4 font-medium transition-colors duration-150"
          >
            See what's included ↓
          </a>
        </div>

        {/* Social proof chips */}
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {[
            { icon: "🎓", text: "Certificate of Completion" },
            { icon: "👩‍🏫", text: "Expert Instructors" },
            { icon: "🌐", text: "100% Online" },
            { icon: "🧒", text: "Beginner Friendly" },
          ].map(({ icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20"
            >
              {icon} {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
