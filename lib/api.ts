const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function get(path: string) {
  const res = await fetch(`${API_URL}/api${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

export const getProjects = () => get("/projects");
export const getCertifications = () => get("/certifications");
export const getSkills = () => get("/skills");
export const getSettings = () => get("/settings");

export async function submitContact(payload: {
  name: string;
  email: string;
  subject?: string;
  body: string;
  honeypot?: string;
}) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to send message");
  return data;
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data.token as string;
}
