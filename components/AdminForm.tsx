"use client";

import { FieldConfig } from "@/lib/adminFields";

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
              className="focus-ring w-4 h-4 accent-accent"
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
          className="focus-ring bg-accent text-ink font-semibold text-sm rounded-md px-5 py-2 hover:opacity-90 transition"
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
