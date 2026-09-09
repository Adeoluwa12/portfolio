"use client";

import { useState } from "react";

const INITIAL_COUNT = 3;

/* ─── fallback data ─────────────────────────────────────────────────────── */

const FALLBACK_PROJECTS = [
  {
    title: "Azure Zero Trust Security Architecture",
    summary:
      "End-to-end Zero Trust implementation on Azure — Entra ID conditional access, Defender for Cloud CSPM, Microsoft Sentinel SIEM with custom KQL detection rules, and Privileged Identity Management for just-in-time access.",
    stack: ["Entra ID", "Defender for Cloud", "Microsoft Sentinel", "PIM"],
  },
  {
    title: "DevSecOps Pipeline with Azure DevOps",
    summary:
      "Security-first CI/CD pipeline integrating Checkov for IaC scanning, Trivy for container image scanning, OWASP ZAP for DAST, and GitHub Advanced Security for secrets detection — all gating deployments in Azure DevOps.",
    stack: ["Azure DevOps", "Checkov", "Trivy", "GitHub Actions", "OPA"],
  },
  {
    title: "Hardened Azure Infrastructure with Bicep & Key Vault",
    summary:
      "Bicep-based IaC provisioning Key Vault, storage, and AKS under Zero Trust principles — no hardcoded secrets, managed identity auth, least-privilege RBAC, and Azure Policy guardrails enforced at the subscription level.",
    stack: ["Azure", "Bicep", "Key Vault", "Azure Policy", "AKS"],
  },
];

/* ─── modal ─────────────────────────────────────────────────────────────── */

function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-surface border border-hairline rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-7 sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-xs text-textDim hover:text-text transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-48 object-cover rounded-xl mb-6 border border-hairline"
          />
        )}

        <h3 className="font-display text-2xl font-semibold text-text mb-2">{project.title}</h3>
        <p className="text-textDim text-sm leading-relaxed mb-5">{project.summary}</p>

        {project.description && (
          <p className="text-text text-sm leading-relaxed mb-5 whitespace-pre-line">
            {project.description}
          </p>
        )}

        {project.breakdown && (
          <div className="mb-5">
            <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">Breakdown</p>
            <p className="text-textDim text-sm leading-relaxed whitespace-pre-line">{project.breakdown}</p>
          </div>
        )}

        {/* metrics — stored as "label:value" lines */}
        {(() => {
          const raw = project.metrics;
          const parsed: { label: string; value: string }[] = Array.isArray(raw)
            ? raw
            : typeof raw === "string"
            ? raw
                .split("\n")
                .map((l: string) => l.trim())
                .filter(Boolean)
                .map((l: string) => {
                  const idx = l.indexOf(":");
                  return idx === -1
                    ? { label: l, value: "" }
                    : { label: l.slice(0, idx).trim(), value: l.slice(idx + 1).trim() };
                })
            : [];
          return parsed.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {parsed.map((m) => (
                <div key={m.label} className="card px-3 py-3 text-center">
                  <div className="font-display text-lg font-semibold text-accent">{m.value}</div>
                  <div className="text-textDim text-xs mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          ) : null;
        })()}

        <ul className="flex flex-wrap gap-2 mb-6">
          {(project.stack || []).map((tech: string) => (
            <li
              key={tech}
              className="font-mono text-xs px-2.5 py-1 rounded-md bg-surfaceAlt border border-hairline text-textDim"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex gap-4 font-mono text-xs">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── project card ───────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: any;
  index: number;
  onClick: () => void;
}) {
  return (
    <article
      className="card p-6 sm:p-8 hover:border-accent/30 group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="flex items-start gap-5">
        <span className="font-mono text-accent/40 text-2xl font-medium leading-none pt-0.5 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
            <h3 className="font-display text-xl font-semibold text-text group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-textDim group-hover:text-accent transition-colors">
              View details →
            </span>
          </div>
          <p className="text-textDim text-sm leading-relaxed mb-5">{project.summary}</p>
          <ul className="flex flex-wrap gap-2">
            {(project.stack || []).map((tech: string) => (
              <li
                key={tech}
                className="font-mono text-xs px-2.5 py-1 rounded-md bg-surfaceAlt border border-hairline text-textDim"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/* ─── open source card ───────────────────────────────────────────────────── */

function OpenSourceCard({ project }: { project: any }) {
  return (
    <a
      href={project.repoUrl || project.liveUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 card p-5 hover:border-accent/30 transition-colors"
    >
      {/* header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {/* repo icon */}
          <svg
            className="shrink-0 text-accent/50 group-hover:text-accent transition-colors"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8V1.5Z" />
          </svg>
          <h4 className="font-display font-semibold text-text text-sm group-hover:text-accent transition-colors truncate">
            {project.title}
          </h4>
        </div>
        {typeof project.stars === "number" && project.stars > 0 && (
          <span className="font-mono text-xs text-textDim shrink-0 flex items-center gap-1">
            ★ {project.stars}
          </span>
        )}
      </div>

      {/* summary */}
      {project.summary && (
        <p className="text-textDim text-xs leading-relaxed line-clamp-2">{project.summary}</p>
      )}

      {/* stack */}
      {project.stack?.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map((tech: string) => (
            <li
              key={tech}
              className="font-mono text-xs px-2 py-0.5 rounded bg-surfaceAlt border border-hairline text-textDim"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      {/* links row */}
      <div className="flex gap-3 font-mono text-xs mt-1">
        {project.repoUrl && (
          <span className="text-accent opacity-70 group-hover:opacity-100 transition-opacity">
            Repo →
          </span>
        )}
        {project.liveUrl && (
          <span className="text-accent opacity-70 group-hover:opacity-100 transition-opacity">
            Live →
          </span>
        )}
      </div>
    </a>
  );
}

/* ─── main export ────────────────────────────────────────────────────────── */

export default function AccessLogProjects({
  projects,
  openSource,
}: {
  projects?: any[];
  openSource?: any[];
}) {
  const data = projects?.length ? projects : FALLBACK_PROJECTS;
  const osData: any[] = openSource?.length ? openSource : [];

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selected, setSelected] = useState<any | null>(null);

  const visibleProjects = data.slice(0, visibleCount);
  const hasMore = visibleCount < data.length;

  return (
    <section id="projects" className="bg-surface border-y border-hairline py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── selected projects ── */}
        <div className="mb-12">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Selected projects</h2>
        </div>

        <div className="flex flex-col gap-5">
          {visibleProjects.map((project: any, index: number) => (
            <ProjectCard
              key={project._id || project.title}
              project={project}
              index={index}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount(data.length)}
              className="focus-ring font-mono text-xs px-5 py-2.5 rounded-md border border-hairline text-textDim hover:border-accent hover:text-accent transition-colors"
            >
              View all projects ({data.length})
            </button>
          </div>
        )}

        {/* ── open source ── */}
        {osData.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <p className="section-label">Open Source</p>
              <h2 className="section-title">Open source contributions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {osData.map((project: any) => (
                <OpenSourceCard key={project._id || project.title} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
