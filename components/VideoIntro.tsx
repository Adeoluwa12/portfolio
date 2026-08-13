export default function VideoIntro({ videoUrl }: { videoUrl?: string }) {
  const src = videoUrl || "/video/videomine.mp4";

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="font-mono text-xs text-vault uppercase tracking-widest mb-2">
        Introduction
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-text mb-8">
        A quick word
      </h2>
      <video
        key={src}
        controls
        preload="metadata"
        className="w-full rounded-lg border border-hairline bg-surface"
      >
        <source src={src} type="video/mp4" />
        Your browser doesn't support embedded video — you can download it directly instead.
      </video>
    </section>
  );
}