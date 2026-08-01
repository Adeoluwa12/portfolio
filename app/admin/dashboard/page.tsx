"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminForm from "@/components/AdminForm";
import { FIELD_CONFIG, EMPTY_VALUES, toPayload, toFormValues } from "@/lib/adminFields";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const TABS = ["projects", "certifications", "skills", "messages"] as const;
type Tab = (typeof TABS)[number];

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("projects");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      router.push("/admin/login");
      return;
    }
    setToken(t);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    closeForm();
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tab]);

  async function authedFetch(path: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}/api/admin${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      router.push("/admin/login");
      throw new Error("Session expired");
    }
    return res;
  }

  async function load() {
    setLoading(true);
    const res = await authedFetch(`/${tab}`);
    setItems(await res.json());
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await authedFetch(`/${tab}/${id}`, { method: "DELETE" });
    load();
  }

  async function markRead(id: string) {
    await authedFetch(`/messages/${id}/read`, { method: "PATCH" });
    load();
  }

  function openCreateForm() {
    setEditingId(null);
    setFormValues(EMPTY_VALUES[tab] || {});
    setFormError("");
    setFormOpen(true);
  }

  function openEditForm(item: any) {
    setEditingId(item._id);
    setFormValues(toFormValues(tab, item));
    setFormError("");
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setFormValues({});
    setFormError("");
  }

  async function handleFormSubmit() {
    setFormError("");
    const payload = toPayload(tab, formValues);
    try {
      const res = await authedFetch(editingId ? `/${tab}/${editingId}` : `/${tab}`, {
        method: editingId ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }
      closeForm();
      load();
    } catch (err: any) {
      setFormError(err.message || "Save failed");
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  }

  const isCrudTab = tab !== "messages";

  return (
    <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold text-text">Portfolio control center</h1>
        <button onClick={logout} className="font-mono text-xs text-textDim hover:text-accent transition">
          Sign out
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`font-mono text-xs px-3 py-1.5 rounded border ${
              tab === t
                ? "bg-accent text-ink border-accent"
                : "border-hairline text-textDim"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {isCrudTab && !formOpen && (
        <button
          onClick={openCreateForm}
          className="focus-ring mb-6 font-mono text-xs px-4 py-2 rounded-md border border-accent text-accent hover:bg-accent hover:text-ink transition"
        >
          + Add {tab.slice(0, -1)}
        </button>
      )}

      {isCrudTab && formOpen && (
        <>
          {formError && <p className="text-red-400 text-sm font-mono mb-3">{formError}</p>}
          <AdminForm
            fields={FIELD_CONFIG[tab]}
            values={formValues}
            onChange={(name, value) => setFormValues((v) => ({ ...v, [name]: value }))}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            submitLabel={editingId ? "Save changes" : "Create"}
          />
        </>
      )}

      {loading ? (
        <p className="text-textDim text-sm">Loading…</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.length === 0 && <p className="text-textDim text-sm">Nothing here yet.</p>}
          {items.map((item) => (
            <div
              key={item._id}
              className="border border-hairline bg-surface rounded-lg p-4 flex items-start justify-between gap-4"
            >
              <div className="text-sm text-text">
                {tab === "messages" ? (
                  <>
                    <p className="font-mono text-xs text-accent mb-1">
                      {item.name} · {item.email} {item.read ? "" : "· unread"}
                    </p>
                    <p className="font-medium mb-1">{item.subject || "(no subject)"}</p>
                    <p className="text-textDim">{item.body}</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">{item.title || item.name}</p>
                    <p className="text-textDim text-xs">{item.summary || item.code}</p>
                  </>
                )}
              </div>
              <div className="flex gap-3 shrink-0">
                {tab === "messages" && !item.read && (
                  <button
                    onClick={() => markRead(item._id)}
                    className="font-mono text-xs text-accent hover:underline"
                  >
                    mark read
                  </button>
                )}
                {isCrudTab && (
                  <button
                    onClick={() => openEditForm(item)}
                    className="font-mono text-xs text-accent hover:underline"
                  >
                    edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="font-mono text-xs text-red-400 hover:underline"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
