import AccessBadgeHero from "@/components/AccessBadgeHero";
import ScopesSkills from "@/components/ScopesSkills";
import CredentialsVault from "@/components/CredentialsVault";
import AccessLogProjects from "@/components/AccessLogProjects";
import ContactForm from "@/components/ContactForm";
import { getCertifications, getProjects, getSkills } from "@/lib/api";

export default async function Home() {
  const [skills, certifications, projects] = await Promise.allSettled([
    getSkills(),
    getCertifications(),
    getProjects(),
  ]).then((results) => results.map((r) => (r.status === "fulfilled" ? r.value : null)));

  return (
    <main>
      <AccessBadgeHero />
      <ScopesSkills skills={skills} />
      <CredentialsVault certifications={certifications} />
      <AccessLogProjects projects={projects} />
      <ContactForm />
      <footer className="text-center py-10 text-textDim text-xs font-mono">
        oluferanmi-sec.me · Lagos, Nigeria
      </footer>
    </main>
  );
}