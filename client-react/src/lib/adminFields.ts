export type FieldConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "date"
    | "checkbox"
    | "select"
    | "tags"
    | "image"
    | "video"
    | "metrics";
  options?: string[];
};

export const FIELD_CONFIG: Record<string, FieldConfig[]> = {
  projects: [
    { name: "title", label: "Title", type: "text" },
    { name: "summary", label: "Summary", type: "textarea" },
    { name: "description", label: "Full description", type: "textarea" },
    { name: "breakdown", label: "Breakdown (one point per line)", type: "textarea" },
    { name: "metrics", label: "Metrics (label:value, one per line)", type: "metrics" },
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
      options: [
        "cloud",
        "identity",
        "security",
        "infrastructure",
        "monitoring",
        "programming",
      ],
    },
    { name: "proficiency", label: "Proficiency (1-5)", type: "number" },
    { name: "order", label: "Display order", type: "number" },
  ],
  blog: [
    { name: "title", label: "Title", type: "text" },
    { name: "slug", label: "Slug (e.g. my-post-title)", type: "text" },
    { name: "description", label: "Short description / excerpt", type: "textarea" },
    { name: "body", label: "Body (markdown supported)", type: "textarea" },
    { name: "imageUrl", label: "Cover image", type: "image" },
    { name: "tags", label: "Tags (comma separated)", type: "tags" },
    { name: "published", label: "Published", type: "checkbox" },
    { name: "publishedAt", label: "Publish date", type: "date" },
    { name: "order", label: "Display order", type: "number" },
  ],
  opensource: [
    { name: "title", label: "Title", type: "text" },
    { name: "summary", label: "Summary", type: "textarea" },
    { name: "description", label: "Full description", type: "textarea" },
    { name: "stack", label: "Stack (comma separated)", type: "tags" },
    { name: "repoUrl", label: "Repo URL", type: "text" },
    { name: "liveUrl", label: "Live URL", type: "text" },
    { name: "imageUrl", label: "Screenshot", type: "image" },
    { name: "stars", label: "Stars (display only)", type: "number" },
    { name: "featured", label: "Featured", type: "checkbox" },
    { name: "order", label: "Display order", type: "number" },
  ],
};

export const EMPTY_VALUES: Record<string, Record<string, any>> = {
  projects: {
    title: "",
    summary: "",
    description: "",
    breakdown: "",
    metrics: "",
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
  blog: {
    title: "",
    slug: "",
    description: "",
    body: "",
    imageUrl: "",
    tags: "",
    published: false,
    publishedAt: "",
    order: 0,
  },
  opensource: {
    title: "",
    summary: "",
    description: "",
    stack: "",
    repoUrl: "",
    liveUrl: "",
    imageUrl: "",
    stars: 0,
    featured: false,
    order: 0,
  },
};

export function toPayload(tab: string, values: Record<string, any>) {
  const payload = { ...values };

  if (
    (tab === "projects" || tab === "opensource") &&
    typeof payload.stack === "string"
  ) {
    payload.stack = payload.stack
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  if (tab === "blog" && typeof payload.tags === "string") {
    payload.tags = payload.tags
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  // metrics is stored as a plain string in the DB — send as-is
  if (payload.order !== undefined) payload.order = Number(payload.order) || 0;
  if (payload.proficiency !== undefined)
    payload.proficiency = Number(payload.proficiency) || 1;
  if (payload.stars !== undefined) payload.stars = Number(payload.stars) || 0;

  return payload;
}

export function toFormValues(tab: string, item: any) {
  const values = { ...EMPTY_VALUES[tab], ...item };

  if (
    (tab === "projects" || tab === "opensource") &&
    Array.isArray(item.stack)
  ) {
    values.stack = item.stack.join(", ");
  }

  if (tab === "blog" && Array.isArray(item.tags)) {
    values.tags = item.tags.join(", ");
  }

  if (tab === "projects") {
    values.metrics = Array.isArray(item.metrics)
      ? item.metrics
          .map((m: { label: string; value: string }) => `${m.label}:${m.value}`)
          .join("\n")
      : String(item.metrics ?? "");
  }

  if (tab === "certifications" && item.issuedDate) {
    values.issuedDate = String(item.issuedDate).slice(0, 10);
  }

  if (tab === "blog" && item.publishedAt) {
    values.publishedAt = String(item.publishedAt).slice(0, 10);
  }

  return values;
}
