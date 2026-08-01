export default function VideoIntro() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <p className="section-label">About</p>
          <h2 className="section-title mb-6">Building secure cloud foundations</h2>
          <div className="space-y-4 text-textDim text-sm sm:text-base leading-relaxed">
            <p>
              I specialize in Azure cloud security — designing and implementing Zero Trust
              architectures, Defender for Cloud posture management, Microsoft Sentinel SIEM/SOAR,
              and identity governance with Microsoft Entra ID.
            </p>
            <p>
              On the DevSecOps side, I embed security controls directly into CI/CD pipelines:
              secrets scanning, IaC security with Checkov and Bicep, container image scanning,
              and policy-as-code with Azure Policy and OPA. I use Terraform and Bicep to
              provision hardened, least-privilege infrastructure at scale.
            </p>
            <p>
              With seven Microsoft certifications and hands-on experience across the full Azure
              security stack, I bridge the gap between security policy, platform engineering,
              and developer workflows.
            </p>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-textDim mb-3">Introduction video</p>
          <video
            controls
            preload="metadata"
            className="w-full rounded-xl border border-hairline bg-surfaceAlt shadow-lg"
          >
            <source src="/video/videomine.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      </div>
    </section>
  );
}
