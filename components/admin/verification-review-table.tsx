"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  IdCard,
  ExternalLink,
  Shield,
  Loader2,
  Eye,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { approveVerificationAction } from "@/app/actions/verification";
import { RejectDialog } from "./reject-dialog";

export interface AdminVerificationItem {
  id: string;
  user_id: string;
  student_id_number: string;
  program: string;
  year_level: string;
  id_image_url: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejection_reason: string | null;
  created_at: string;
  profile?: {
    id?: string;
    full_name?: string;
    email?: string;
    role?: string;
  } | null;
}

interface VerificationReviewTableProps {
  verifications: AdminVerificationItem[];
}

export function VerificationReviewTable({
  verifications,
}: VerificationReviewTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    name: string;
    studentId: string;
  } | null>(null);

  const [rejectApp, setRejectApp] = useState<{
    id: string;
    applicantName: string;
    studentId: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const filtered = verifications.filter((v) => {
    const applicantName = v.profile?.full_name || "";
    const applicantEmail = v.profile?.email || "";
    const studentId = v.student_id_number || "";

    const matchesSearch =
      searchQuery.trim() === "" ||
      applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicantEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studentId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleApprove(id: string) {
    setApprovingId(id);
    startTransition(async () => {
      await approveVerificationAction(id);
      setApprovingId(null);
    });
  }

  return (
    <>
      <div className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-6 shadow-flyer">
        {/* Controls Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applicants, ID numbers, or emails…"
              className="h-10 w-full rounded-xl border border-line bg-paper pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-kita-green focus:bg-surface focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl border border-line bg-paper px-3 text-xs font-semibold text-ink focus:border-kita-green focus:outline-none"
            >
              <option value="ALL">All Applications</option>
              <option value="PENDING">Pending Review</option>
              <option value="APPROVED">Approved Sellers</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-paper/60 text-[11px] font-bold uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3.5">Applicant</th>
                <th className="px-4 py-3.5">Student Credentials</th>
                <th className="px-4 py-3.5">School ID Photo</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Submitted</th>
                <th className="px-5 py-3.5 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-surface">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted">
                      <Shield className="h-8 w-8 text-muted/50" />
                      <p className="font-semibold text-ink">No verification records found</p>
                      <p className="text-xs">
                        {statusFilter !== "ALL" || searchQuery
                          ? "Try clearing your filters."
                          : "No student seller applications have been submitted yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((v) => {
                  const applicantName = v.profile?.full_name || "Applicant";
                  const applicantEmail = v.profile?.email || "";
                  const initials = applicantName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                  const formattedDate = new Date(v.created_at).toLocaleDateString(
                    "en-PH",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  );

                  return (
                    <tr
                      key={v.id}
                      className="group hover:bg-paper/40 transition-colors"
                    >
                      {/* Applicant Profile */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-kita-green text-xs font-bold text-white shadow-sm flex-shrink-0">
                            {initials}
                          </span>
                          <div className="flex flex-col truncate max-w-xs">
                            <span className="font-display font-bold text-sm text-ink truncate">
                              {applicantName}
                            </span>
                            <span className="text-xs text-muted truncate">
                              {applicantEmail}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Credentials */}
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono font-bold text-xs text-ink">
                            {v.student_id_number}
                          </span>
                          <span className="text-xs text-muted truncate max-w-xs">
                            {v.program} • {v.year_level}
                          </span>
                        </div>
                      </td>

                      {/* School ID Card Image */}
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewImage({
                              url: v.id_image_url,
                              name: applicantName,
                              studentId: v.student_id_number,
                            })
                          }
                          className="group/img relative flex items-center gap-2 rounded-xl border border-line bg-paper p-1.5 hover:border-kita-green transition-all"
                        >
                          <div className="relative h-9 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={v.id_image_url}
                              alt="ID Thumbnail"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-muted group-hover/img:text-kita-green pr-1">
                            Inspect
                          </span>
                        </button>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        {v.status === "PENDING" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-spark-soft px-2.5 py-1 text-xs font-bold text-spark-ink">
                            <span className="h-1.5 w-1.5 rounded-full bg-spark-ink animate-pulse" />
                            Pending Review
                          </span>
                        )}
                        {v.status === "APPROVED" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-kita-green-soft px-2.5 py-1 text-xs font-bold text-kita-green">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Approved
                          </span>
                        )}
                        {v.status === "REJECTED" && (
                          <div className="flex flex-col gap-0.5">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-bold text-destructive">
                              <XCircle className="h-3.5 w-3.5" />
                              Rejected
                            </span>
                            {v.rejection_reason && (
                              <span className="text-[10px] text-muted truncate max-w-xs" title={v.rejection_reason}>
                                {v.rejection_reason}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Submission Date */}
                      <td className="px-4 py-4 text-xs text-muted">
                        {formattedDate}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        {v.status === "PENDING" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              disabled={isPending || approvingId === v.id}
                              onClick={() => handleApprove(v.id)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-kita-green px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-kita-green-deep active:scale-95 transition-all disabled:opacity-50"
                            >
                              {approvingId === v.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              )}
                              <span>Approve</span>
                            </button>

                            <button
                              type="button"
                              disabled={isPending || approvingId === v.id}
                              onClick={() =>
                                setRejectApp({
                                  id: v.id,
                                  applicantName,
                                  studentId: v.student_id_number,
                                })
                              }
                              className="inline-flex items-center gap-1 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted">Reviewed</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full-size ID Inspection Modal */}
      {previewImage && (
        <Dialog
          open={!!previewImage}
          onOpenChange={(open) => !open && setPreviewImage(null)}
        >
          <DialogContent className="max-w-xl rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="font-display text-lg font-bold text-ink">
                Student ID: {previewImage.name} ({previewImage.studentId})
              </DialogTitle>
            </DialogHeader>
            <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl border border-line bg-paper-deep shadow-inner mt-2">
              <Image
                src={previewImage.url}
                alt="Student ID card full view"
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Feedback Dialog */}
      <RejectDialog
        application={rejectApp}
        open={!!rejectApp}
        onOpenChange={(open) => !open && setRejectApp(null)}
      />
    </>
  );
}
