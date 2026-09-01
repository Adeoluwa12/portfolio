"use client";

import { useState } from "react";

const INITIAL_COUNT = 3;
const LOAD_MORE_COUNT = 3;

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

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <article className="card p-6 sm:p-8 hover:border-accent/30 group">
      <div className="flex items-start gap-5">
        <span className="font-mono text-accent/40 text-2xl font-medium leading-none pt-0.5 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
            <h3 className="font-display text-xl font-semibold text-text group-hover:text-accent transition-colors">
              {project.title}
            </h3>
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

export default function AccessLogProjects({ projects }: { projects?: any[] }) {
  const data = projects?.length ? projects : FALLBACK_PROJECTS;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleProjects = data.slice(0, visibleCount);
  const hasMore = visibleCount < data.length;

  return (
    <section id="projects" className="bg-surface border-y border-hairline py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
              className="focus-ring font-mono text-xs px-5 py-2.5 rounded-md border border-hairline text-textDim hover:border-accent hover:text-accent transition-colors"
            >
              See more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
