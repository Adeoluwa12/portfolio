const FALLBACK_CERTS = [
  { code: "AZ-104", name: "Azure Administrator Associate" },
  { code: "SC-200", name: "Security Operations Analyst Associate" },
  { code: "SC-300", name: "Identity and Access Administrator Associate" },
  { code: "SC-401", name: "Information Security Administrator Associate" },
  { code: "SC-500", name: "Microsoft Cloud and AI Security Engineer Associate" },
  { code: "SC-900", name: "Security, Compliance, and Identity Fundamentals" },
  { code: "AZ-900", name: "Azure Fundamentals" },
  { code: "KCNA", name: "Kubernetes and Cloud Native Associate" },
];

export default function CredentialsVault({ certifications }: { certifications?: any[] }) {
  const data = certifications?.length
    ? certifications
    : FALLBACK_CERTS.map((c) => ({ ...c, issuer: c.code === "KCNA" ? "CNCF" : "Microsoft" }));

  return (
    <section id="certifications" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
      <div className="mb-12">
        <p className="section-label">Credentials</p>
        <h2 className="section-title">Certifications &amp; education</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {data.map((cert: any) => (
          <div
            key={cert.code}
            className="card p-5 flex flex-col gap-2 hover:border-accent/30 group"
          >
            <span className="font-mono text-accent text-sm font-medium group-hover:text-accentDim transition-colors">
              {cert.code}
            </span>
            <span className="text-text text-sm font-medium leading-snug">{cert.name}</span>
            <span className="text-textDim text-xs mt-auto">{cert.issuer}</span>
          </div>
        ))}
      </div>

      <div className="card p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
          </svg>
        </div>
        <div>
          <p className="text-text font-medium text-sm">B.Sc, Chemistry</p>
          <p className="text-textDim text-sm">University of Ibadan, Nigeria · 2019–2024</p>
        </div>
      </div>
    </section>
  );
}
