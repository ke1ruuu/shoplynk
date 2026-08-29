import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Administrator Portal — Project Kita",
  description: "Administrative console for Luis Y. Ferrer Jr. Senior High School.",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
