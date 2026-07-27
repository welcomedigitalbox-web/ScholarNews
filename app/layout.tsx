import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scholarmatch-ai.thukha-edu.chatgpt.site"),
  title: {
    default: "ScholarMatch AI – Scholarships for International Students",
    template: "%s | ScholarMatch AI",
  },
  description: "Discover international scholarships matched to your academic profile, study goals and budget.",
  keywords: ["international scholarships","fully funded scholarships","study abroad scholarships","scholarships for international students","university funding"],
  authors: [{name:"ScholarMatch AI"}],
  creator: "ScholarMatch AI",
  publisher: "ScholarMatch AI",
  category: "education",
  applicationName: "ScholarMatch AI",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
