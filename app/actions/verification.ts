"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserProfile } from "@/lib/auth/session";

const VerificationSchema = z.object({
  studentIdNumber: z.string().trim().min(3, "Please enter your student ID number."),
  program: z.string().trim().min(2, "Please select or enter your academic strand/program."),
  yearLevel: z.string().trim().min(2, "Please select your year level."),
  idImageUrl: z.string().trim().min(5, "Please provide a photo of your school ID."),
  storeProposal: z.string().trim().optional(),
});

export type VerificationActionState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "store"
  );
}

/**
 * Submit student ID verification application to become a seller.
 */
export async function submitSellerVerificationAction(
  prevState: VerificationActionState,
  formData: FormData
): Promise<VerificationActionState> {
  const { user } = await getCurrentUserProfile();
  if (!user) {
    return { message: "Unauthorized. Please log in first." };
  }

  const rawData = {
    studentIdNumber: formData.get("studentIdNumber"),
    program: formData.get("program"),
    yearLevel: formData.get("yearLevel"),
    idImageUrl: formData.get("idImageUrl"),
    storeProposal: formData.get("storeProposal"),
  };

  const parsed = VerificationSchema.safeParse(rawData);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { studentIdNumber, program, yearLevel, idImageUrl } = parsed.data;
  const supabase = await createClient();

  // Insert or update pending verification
  const { error } = await supabase.from("student_verifications").insert({
    user_id: user.id,
    student_id_number: studentIdNumber,
    program,
    year_level: yearLevel,
    id_image_url: idImageUrl,
    status: "PENDING",
  });

  if (error) {
    return { message: error.message || "Failed to submit verification application." };
  }

  revalidatePath("/seller/verification");
  revalidatePath("/seller");
  revalidatePath("/admin");
  return {
    success: true,
    message: "Application submitted successfully! Our campus administrators will review your student credentials.",
  };
}

/**
 * Admin Action: Approve a student seller verification application.
 */
export async function approveVerificationAction(
  verificationId: string
): Promise<{ success: boolean; message: string }> {
  const { user, profile } = await getCurrentUserProfile();
  if (!user || (profile?.role !== "CAMPUS_ADMIN" && profile?.role !== "PLATFORM_ADMIN")) {
    return { success: false, message: "Unauthorized. Only campus admins can review verifications." };
  }

  const supabase = await createClient();

  // 1. Fetch verification application
  const { data: verification, error: fetchError } = await supabase
    .from("student_verifications")
    .select("id, user_id")
    .eq("id", verificationId)
    .maybeSingle();

  if (fetchError || !verification) {
    return { success: false, message: fetchError?.message || "Verification application not found." };
  }

  const applicantId = verification.user_id;

  // 2. Mark verification as APPROVED
  const { error: updateVerifError } = await supabase
    .from("student_verifications")
    .update({
      status: "APPROVED",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      rejection_reason: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", verificationId);

  if (updateVerifError) {
    return { success: false, message: updateVerifError.message };
  }

  // 3. Promote applicant profile role to SELLER
  await supabase
    .from("profiles")
    .update({
      role: "SELLER",
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicantId);

  // 4. Fetch applicant name for store naming
  const { data: applicantProfile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", applicantId)
    .maybeSingle();

  // 5. Ensure store is provisioned
  const { data: existingStore } = await supabase
    .from("stores")
    .select("id")
    .eq("user_id", applicantId)
    .maybeSingle();

  if (!existingStore) {
    const applicantName = applicantProfile?.full_name || "Student";
    const storeName = `${applicantName}'s Campus Store`;
    const slug = `${slugify(storeName)}-${Math.random().toString(36).substring(2, 6)}`;

    await supabase.from("stores").insert({
      user_id: applicantId,
      name: storeName,
      slug,
      description: "Verified student seller storefront on Project Kita.",
      pickup_locations: "Campus Courtyard / Main Hallway",
      operating_hours: "Mon-Fri 10:00 AM - 4:30 PM",
      is_active: true,
    });
  }

  revalidatePath("/admin");
  revalidatePath("/seller");
  revalidatePath("/seller/verification");
  revalidatePath("/protected/marketplace");
  return { success: true, message: "Student verified! Seller Studio unlocked for this user." };
}

/**
 * Admin Action: Reject a student seller verification application with reason.
 */
export async function rejectVerificationAction(
  verificationId: string,
  reason: string
): Promise<{ success: boolean; message: string }> {
  const { user, profile } = await getCurrentUserProfile();
  if (!user || (profile?.role !== "CAMPUS_ADMIN" && profile?.role !== "PLATFORM_ADMIN")) {
    return { success: false, message: "Unauthorized." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("student_verifications")
    .update({
      status: "REJECTED",
      rejection_reason: reason || "ID image was unclear or invalid. Please re-submit with a clear photo.",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", verificationId);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/seller/verification");
  return { success: true, message: "Application marked as rejected." };
}
