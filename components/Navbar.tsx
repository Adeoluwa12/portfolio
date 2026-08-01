"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-hairline shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-semibold text-text text-sm tracking-tight">
          ODA<span className="text-accent">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-textDim hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="/resume.pdf" className="btn-secondary hidden sm:inline-flex text-xs">
            Resume
          </a>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden focus-ring w-9 h-9 rounded-lg border border-hairline flex items-center justify-center text-textDim"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-hairline bg-surface/95 backdrop-blur-md px-4 py-4">
          <ul className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-textDim hover:text-accent py-1 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                onClick={() => setOpen(false)}
                className="btn-secondary w-full text-xs mt-2"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
