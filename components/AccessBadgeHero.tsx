import Image from "next/image";

const HIGHLIGHTS = [
  { value: "7×", label: "Microsoft Certified" },
  { value: "Azure", label: "Cloud Security" },
  { value: "Zero Trust", label: "DevSecOps" },
];

export default function AccessBadgeHero({ imageUrl }: { imageUrl?: string }) {
  const src = imageUrl || "/image/imagemine.png";
  const isRemote = src.startsWith("http");

  return (
    <section id="about" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/40 to-accent/5 blur-sm" />
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-hairline bg-surface">
                {isRemote ? (
                  <img
                    key={src}
                    src={src}
                    alt="Oluwaferanmi David Adeoye"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    key={src}
                    src={src}
                    alt="Oluwaferanmi David Adeoye"
                    fill
                    sizes="(max-width: 640px) 192px, 224px"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-4">
              Cloud Security Engineer · DevSecOps
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-text tracking-tight leading-[1.1] mb-5">
              Oluwaferanmi
              <br />
              David Adeoye
            </h1>
            <p className="text-textDim text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Azure cloud security engineer focused on Zero Trust architecture, Defender for
              Cloud, and baking security into CI/CD pipelines. Based in Lagos, Nigeria — open
              to remote opportunities.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <a href="#projects" className="btn-primary">
                View projects
              </a>
              <a href="#contact" className="btn-secondary">
                Get in touch
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label} className="card px-3 py-4 text-center lg:text-left">
                  <div className="font-display text-lg sm:text-xl font-semibold text-accent">
                    {item.value}
                  </div>
                  <div className="text-textDim text-xs mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

