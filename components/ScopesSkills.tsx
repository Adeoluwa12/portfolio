const FALLBACK_SKILLS = [
  { category: "azure", name: "Microsoft Defender for Cloud" },
  { category: "azure", name: "Microsoft Sentinel" },
  { category: "azure", name: "Azure Security Center" },
  { category: "azure", name: "Azure Firewall / NSGs" },
  { category: "azure", name: "Azure Key Vault" },
  { category: "azure", name: "Azure Policy" },
  { category: "identity", name: "Microsoft Entra ID" },
  { category: "identity", name: "Conditional Access" },
  { category: "identity", name: "PIM / Access Reviews" },
  { category: "identity", name: "Zero Trust" },
  { category: "identity", name: "IAM / RBAC" },
  { category: "devsecops", name: "CI/CD Security (GitHub Actions)" },
  { category: "devsecops", name: "Checkov / IaC Scanning" },
  { category: "devsecops", name: "Container Image Scanning" },
  { category: "devsecops", name: "Secrets Scanning" },
  { category: "devsecops", name: "OPA / Policy-as-Code" },
  { category: "devsecops", name: "SAST / DAST" },
  { category: "devops", name: "Terraform" },
  { category: "devops", name: "Bicep" },
  { category: "devops", name: "Kubernetes / AKS" },
  { category: "devops", name: "Docker" },
  { category: "devops", name: "Azure DevOps" },
  { category: "devops", name: "GitHub Actions" },
  { category: "monitoring", name: "Azure Monitor" },
  { category: "monitoring", name: "Log Analytics Workspace" },
  { category: "monitoring", name: "Prometheus / Grafana" },
  { category: "programming", name: "Python" },
  { category: "programming", name: "TypeScript / Node.js" },
  { category: "programming", name: "Bash / PowerShell" },
];

const CATEGORY_LABELS: Record<string, string> = {
  azure: "Azure Security",
  identity: "Identity & Access",
  devsecops: "DevSecOps",
  devops: "DevOps & Infrastructure",
  monitoring: "Observability",
  programming: "Development",
};

export default function ScopesSkills({ skills }: { skills?: any[] }) {
  const data = skills?.length ? skills : FALLBACK_SKILLS;
  const grouped = data.reduce((acc: Record<string, any[]>, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="bg-surface border-y border-hairline py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Technical skills</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="card p-6 hover:border-accent/30">
              <h3 className="font-medium text-text text-sm mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {CATEGORY_LABELS[category] || category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item.name}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-surfaceAlt text-textDim border border-hairline"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
