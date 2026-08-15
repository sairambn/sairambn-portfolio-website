export function ResumeButton() {
  return (
    <a
      href="/resume.pdf"
      download="Sairam_BN_Resume.pdf"
      className="group fixed right-4 top-5 z-[60] flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-background/80 text-[1.35rem] shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background sm:right-6 sm:top-6 sm:h-12 sm:w-12 sm:text-[1.5rem]"
      title="Download resume"
      aria-label="Download resume"
    >
      <span
        className="select-none transition-transform duration-300 group-hover:scale-110"
        role="img"
        aria-hidden
      >
        📁
      </span>
      <span className="pointer-events-none absolute -bottom-9 right-0 whitespace-nowrap rounded-full border border-border/50 bg-background/95 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        Resume
      </span>
    </a>
  );
}
