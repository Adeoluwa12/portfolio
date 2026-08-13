export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "date" | "checkbox" | "select" | "tags" | "image" | "video";
  options?: string[]; // for select
};

export const FIELD_CONFIG: Record<string, FieldConfig[]> = {
  projects: [
    { name: "title", label: "Title", type: "text" },
    { name: "summary", label: "Summary", type: "textarea" },
    { name: "description", label: "Full description", type: "textarea" },
    { name: "stack", label: "Stack (comma separated)", type: "tags" },
    { name: "liveUrl", label: "Live URL", type: "text" },
    { name: "repoUrl", label: "Repo URL", type: "text" },
    { name: "imageUrl", label: "Screenshot", type: "image" },
    { name: "featured", label: "Featured", type: "checkbox" },
    { name: "order", label: "Display order", type: "number" },
  ],
  certifications: [
    { name: "name", label: "Name", type: "text" },
    { name: "code", label: "Code", type: "text" },
    { name: "issuer", label: "Issuer", type: "text" },
    { name: "imageUrl", label: "Badge image", type: "image" },
    { name: "verifyUrl", label: "Verification URL", type: "text" },
    { name: "issuedDate", label: "Issued date", type: "date" },
    { name: "order", label: "Display order", type: "number" },
  ],
  skills: [
    { name: "name", label: "Name", type: "text" },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: ["cloud", "identity", "security", "infrastructure", "monitoring", "programming"],
    },
    { name: "proficiency", label: "Proficiency (1-5)", type: "number" },
    { name: "order", label: "Display order", type: "number" },
  ],
  settings: [
    { name: "heroImageUrl", label: "Hero photo", type: "image" },
    { name: "heroVideoUrl", label: "Intro video", type: "video" },
  ],
};

export const EMPTY_VALUES: Record<string, any> = {
  projects: {
    title: "",
    summary: "",
    description: "",
    stack: "",
    liveUrl: "",
    repoUrl: "",
    imageUrl: "",
    featured: false,
    order: 0,
  },
  certifications: {
    name: "",
    code: "",
    issuer: "Microsoft",
    imageUrl: "",
    verifyUrl: "",
    issuedDate: "",
    order: 0,
  },
  skills: { name: "", category: "cloud", proficiency: 4, order: 0 },
  settings: { heroImageUrl: "", heroVideoUrl: "" },
};

// Convert form state to the shape the API expects (e.g. split comma tags into an array).
export function toPayload(tab: string, values: Record<string, any>) {
  const payload = { ...values };
  if (tab === "projects" && typeof payload.stack === "string") {
    payload.stack = payload.stack
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }
  if (payload.order !== undefined) payload.order = Number(payload.order) || 0;
  if (payload.proficiency !== undefined) payload.proficiency = Number(payload.proficiency) || 1;
  return payload;
}

// Convert an item from the API back into form-editable values (e.g. array -> comma string).
export function toFormValues(tab: string, item: any) {
  const values = { ...EMPTY_VALUES[tab], ...item };
  if (tab === "projects" && Array.isArray(item.stack)) {
    values.stack = item.stack.join(", ");
  }
  if (tab === "certifications" && item.issuedDate) {
    values.issuedDate = String(item.issuedDate).slice(0, 10);
  }
  return values;
}