import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => setOpen(false), [location]);

  function handleNavClick(href: string) {
    setOpen(false);
    // Hash links on the home page — scroll smoothly if already there
    if (href.startsWith("/#") && location.pathname === "/") {
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-hairline shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-semibold text-text text-sm tracking-tight">
          ODA<span className="text-accent">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/blog") ? (
                <Link
                  to={link.href}
                  className="text-sm text-textDim hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-textDim hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              )}
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
                {link.href.startsWith("/blog") ? (
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm text-textDim hover:text-accent py-1 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="block text-sm text-textDim hover:text-accent py-1 transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a href="/resume.pdf" className="btn-secondary w-full text-xs mt-2">
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
