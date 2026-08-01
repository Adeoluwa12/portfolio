"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);

    try {
      const token = await adminLogin(
        String(data.get("email")),
        String(data.get("password"))
      );
      localStorage.setItem("admin_token", token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 border border-hairline bg-surface rounded-lg p-8"
      >
        <div className="font-mono text-xs text-accent uppercase tracking-widest">
          Admin access
        </div>
        <h1 className="font-display text-2xl font-bold text-text mb-2">Sign in</h1>
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="focus-ring bg-surfaceAlt border border-hairline rounded-md px-4 py-3 text-text placeholder:text-textDim text-sm"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          className="focus-ring bg-surfaceAlt border border-hairline rounded-md px-4 py-3 text-text placeholder:text-textDim text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="focus-ring bg-accent text-ink font-semibold text-sm rounded-md px-6 py-3 hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        {error && <p className="text-red-400 text-sm font-mono">{error}</p>}
      </form>
    </main>
  );
}
