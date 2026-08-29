"use client";

import React, { useState } from "react";
import { VerificationForm } from "./verification-form";
import {
  VerificationStatusView,
  StudentVerificationData,
} from "./verification-status-view";

interface VerificationPortalViewProps {
  initialVerification: StudentVerificationData | null;
  userFullName?: string;
  userEmail?: string;
}

export function VerificationPortalView({
  initialVerification,
  userFullName,
  userEmail,
}: VerificationPortalViewProps) {
  const [showForm, setShowForm] = useState(!initialVerification);

  if (initialVerification && !showForm) {
    return (
      <VerificationStatusView
        verification={initialVerification}
        onReapply={() => setShowForm(true)}
      />
    );
  }

  return (
    <VerificationForm
      userFullName={userFullName}
      userEmail={userEmail}
    />
  );
}
