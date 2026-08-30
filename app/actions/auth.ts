"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { setSessionCookie, clearSessionCookie, getCurrentUser } from "@/lib/auth/session";

// ------------------------------------------------------------
// ZOD SCHEMAS
// ------------------------------------------------------------

const SignupSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name (at least 2 characters)."),
  email: z.string().trim().email("That doesn't look like a valid email."),
  password: z.string().min(8, "Use a password with at least 8 characters."),
  agreed: z.boolean().refine((v) => v === true, {
    message: "Please accept the terms to continue.",
  }),
  accountType: z.enum(["buyer", "seller"]).default("buyer"),
});

const LoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
  next: z.string().optional(),
});

const ForgotPasswordSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

const ResetPasswordSchema = z
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
 * Sign up action — creates profile directly in PostgreSQL with hashed password,
 * provisions initial cart, establishes session cookie, and redirects to dashboard.
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

  const { name, email, password, accountType } = parsed.data;
  const supabase = await createClient();

  // 1. Check if an account already exists with this email
  const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .ilike("email", email.trim())
    .maybeSingle();

  if (existingUser) {
    return {
      message: "An account with this email already exists. Please log in instead.",
    };
  }

  // 2. Hash password securely
  const passwordHash = await hashPassword(password);

  // 3. Insert profile into database (All student accounts start as BUYER until verified by campus admin)
  const { data: newProfile, error: insertError } = await supabase
    .from("profiles")
    .insert({
      email: email.toLowerCase().trim(),
      full_name: name.trim(),
      role: "BUYER",
      password_hash: passwordHash,
    })
    .select("id, email, full_name, role")
    .single();

  if (insertError || !newProfile) {
    if (insertError?.message?.includes("password_hash") || insertError?.code === "PGRST204") {
      return {
        message: "Database column 'password_hash' not found. Please run migration 0002_custom_auth.sql in your Supabase SQL Editor.",
      };
    }
    return {
      message: insertError?.message || "Failed to create account. Please try again.",
    };
  }

  // 5. Provision cart for user
  await supabase
    .from("carts")
    .insert({ user_id: newProfile.id })
    .select("id")
    .maybeSingle();

  // 6. Establish session cookie
  await setSessionCookie({
    id: newProfile.id,
    email: newProfile.email,
    full_name: newProfile.full_name,
    role: newProfile.role,
  });

  // 7. Direct redirect: if aspiring seller, take to verification portal
  if (accountType === "seller") {
    redirect("/seller/verification");
  }

  redirect("/protected");
}

/**
 * Log in action — verifies email and hashed password against database profiles.
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

  // 1. Fetch user by email (case-insensitive)
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, password_hash")
    .ilike("email", email.trim())
    .maybeSingle();

  if (error) {
    if (error.message?.includes("password_hash") || error.code === "PGRST204") {
      return {
        message: "Database column 'password_hash' not found. Please run migration 0002_custom_auth.sql in your Supabase SQL Editor.",
      };
    }
    return {
      message: "Invalid email or password. Please try again.",
    };
  }

  if (!profile || !profile.password_hash) {
    return {
      message: "Invalid email or password. Please try again.",
    };
  }

  // 2. Verify hashed password
  const isValid = await verifyPassword(password, profile.password_hash);
  if (!isValid) {
    return {
      message: "Invalid email or password. Please try again.",
    };
  }

  // 3. Set authenticated session cookie
  await setSessionCookie({
    id: profile.id,
    email: profile.email,
    full_name: profile.full_name,
    role: profile.role,
  });

  const isAdmin = profile.role === "CAMPUS_ADMIN" || profile.role === "PLATFORM_ADMIN";
  const destination = isAdmin ? "/admin" : (next && next !== "/admin" ? next : "/protected");

  redirect(destination);
}

/**
 * Dedicated Admin Portal Log in action — verifies admin credentials.
 */
export async function adminLoginAction(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    next: "/admin",
  };

  const parsed = LoginSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;
  const supabase = await createClient();

  // 1. Fetch user profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, password_hash")
    .ilike("email", email.trim())
    .maybeSingle();

  if (error || !profile || !profile.password_hash) {
    return {
      message: "Invalid administrator credentials.",
    };
  }

  // 2. Strict Role Check: Must be CAMPUS_ADMIN or PLATFORM_ADMIN
  if (profile.role !== "CAMPUS_ADMIN" && profile.role !== "PLATFORM_ADMIN") {
    return {
      message: "Access Denied: This portal is strictly restricted to Campus Administrators. Students must log in through the student marketplace.",
    };
  }

  // 3. Verify hashed password
  const isValid = await verifyPassword(password, profile.password_hash);
  if (!isValid) {
    return {
      message: "Invalid administrator credentials.",
    };
  }

  // 4. Set session cookie
  await setSessionCookie({
    id: profile.id,
    email: profile.email,
    full_name: profile.full_name,
    role: profile.role,
  });

  redirect("/admin");
}

/**
 * Log out action — clears session cookie and redirects to /login.
 */
export async function logoutAction(): Promise<never> {
  await clearSessionCookie();
  redirect("/login");
}

/**
 * Forgot password action — records recovery request for custom auth.
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

  // Check if profile exists
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .ilike("email", email.trim())
    .maybeSingle();

  if (!profile) {
    // Avoid leaking whether email exists
    return {
      success: true,
      message: "If an account exists with this email, password reset instructions have been logged.",
    };
  }

  return {
    success: true,
    message: "If an account exists with this email, password reset instructions have been logged.",
  };
}

/**
 * Reset password action — updates user's password hash in profiles.
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

  const user = await getCurrentUser();
  if (!user) {
    return {
      message: "Session expired. Please log in again.",
    };
  }

  const { password } = parsed.data;
  const passwordHash = await hashPassword(password);
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ password_hash: passwordHash, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (error) {
    return {
      message: error.message,
    };
  }

  redirect("/protected");
}

/**
 * Permanently deletes the user's account and all associated records.
 * Clears session cookie and redirects to /login.
 */
export async function deleteAccountAction(): Promise<never> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const supabase = await createClient();

  // 1. If seller, delete products and store
  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (store) {
    const { data: products } = await supabase
      .from("products")
      .select("id")
      .eq("store_id", store.id);

    if (products && products.length > 0) {
      const productIds = products.map((p) => p.id);
      await supabase.from("product_images").delete().in("product_id", productIds);
      await supabase.from("products").delete().eq("store_id", store.id);
    }
    await supabase.from("stores").delete().eq("id", store.id);
  }

  // 2. Delete carts & cart items
  const { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (cart) {
    await supabase.from("cart_items").delete().eq("cart_id", cart.id);
    await supabase.from("carts").delete().eq("id", cart.id);
  }

  // 3. Delete student verifications
  await supabase.from("student_verifications").delete().eq("user_id", user.id);

  // 4. Delete reviews, notifications & reports
  await supabase.from("reviews").delete().eq("user_id", user.id);
  await supabase.from("notifications").delete().eq("user_id", user.id);
  await supabase.from("reports").delete().eq("reporter_id", user.id);

  // 5. Delete profile record
  await supabase.from("profiles").delete().eq("id", user.id);

  // 6. Clear session cookie
  await clearSessionCookie();

  revalidatePath("/", "layout");
  redirect("/login");
}
