"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// ------------------------------------------------------------
// ZOD SCHEMAS
// ------------------------------------------------------------

export const SignupSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name (at least 2 characters)."),
  email: z.string().trim().email("That doesn't look like a valid email."),
  password: z.string().min(8, "Use a password with at least 8 characters."),
  agreed: z.boolean().refine((v) => v === true, {
    message: "Please accept the terms to continue.",
  }),
  accountType: z.enum(["buyer", "seller"]).default("buyer"),
});

export const LoginSchema = z.object({
  email: z.string().trim().email("Enter your school email."),
  password: z.string().min(1, "Enter your password."),
  next: z.string().optional(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter your school email."),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

// ------------------------------------------------------------
// ACTION TYPES
// ------------------------------------------------------------

export type AuthFormState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

// ------------------------------------------------------------
// SERVER ACTIONS
// ------------------------------------------------------------

/**
 * Sign up action — calls Supabase Auth signUp with metadata.
 * Triggers handle_new_user DB function to provision profile + cart.
 */
export async function signupAction(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    agreed: formData.get("agreed") === "on" || formData.get("agreed") === "true",
    accountType: formData.get("accountType") || "buyer",
  };

  const parsed = SignupSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;
  const supabase = await createClient();

  const origin = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const redirectTo = origin
    ? `${origin}/auth/confirm`
    : undefined;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    return {
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Check your email to confirm your account.",
  };
}

/**
 * Log in action — calls Supabase Auth signInWithPassword.
 */
export async function loginAction(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") || "/protected",
  };

  const parsed = LoginSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password, next } = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      message: "Invalid email or password. Please try again.",
    };
  }

  redirect(next || "/protected");
}

/**
 * Log out action — signs out and redirects to /login.
 */
export async function logoutAction(): Promise<never> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/**
 * Forgot password action — sends password reset link.
 */
export async function forgotPasswordAction(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const rawData = {
    email: formData.get("email"),
  };

  const parsed = ForgotPasswordSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email } = parsed.data;
  const supabase = await createClient();

  const origin = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const redirectTo = origin ? `${origin}/auth/confirm?type=recovery` : undefined;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    return {
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Password reset link sent! Check your inbox.",
  };
}

/**
 * Reset password action — updates user password once authenticated via recovery link.
 */
export async function resetPasswordAction(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const rawData = {
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = ResetPasswordSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { password } = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return {
      message: error.message,
    };
  }

  redirect("/protected");
}
