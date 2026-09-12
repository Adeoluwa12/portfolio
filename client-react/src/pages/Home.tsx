import { useEffect, useState } from "react";
import AccessBadgeHero from "@/components/AccessBadgeHero";
import ScopesSkills from "@/components/ScopesSkills";
import CredentialsVault from "@/components/CredentialsVault";
import AccessLogProjects from "@/components/AccessLogProjects";
import ContactForm from "@/components/ContactForm";
import {
  getSkills,
  getCertifications,
  getProjects,
  getOpenSourceProjects,
} from "@/lib/api";

export default function Home() {
  const [skills, setSkills] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [openSource, setOpenSource] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all data in parallel — each setter is independent so a single
    // failure doesn't block the rest of the page.
    getSkills().then(setSkills).catch(() => {});
    getCertifications().then(setCertifications).catch(() => {});
    getProjects().then(setProjects).catch(() => {});
    getOpenSourceProjects().then(setOpenSource).catch(() => {});
  }, []);

  return (
    <main>
      <AccessBadgeHero />
      <ScopesSkills skills={skills} />
      <CredentialsVault certifications={certifications} />
      <AccessLogProjects projects={projects} openSource={openSource} />
      <ContactForm />
      <footer className="text-center py-10 text-textDim text-xs font-mono">
        oluferanmi-sec.me · Lagos, Nigeria
      </footer>
    </main>
  );
}
