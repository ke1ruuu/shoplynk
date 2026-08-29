"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  isFaculty?: boolean;
  avatarUrl: string;
  tilt: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Project Kita helped me turn my hobby into a small business. I've met so many amazing people in our school!",
    author: "Jillian Reyes",
    role: "Student Seller",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    tilt: "-rotate-2",
  },
  {
    id: "2",
    quote:
      "It's so easy to find what I need while supporting my fellow students and faculty. Love this platform!",
    author: "Andre Castillo",
    role: "Student Buyer",
    avatarUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    tilt: "rotate-1",
  },
  {
    id: "3",
    quote:
      "A great initiative that empowers our students and encourages entrepreneurship.",
    author: "Prof. Anna Lim",
    role: "Faculty Seller",
    isFaculty: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    tilt: "-rotate-1",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-corkboard">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span className="eyebrow text-kita-green">Loved on campus</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink">
            Pinned by the community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-10">
          {TESTIMONIALS.map((t, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-pressed={isActive}
                className={`relative text-left bg-surface rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${t.tilt} ${
                  isActive
                    ? "border-kita-green/40 shadow-flyer-lg -translate-y-1.5 !rotate-0"
                    : "border-line shadow-flyer hover:-translate-y-1 hover:!rotate-0"
                }`}
              >
                <span
                  className="pin left-1/2 -translate-x-1/2 -top-1.5"
                  style={t.isFaculty ? undefined : ({ "--pin-color": "#D92323" } as React.CSSProperties)}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-4">
                  <Quote className="w-7 h-7 text-spark fill-spark" aria-hidden="true" />
                  <p className="text-[15px] text-ink leading-relaxed font-medium">
                    {t.quote}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-4 border-t border-dashed border-line">
                  <span className="relative w-10 h-10 rounded-full overflow-hidden border border-line flex-shrink-0 bg-paper-deep">
                    <Image src={t.avatarUrl} alt={t.author} fill className="object-cover" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold text-ink">{t.author}</span>
                    <span className={`eyebrow text-[0.6rem] mt-0.5 ${t.isFaculty ? "text-spark-ink" : "text-kita-green"}`}>
                      {t.role}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === idx ? "bg-kita-green w-6" : "bg-line-strong w-2.5 hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
