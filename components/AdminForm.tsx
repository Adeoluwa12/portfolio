"use client";

import { useState } from "react";
import { FieldConfig } from "@/lib/adminFields";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function UploadField({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {value && field.type === "image" && (
        <img src={value} alt="" className="w-24 h-24 object-cover rounded-md border border-hairline" />
      )}
      {value && field.type === "video" && (
        <video src={value} controls className="w-full max-w-xs rounded-md border border-hairline" />
      )}
      <input
        type="file"
        accept={field.type === "image" ? "image/*" : "video/*"}
        onChange={handleFile}
        disabled={uploading}
        className="focus-ring text-text text-xs file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border file:border-hairline file:bg-surface file:text-text file:text-xs"
      />
      {uploading && <p className="text-xs text-textDim">Uploading…</p>}
      {error && <p className="text-xs text-vault">{error}</p>}
      <input
        type="text"
        placeholder="or paste a URL directly"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring bg-surface border border-hairline rounded-md px-3 py-2 text-text text-xs"
      />
    </div>
  );
}

export default function AdminForm({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  fields: FieldConfig[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="border border-hairline bg-surfaceAlt rounded-lg p-5 flex flex-col gap-3 mb-6"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="font-mono text-xs text-textDim uppercase tracking-wide">
            {field.label}
          </label>

          {field.type === "textarea" && (
            <textarea
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              rows={3}
              className="focus-ring bg-surface border border-hairline rounded-md px-3 py-2 text-text text-sm resize-none"
            />
          )}

          {field.type === "select" && (
            <select
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="focus-ring bg-surface border border-hairline rounded-md px-3 py-2 text-text text-sm"
            >
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {field.type === "checkbox" && (
            <input
              type="checkbox"
              checked={!!values[field.name]}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="focus-ring w-4 h-4 accent-verified"
            />
          )}

          {(field.type === "image" || field.type === "video") && (
            <UploadField
              field={field}
              value={values[field.name]}
              onChange={(v) => onChange(field.name, v)}
            />
          )}

          {(field.type === "text" ||
            field.type === "number" ||
            field.type === "date" ||
            field.type === "tags") && (
            <input
              type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="focus-ring bg-surface border border-hairline rounded-md px-3 py-2 text-text text-sm"
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="focus-ring bg-verified text-ink font-semibold text-sm rounded-md px-5 py-2 hover:opacity-90 transition"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="font-mono text-xs text-textDim hover:text-text"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}