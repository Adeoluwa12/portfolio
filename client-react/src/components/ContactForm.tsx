import { useState } from "react";
import { submitContact } from "@/lib/api";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", body: "", honeypot: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", body: "", honeypot: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong");
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* left */}
        <div>
          <p className="section-label">Contact</p>
          <h2 className="section-title mb-6">Let's connect</h2>
          <p className="text-textDim leading-relaxed mb-8">
            Open to cloud security roles, consulting engagements, and collaboration on identity and
            Zero Trust projects. Reach out and I'll get back to you promptly.
          </p>
          <ul className="flex flex-col gap-3 font-mono text-sm text-textDim">
            <li>Available for remote work worldwide</li>
            <li>Lagos, Nigeria</li>
            <li>
              <a href="/resume.pdf" className="text-accent hover:underline">
                Download resume (PDF)
              </a>
            </li>
          </ul>
        </div>

        {/* right */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* honeypot */}
          <input
            type="text"
            name="website"
            value={form.honeypot}
            onChange={(e) => set("honeypot", e.target.value)}
            className="hidden"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-textDim uppercase tracking-wide">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="focus-ring bg-surfaceAlt border border-hairline rounded-lg px-4 py-2.5 text-text text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-textDim uppercase tracking-wide">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="focus-ring bg-surfaceAlt border border-hairline rounded-lg px-4 py-2.5 text-text text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-mono text-xs text-textDim uppercase tracking-wide">Subject</label>
            <input
              value={form.subject}
              onChange={(e) => set("subject", e.target.value)}
              className="focus-ring bg-surfaceAlt border border-hairline rounded-lg px-4 py-2.5 text-text text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-mono text-xs text-textDim uppercase tracking-wide">Message</label>
            <textarea
              required
              rows={5}
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
              className="focus-ring bg-surfaceAlt border border-hairline rounded-lg px-4 py-2.5 text-text text-sm resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-vault text-sm font-mono">{errorMsg}</p>
          )}
          {status === "sent" && (
            <p className="text-verified text-sm font-mono">Message sent — I'll be in touch soon.</p>
          )}

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="btn-primary self-start disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
