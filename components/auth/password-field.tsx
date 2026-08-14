"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordFieldProps
  extends Omit<React.ComponentProps<typeof Input>, "type"> {
  invalid?: boolean;
}

/**
 * Password input with a show/hide toggle. Reuses the project Input primitive,
 * sized up to a comfortable touch target for the full-page auth form.
 */
export function PasswordField({
  invalid,
  className,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        className={`h-11 rounded-lg pr-11 text-base ${className ?? ""}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-pressed={visible}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-muted transition-colors hover:text-ink focus-visible:text-kita-green"
      >
        {visible ? (
          <EyeOff className="h-4.5 w-4.5" />
        ) : (
          <Eye className="h-4.5 w-4.5" />
        )}
      </button>
    </div>
  );
}
