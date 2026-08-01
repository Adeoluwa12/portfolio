import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Oluwaferanmi David Adeoye | Cloud Security Engineer",
  description:
    "Cloud Security Engineer specializing in Azure, Microsoft Entra ID, Sentinel, AWS security, identity governance, and Zero Trust architecture.",
};

const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      if (stored === 'light') document.documentElement.classList.add('light');
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-body antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
