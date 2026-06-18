// src/App.tsx
import React, { useRef } from "react";
import HeroSection from "../components/HeroSection";
import WorkshopDetails from "../components/WorkshopDetails";
import LearningOutcomes from "../components/LearningOutcomes";
import FAQSection from "../components/FAQSection";
import RegistrationForm from "../components/RegistrationForm";

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar: React.FC<{ onEnrollClick: () => void }> = ({ onEnrollClick }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-indigo-950/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      {/* Logo — clicking returns to top of page */}
      <a href="#home" className="flex items-center gap-2 group">
        <span className="text-2xl">🤖</span>
        <span className="text-white font-extrabold text-lg tracking-tight group-hover:text-cyan-300 transition-colors">
          Kid<span className="text-cyan-400">rove</span>
        </span>
      </a>

      {/* Nav links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-6 text-indigo-300 text-sm font-medium">
        <a href="#details" className="hover:text-white transition-colors">Details</a>
        <a href="#outcomes" className="hover:text-white transition-colors">Curriculum</a>
        <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
      </div>

      {/* CTA */}
      <button
        onClick={onEnrollClick}
        className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white text-sm font-bold px-5 py-2 rounded-xl hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
      >
        Enroll Now
      </button>
    </div>
  </nav>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer className="bg-indigo-950 text-indigo-400 text-sm py-10 px-6 text-center">
    <div className="max-w-4xl mx-auto">
      <a href="#home" className="inline-flex items-center justify-center gap-2 mb-3 group">
        <span className="text-xl">🤖</span>
        <span className="text-white font-extrabold text-base group-hover:text-cyan-300 transition-colors">
          Kid<span className="text-cyan-400">rove</span>
        </span>
      </a>
      <p className="mb-2">AI & Robotics Summer Workshop · 15 July 2026 · Online</p>
      <p>
        Questions?{" "}
        <a href="mailto:support@kidrove.com" className="text-cyan-400 hover:underline">
          support@kidrove.com
        </a>
      </p>
      <p className="mt-4 text-indigo-600 text-xs">
        © {new Date().getFullYear()} Kidrove. All rights reserved.
      </p>
    </div>
  </footer>
);

// ── App ───────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const registerRef = useRef<HTMLDivElement>(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="font-sans antialiased">
      {/* Fixed Navbar */}
      <Navbar onEnrollClick={scrollToRegister} />

      {/* Offset for fixed nav */}
      <div id="home" className="pt-16">
        {/* 1. Hero */}
        <HeroSection onEnrollClick={scrollToRegister} />

        {/* 2. Workshop Details */}
        <div id="details">
          <WorkshopDetails />
        </div>

        {/* 3. Learning Outcomes */}
        <div id="outcomes">
          <LearningOutcomes />
        </div>

        {/* 4. FAQ */}
        <div id="faq">
          <FAQSection />
        </div>

        {/* 5. Registration Form */}
        <div ref={registerRef}>
          <RegistrationForm />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
