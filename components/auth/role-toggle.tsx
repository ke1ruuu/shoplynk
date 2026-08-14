"use client";

import React from "react";
import { GraduationCap, Briefcase } from "lucide-react";

export type Role = "student" | "faculty";

const OPTIONS: {
  value: Role;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "student", label: "Student", icon: GraduationCap },
  { value: "faculty", label: "Faculty", icon: Briefcase },
];

interface RoleToggleProps {
  value: Role;
  onChange: (value: Role) => void;
  name?: string;
}

/**
 * Student / Faculty segmented control. School role drives the verification
 * badge a seller earns, so it's part of every account from the start.
 */
export function RoleToggle({ value, onChange, name = "role" }: RoleToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Your role at school"
      className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-paper-deep/60 p-1"
    >
      {OPTIONS.map(({ value: v, label, icon: Icon }) => {
        const selected = value === v;
        return (
          <label
            key={v}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-kita-green ${
              selected
                ? "bg-surface text-kita-green shadow-flyer"
                : "text-muted hover:text-ink"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={v}
              checked={selected}
              onChange={() => onChange(v)}
              className="sr-only"
            />
            <Icon className="h-4 w-4" />
            {label}
          </label>
        );
      })}
    </div>
  );
}
