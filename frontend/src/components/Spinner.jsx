const Spinner = ({ variant = "hud" }) => {
  const c = variant === "danger" ? {
    bracket:  "border-danger",
    ring:     "border-t-danger border-r-danger",
    shadow:   "shadow-danger-sm",
    diamond:  "bg-danger",
    text:     "text-danger",
    bar:      "bg-danger",
  } : {
    bracket:  "border-hud",
    ring:     "border-t-hud border-r-hud",
    shadow:   "shadow-hud-sm",
    diamond:  "bg-hud",
    text:     "text-hud",
    bar:      "bg-hud",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="relative w-16 h-16">
        <span className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${c.bracket}`} />
        <span className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${c.bracket}`} />
        <span className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${c.bracket}`} />
        <span className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${c.bracket}`} />
        <div className={`absolute inset-2 rounded-full border-2 border-transparent ${c.ring} animate-spin ${c.shadow}`} />
        <div
          className={`absolute inset-0 m-auto w-3 h-3 ${c.diamond} animate-pulse-hud`}
          style={{ transform: "rotate(45deg)", top: "50%", left: "50%", marginTop: "-6px", marginLeft: "-6px" }}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className={`hud-label ${c.text} animate-flicker`}>LOADING</span>
        <span className={`${c.text} animate-blink font-mono text-lg leading-none`}>_</span>
      </div>
      <div className="w-32 h-[2px] bg-dim relative overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 ${c.bar} ${c.shadow}`}
          style={{ animation: "loadBar 1.5s ease-in-out infinite" }}
        />
      </div>
      <style>{`
        @keyframes loadBar {
          0%   { width: 0%;   left: 0%; }
          50%  { width: 60%;  left: 20%; }
          100% { width: 0%;   left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Spinner;