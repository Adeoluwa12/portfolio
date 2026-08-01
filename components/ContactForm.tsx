"use client";

import { useState, FormEvent } from "react";
import { submitContact } from "@/lib/api";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("company")) return;

    setStatus("sending");
    setError("");

    try {
      await submitContact({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        subject: String(data.get("subject") || ""),
        body: String(data.get("body") || ""),
      });
      setStatus("sent");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Something went wrong. Try again.");
    }
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
        <div>
          <p className="section-label">Contact</p>
          <h2 className="section-title mb-6">Let&apos;s connect</h2>
          <p className="text-textDim text-sm sm:text-base leading-relaxed mb-8">
            Open to cloud security roles, consulting engagements, and collaboration on
            identity and Zero Trust projects. Reach out and I&apos;ll get back to you promptly.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm">
              <span className="w-9 h-9 rounded-lg bg-surfaceAlt border border-hairline flex items-center justify-center text-accent shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span className="text-textDim">Available for remote work worldwide</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="w-9 h-9 rounded-lg bg-surfaceAlt border border-hairline flex items-center justify-center text-accent shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="text-textDim">Lagos, Nigeria</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="w-9 h-9 rounded-lg bg-surfaceAlt border border-hairline flex items-center justify-center text-accent shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </span>
              <a href="/resume.pdf" className="text-accent hover:underline">
                Download resume (PDF)
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 flex flex-col gap-4">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div>
            <label htmlFor="name" className="block text-xs text-textDim mb-1.5">
              Name
            </label>
            <input
              id="name"
              required
              name="name"
              placeholder="Your name"
              className="focus-ring w-full bg-surfaceAlt border border-hairline rounded-lg px-4 py-2.5 text-text placeholder:text-textDim text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs text-textDim mb-1.5">
              Email
            </label>
            <input
              id="email"
              required
              type="email"
              name="email"
              placeholder="you@company.com"
              className="focus-ring w-full bg-surfaceAlt border border-hairline rounded-lg px-4 py-2.5 text-text placeholder:text-textDim text-sm"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-xs text-textDim mb-1.5">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              placeholder="Optional"
              className="focus-ring w-full bg-surfaceAlt border border-hairline rounded-lg px-4 py-2.5 text-text placeholder:text-textDim text-sm"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-xs text-textDim mb-1.5">
              Message
            </label>
            <textarea
              id="body"
              required
              name="body"
              rows={5}
              placeholder="Tell me about the opportunity or project..."
              className="focus-ring w-full bg-surfaceAlt border border-hairline rounded-lg px-4 py-2.5 text-text placeholder:text-textDim text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary w-full sm:w-auto disabled:opacity-50 mt-1"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-success text-sm font-mono">Message sent — I&apos;ll reply soon.</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm font-mono">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
