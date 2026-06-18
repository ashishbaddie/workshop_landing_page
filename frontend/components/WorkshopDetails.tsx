// src/components/WorkshopDetails.tsx
import React from "react";

interface DetailCard {
  icon: string;
  label: string;
  value: string;
  accent: string;
}

const details: DetailCard[] = [
  { icon: "🧒", label: "Age Group",   value: "8 – 14 Years",  accent: "from-cyan-400 to-sky-500" },
  { icon: "📅", label: "Duration",    value: "4 Weeks",        accent: "from-violet-400 to-purple-500" },
  { icon: "💻", label: "Mode",        value: "100% Online",    accent: "from-fuchsia-400 to-pink-500" },
  { icon: "💰", label: "Workshop Fee",value: "₹ 2,999",        accent: "from-amber-400 to-orange-500" },
  { icon: "🗓️", label: "Starts On",   value: "15 July 2026",  accent: "from-emerald-400 to-teal-500" },
];

const WorkshopDetails: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-sm font-bold tracking-widest uppercase text-violet-500">At a Glance</span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">
            Workshop Details
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Everything parents and kids need to know before joining.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {details.map(({ icon, label, value, accent }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center bg-gray-50 hover:bg-white border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 rounded-2xl p-6"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-2xl shadow-md mb-4`}>
                {icon}
              </div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
              <p className="text-base font-bold text-gray-800 leading-tight">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopDetails;
