import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Kita — Empower Student Entrepreneurs",
  description:
    "Discover, support, and sell products and services within your school community.",
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
