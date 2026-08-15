export function ResumeButton() {
  return (
    <a
      href="/resume.pdf"
      download="Sairam_BN_Resume.pdf"
      className="group fixed right-4 top-4 z-[60] flex h-11 items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3.5 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.8)_inset] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.16)] sm:right-5 sm:top-5 sm:h-12 sm:px-4"
      title="Download resume"
      aria-label="Download resume"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="text-[#f5a623] transition-transform duration-300 group-hover:scale-105"
        aria-hidden
      >
        <path
          d="M3.5 7.5h6.2l1.6 1.8H20.5a1.5 1.5 0 0 1 1.5 1.5v8.2a1.5 1.5 0 0 1-1.5 1.5H3.5A1.5 1.5 0 0 1 2 19V9a1.5 1.5 0 0 1 1.5-1.5Z"
          fill="currentColor"
          opacity="0.95"
        />
        <path
          d="M3.5 7.5h5.8l1.4 1.6H3.5V7.5Z"
          fill="#e8940a"
        />
      </svg>
      <span className="hidden text-[13px] font-semibold tracking-tight text-foreground sm:inline">
        Resume
      </span>
    </a>
  );
}
