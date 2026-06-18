// src/components/FAQSection.tsx
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do children need any prior coding experience?",
    answer:
      "Absolutely not! This workshop is designed from the ground up for complete beginners. We start with the very basics and gradually build up to more exciting concepts. All you need is curiosity and a working internet connection.",
  },
  {
    question: "What hardware and software will my child need?",
    answer:
      "Just a laptop or desktop with a modern browser (Chrome or Firefox recommended) and a stable internet connection. All coding tools are browser-based — no downloads or installations are required. We'll provide clear setup instructions before Day 1.",
  },
  {
    question: "Will certificates be provided after the workshop?",
    answer:
      "Yes! Every child who completes the workshop and presents their Capstone Project receives a verified digital certificate of completion. It's a great addition to school portfolios and coding resumes.",
  },
  {
    question: "How are the live sessions structured?",
    answer:
      "Sessions run Monday to Friday, 4:00 PM – 6:00 PM IST, with weekend office hours for Q&A. Each session includes a short lesson, a hands-on activity, and time to ask questions. All sessions are also recorded for review.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "We offer a full refund if requested at least 7 days before the workshop start date (15 July 2026). After that, we can transfer your seat to the next batch. Please reach out to us at support@kidrove.com for any queries.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-bold tracking-widest uppercase text-violet-500">FAQs</span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">Got Questions?</h2>
          <p className="mt-3 text-gray-500">
            We've got answers. If yours isn't here, drop us a line anytime.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-violet-300 bg-white shadow-md shadow-violet-100"
                    : "border-gray-200 bg-white hover:border-violet-200"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-800 text-base sm:text-lg leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200 ${
                      isOpen
                        ? "bg-violet-600 text-white rotate-45"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-60 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
