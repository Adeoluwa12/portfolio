import AccessBadgeHero from "@/components/AccessBadgeHero";
import VideoIntro from "@/components/VideoIntro";
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
      <VideoIntro />
      <ScopesSkills skills={skills} />
      <CredentialsVault certifications={certifications} />
      <AccessLogProjects projects={projects} />
      <ContactForm />
      <footer className="border-t border-hairline py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-textDim text-xs">
          <span>© {new Date().getFullYear()} Oluwaferanmi David Adeoye</span>
          <span className="font-mono">oluferanmi-sec.me · Azure Cloud Security & DevSecOps</span>
        </div>
      </footer>
    </main>
  );
}
