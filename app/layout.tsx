import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LYNK — Empower Student Entrepreneurs",
  description:
    "Discover, support, and sell products and services within the Luis Y. Ferrer Jr. Senior High School community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
