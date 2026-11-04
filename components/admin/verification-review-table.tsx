"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  IdCard,
  Shield,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  User,
  GraduationCap,
  Calendar,
  Mail,
  X,
  Check,
  UserX,
  Trash2,
  ShieldAlert,
  ExternalLink,
  AlertTriangle,
  FileQuestion,
  ImageOff,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  approveVerificationAction,
  removeSellerAction,
  deleteVerificationAction,
} from "@/app/actions/verification";
import { RejectDialog } from "./reject-dialog";
import { createClient } from "@/lib/supabase/client";
import { isValidImageUrl } from "@/lib/utils";

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
  initialVerifications: AdminVerificationItem[];
}

const PAGE_SIZE = 8;

function AdminIdCardPreview({ imageUrl }: { imageUrl?: string | null }) {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [imageUrl]);

  if (!imageUrl || !imageUrl.trim()) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-xs text-muted">
        <FileQuestion className="h-8 w-8 text-muted/60" />
        <span>No student ID photo was attached.</span>
      </div>
    );
  }

  const isValid = isValidImageUrl(imageUrl);

  if (!isValid || loadError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 bg-paper p-4 text-center text-xs">
        <AlertTriangle className="h-8 w-8 text-amber-500" />
        <div className="flex flex-col gap-1 max-w-sm">
          <span className="font-bold text-ink">
            {loadError ? "Unable to load student ID image" : "Invalid ID image format"}
          </span>
          <p className="text-[11px] text-muted leading-relaxed">
            {loadError
              ? "The remote server failed to provide the image file."
              : "The applicant submitted an invalid or unformatted image URL string."}
          </p>
          <div className="mt-1 rounded-md bg-paper-deep px-2.5 py-1 font-mono text-[11px] text-muted break-all border border-line">
            {imageUrl.length > 100 ? `${imageUrl.slice(0, 100)}...` : imageUrl}
          </div>
        </div>
        {isValid && (
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-kita-red hover:underline"
          >
            <span>Attempt direct link</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={imageUrl}
        alt="Student ID Card"
        fill
        unoptimized
        onError={() => setLoadError(true)}
        className="object-contain p-2"
      />
      {imageUrl.startsWith("http") && (
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-lg bg-surface/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-ink border border-line shadow-xs hover:bg-surface transition-colors"
          title="Open full image in new tab"
        >
          <ExternalLink className="h-3 w-3 text-muted" />
          <span>Full size</span>
        </a>
      )}
    </div>
  );
}

export function VerificationReviewTable({
  initialVerifications,
}: VerificationReviewTableProps) {
  const router = useRouter();
  const [verifications, setVerifications] = useState<AdminVerificationItem[]>(initialVerifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Selected verification for modal inspection
  const [selectedVerification, setSelectedVerification] = useState<AdminVerificationItem | null>(null);

  // Rejection modal state
  const [rejectApp, setRejectApp] = useState<{
    id: string;
    applicantName: string;
    studentId: string;
  } | null>(null);

  // Revoke / Remove Seller state
  const [revokeConfirmApp, setRevokeConfirmApp] = useState<AdminVerificationItem | null>(null);
  const [isRevoking, setIsRevoking] = useState(false);
  const [deleteRecordChecked, setDeleteRecordChecked] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [approvingId, setApprovingId] = useState<string | null>(null);

  useEffect(() => {
    setVerifications(initialVerifications);
  }, [initialVerifications]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  async function fetchLatestVerifications() {
    setIsRefreshing(true);
    try {
      const supabase = createClient();
      const { data: dbVerifications } = await supabase
        .from("student_verifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbVerifications && dbVerifications.length > 0) {
        const userIds = [...new Set(dbVerifications.map((v) => v.user_id).filter(Boolean))];
        const { data: dbProfiles } = await supabase
          .from("profiles")
          .select("id, full_name, email, role")
          .in("id", userIds);

        const profileMap = new Map(dbProfiles?.map((p) => [p.id, p]) || []);

        const mapped: AdminVerificationItem[] = dbVerifications.map((v) => ({
          id: v.id,
          user_id: v.user_id,
          student_id_number: v.student_id_number,
          program: v.program,
          year_level: v.year_level,
          id_image_url: v.id_image_url,
          status: v.status as "PENDING" | "APPROVED" | "REJECTED",
          rejection_reason: v.rejection_reason,
          created_at: v.created_at,
          profile: profileMap.get(v.user_id) || null,
        }));

        setVerifications(mapped);
      }
    } catch (err) {
      console.error("Failed to refresh verifications:", err);
    } finally {
      setIsRefreshing(false);
    }
  }

  // Supabase Realtime channel subscription
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("admin_verifications_live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "student_verifications" },
        () => {
          fetchLatestVerifications();
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  async function handleApprove(id: string) {
    setApprovingId(id);
    startTransition(async () => {
      const res = await approveVerificationAction(id);
      setApprovingId(null);
      if (res.success) {
        setVerifications((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: "APPROVED" } : item
          )
        );
        if (selectedVerification?.id === id) {
          setSelectedVerification(null);
        }
        router.refresh();
      } else {
        alert(res.message || "Failed to approve verification.");
      }
    });
  }

  async function handleRemoveSeller(app: AdminVerificationItem, deleteRecord: boolean) {
    setIsRevoking(true);
    const res = await removeSellerAction(app.id, deleteRecord);
    setIsRevoking(false);
    if (res.success) {
      if (deleteRecord) {
        setVerifications((prev) => prev.filter((item) => item.id !== app.id));
      } else {
        setVerifications((prev) =>
          prev.map((item) =>
            item.id === app.id
              ? {
                  ...item,
                  status: "REJECTED",
                  rejection_reason:
                    "Seller privileges were revoked by campus administration.",
                }
              : item
          )
        );
      }
      setRevokeConfirmApp(null);
      setSelectedVerification(null);
      router.refresh();
    } else {
      alert(res.message || "Failed to remove seller.");
    }
  }

  // Filter & Search
  const filtered = verifications.filter((v) => {
    const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
    const name = v.profile?.full_name?.toLowerCase() || "";
    const email = v.profile?.email?.toLowerCase() || "";
    const studentId = v.student_id_number?.toLowerCase() || "";
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || name.includes(query) || email.includes(query) || studentId.includes(query);
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginatedItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const pendingCount = verifications.filter((v) => v.status === "PENDING").length;
  const approvedCount = verifications.filter((v) => v.status === "APPROVED").length;
  const rejectedCount = verifications.filter((v) => v.status === "REJECTED").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Sticky Rail (4 Cols) — Filter & Queue Ledger */}
      <aside className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-6">
        {/* Filter Navigation Card */}
        <div className="flex flex-col border border-line bg-surface p-5 rounded-2xl gap-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="eyebrow text-xs text-muted">Queue Filter</span>
            <button
              type="button"
              onClick={fetchLatestVerifications}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink transition-colors disabled:opacity-50"
              title="Refresh queue"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-kita-green" : ""}`} />
              <span>{isRefreshing ? "Syncing…" : "Refresh"}</span>
            </button>
          </div>

          {/* Status Filter Pills */}
          <div className="flex flex-col gap-1">
            {[
              { id: "PENDING", label: "Pending Review", count: pendingCount, activeClass: "bg-spark-soft text-spark-ink font-bold" },
              { id: "APPROVED", label: "Approved Sellers", count: approvedCount, activeClass: "bg-kita-green-soft text-kita-green font-bold" },
              { id: "REJECTED", label: "Rejected", count: rejectedCount, activeClass: "bg-destructive/10 text-destructive font-bold" },
              { id: "ALL", label: "All Submissions", count: verifications.length, activeClass: "bg-paper-deep text-ink font-bold" },
            ].map((tab) => {
              const isSelected = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all ${
                    isSelected ? tab.activeClass : "text-muted hover:bg-paper hover:text-ink font-semibold"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="font-mono text-xs">{tab.count}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative pt-2 border-t border-line">
            <Search className="absolute left-3 top-5 -translate-y-1/2 h-3.5 w-3.5 text-muted pointer-events-none" />
            <input
              type="search"
              placeholder="Search student or LRN…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-xl border border-line bg-paper pl-8 pr-3 text-xs text-ink placeholder:text-muted focus:border-kita-green focus:bg-surface focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-5 -translate-y-1/2 text-muted hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Governance Guidelines Box */}
        <div className="flex flex-col border border-line bg-surface p-5 rounded-2xl gap-2.5">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-kita-green" />
            <span className="text-xs font-bold text-ink">Verification Criteria</span>
          </div>
          <ul className="text-xs text-muted leading-relaxed flex flex-col gap-1.5 list-disc list-inside">
            <li>Matches registered LYFJSHS student roster.</li>
            <li>Valid school year and grade level.</li>
            <li>Clear, unblurred photo of school ID.</li>
          </ul>
        </div>
      </aside>

      {/* Right Main Stream (8 Cols) — Line-Ruled Verification Table */}
      <main className="lg:col-span-8 flex flex-col gap-4 min-w-0">
        <div className="flex flex-col border border-line bg-surface rounded-2xl overflow-hidden">
          {/* Table Header Strip */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-paper/40">
            <span className="font-display font-bold text-sm text-ink">
              Application Queue ({filtered.length})
            </span>
            <span className="text-xs text-muted">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Line-Ruled Rows */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-line bg-paper/20 text-xs font-bold uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3">Applicant</th>
                  <th className="px-4 py-3">Student LRN</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {paginatedItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-muted">
                      No verification records match the current filter.
                    </td>
                  </tr>
                ) : (
                  paginatedItems.map((v) => {
                    const applicantName = v.profile?.full_name || "Student Applicant";
                    const applicantEmail = v.profile?.email || "";
                    const initials = applicantName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase();

                    const formattedDate = new Date(v.created_at).toLocaleDateString(
                      "en-PH",
                      { month: "short", day: "numeric", year: "numeric" }
                    );

                    return (
                      <tr
                        key={v.id}
                        onClick={() => setSelectedVerification(v)}
                        className="group cursor-pointer hover:bg-paper/60 transition-colors"
                        title="Click row to inspect credentials"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-kita-green text-xs font-bold text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                              {initials}
                            </span>
                            <div className="flex flex-col truncate max-w-xs">
                              <span className="font-display font-bold text-sm text-ink truncate group-hover:text-kita-green transition-colors">
                                {applicantName}
                              </span>
                              <span className="text-xs text-muted truncate">{applicantEmail}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="font-mono font-bold text-xs text-ink bg-paper px-2 py-0.5 rounded border border-line">
                            {v.student_id_number}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          {v.status === "PENDING" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-spark-soft px-2.5 py-0.5 text-xs font-bold text-spark-ink">
                              <span className="h-1.5 w-1.5 rounded-full bg-spark-ink animate-pulse" />
                              Pending
                            </span>
                          )}
                          {v.status === "APPROVED" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-kita-green-soft px-2.5 py-0.5 text-xs font-bold text-kita-green">
                              <Check className="h-3 w-3" />
                              Approved
                            </span>
                          )}
                          {v.status === "REJECTED" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-bold text-destructive">
                              <XCircle className="h-3 w-3" />
                              Rejected
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-3.5 text-right font-mono text-xs text-muted">
                          {formattedDate}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-line px-5 py-3 bg-paper/20">
              <span className="text-xs text-muted">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-line bg-surface p-1.5 text-ink hover:bg-paper disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-line bg-surface p-1.5 text-ink hover:bg-paper disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Full ID Inspection */}
      {selectedVerification && (
        <Dialog
          open={!!selectedVerification}
          onOpenChange={(open) => {
            if (!open) setSelectedVerification(null);
          }}
        >
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-7 border border-line bg-surface shadow-flyer-lg">
            <DialogHeader className="flex flex-col gap-1 border-b border-line pb-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-muted">Applicant Inspection</span>
                {selectedVerification.status === "PENDING" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-spark-soft px-3 py-1 text-xs font-bold text-spark-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-spark-ink animate-pulse" />
                    Pending Review
                  </span>
                )}
              </div>
              <DialogTitle className="font-display text-xl font-bold text-ink">
                {selectedVerification.profile?.full_name || "Student Applicant"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted">
                Submitted on {new Date(selectedVerification.created_at).toLocaleString("en-PH")}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-5 mt-2">
              {/* Student Metadata Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-paper border border-line text-xs">
                <div className="flex flex-col">
                  <span className="text-muted">LRN / ID</span>
                  <span className="font-mono font-bold text-ink">{selectedVerification.student_id_number}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted">Program / Strand</span>
                  <span className="font-bold text-ink">{selectedVerification.program || "General"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted">Year Level</span>
                  <span className="font-bold text-ink">{selectedVerification.year_level || "Senior High"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted">Email</span>
                  <span className="font-semibold text-ink truncate">{selectedVerification.profile?.email || "N/A"}</span>
                </div>
              </div>

              {/* ID Card Photo Preview */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-ink">Submitted Student ID Card:</span>
                <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl border border-line bg-paper-deep shadow-inner">
                  <AdminIdCardPreview imageUrl={selectedVerification.id_image_url} />
                </div>
              </div>

              {/* Action Buttons */}
              {selectedVerification.status === "PENDING" && (
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
                  <button
                    type="button"
                    disabled={isPending || approvingId === selectedVerification.id}
                    onClick={() => {
                      const app = selectedVerification;
                      setSelectedVerification(null);
                      setRejectApp({
                        id: app.id,
                        applicantName: app.profile?.full_name || "Applicant",
                        studentId: app.student_id_number,
                      });
                    }}
                    className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-bold text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Reject Application
                  </button>

                  <button
                    type="button"
                    disabled={isPending || approvingId === selectedVerification.id}
                    onClick={() => handleApprove(selectedVerification.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-kita-green px-5 py-2 text-xs font-bold text-white shadow-flyer hover:bg-kita-green-deep active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {approvingId === selectedVerification.id ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Activating…
                      </span>
                    ) : (
                      "Approve & Activate Seller"
                    )}
                  </button>
                </div>
              )}

              {/* Approved Seller Actions (Below Box) */}
              {selectedVerification.status === "APPROVED" && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-line">
                  <div className="flex items-center gap-2 text-xs font-bold text-kita-green">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>Verified Active Campus Seller</span>
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setRevokeConfirmApp(selectedVerification)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-bold text-destructive hover:bg-destructive/20 active:scale-95 transition-all cursor-pointer"
                    >
                      <UserX className="h-3.5 w-3.5" />
                      <span>Remove as Seller</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Rejected Seller Actions (Below Box) */}
              {selectedVerification.status === "REJECTED" && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-line">
                  <div className="flex flex-col gap-0.5 text-xs">
                    <span className="font-bold text-destructive">Application Rejected</span>
                    {selectedVerification.rejection_reason && (
                      <span className="text-[11px] text-muted">
                        Reason: {selectedVerification.rejection_reason}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setRevokeConfirmApp(selectedVerification)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-bold text-destructive hover:bg-destructive/20 active:scale-95 transition-all cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete Record</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Revoke / Remove Seller Confirmation Dialog */}
      {revokeConfirmApp && (
        <Dialog
          open={!!revokeConfirmApp}
          onOpenChange={(open) => {
            if (!open) {
              setRevokeConfirmApp(null);
              setDeleteRecordChecked(false);
            }
          }}
        >
          <DialogContent className="sm:max-w-[460px] bg-surface rounded-3xl border border-line p-6 shadow-flyer-lg">
            <DialogHeader className="gap-1.5">
              <div className="flex items-center gap-2 text-destructive font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="h-4 w-4" />
                <span>
                  {revokeConfirmApp.status === "APPROVED"
                    ? "Remove Approved Seller"
                    : "Delete Verification Record"}
                </span>
              </div>
              <DialogTitle className="text-lg font-bold text-ink">
                {revokeConfirmApp.status === "APPROVED"
                  ? "Revoke Seller Privileges?"
                  : "Delete Verification Record?"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted leading-relaxed">
                {revokeConfirmApp.status === "APPROVED" ? (
                  <>
                    Are you sure you want to remove{" "}
                    <strong className="text-ink">
                      {revokeConfirmApp.profile?.full_name || revokeConfirmApp.student_id_number}
                    </strong>{" "}
                    as an approved seller?
                  </>
                ) : (
                  <>
                    Are you sure you want to delete the verification record for{" "}
                    <strong className="text-ink">
                      {revokeConfirmApp.profile?.full_name || revokeConfirmApp.student_id_number}
                    </strong>
                    ?
                  </>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3 my-2 text-xs">
              {revokeConfirmApp.status === "APPROVED" && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 text-destructive flex flex-col gap-1.5">
                  <span className="font-bold">What happens next:</span>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-muted leading-relaxed">
                    <li>Account will be downgraded from <strong>SELLER</strong> back to <strong>BUYER</strong>.</li>
                    <li>Their campus store and active marketplace listings will be deactivated.</li>
                    <li>They will lose access to Seller Studio and product management.</li>
                  </ul>
                </div>
              )}

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-ink select-none pt-1">
                <input
                  type="checkbox"
                  checked={deleteRecordChecked}
                  onChange={(e) => setDeleteRecordChecked(e.target.checked)}
                  className="h-4 w-4 rounded border-line text-destructive focus:ring-destructive cursor-pointer"
                />
                <span>
                  {revokeConfirmApp.status === "APPROVED"
                    ? "Also permanently delete this verification application record"
                    : "Permanently purge from system records"}
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-line">
              <button
                type="button"
                disabled={isRevoking}
                onClick={() => {
                  setRevokeConfirmApp(null);
                  setDeleteRecordChecked(false);
                }}
                className="rounded-xl border border-line bg-paper px-4 py-2 text-xs font-bold text-ink hover:bg-paper-deep transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isRevoking}
                onClick={() => handleRemoveSeller(revokeConfirmApp, deleteRecordChecked || revokeConfirmApp.status !== "APPROVED")}
                className="inline-flex items-center gap-2 rounded-xl bg-destructive px-5 py-2 text-xs font-bold text-white shadow-flyer hover:bg-destructive/90 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isRevoking ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Removing…
                  </span>
                ) : (
                  <>
                    <UserX className="h-3.5 w-3.5" />
                    <span>
                      {revokeConfirmApp.status === "APPROVED"
                        ? "Confirm Remove as Seller"
                        : "Delete Record"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Feedback Dialog */}
      {rejectApp && (
        <RejectDialog
          application={rejectApp}
          open={!!rejectApp}
          onOpenChange={(open) => {
            if (!open) setRejectApp(null);
          }}
          onRejected={() => {
            setVerifications((prev) =>
              prev.map((item) =>
                item.id === rejectApp.id ? { ...item, status: "REJECTED" } : item
              )
            );
            setRejectApp(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
