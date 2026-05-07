const Spinner = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-8">
    {/* Outer rotating ring */}
    <div className="relative w-16 h-16">
      {/* Corner brackets */}
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-hud" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-hud" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-hud" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-hud" />

      {/* Spinning ring */}
      <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-hud border-r-hud animate-spin shadow-hud-sm" />

      {/* Inner diamond */}
      <div
        className="absolute inset-0 m-auto w-3 h-3 bg-hud animate-pulse-hud"
        style={{ transform: "rotate(45deg)", top: "50%", left: "50%", marginTop: "-6px", marginLeft: "-6px" }}
      />
    </div>

    {/* Loading text */}
    <div className="flex items-center gap-2">
      <span className="hud-label text-hud animate-flicker">LOADING</span>
      <span className="text-hud animate-blink font-mono text-lg leading-none">_</span>
    </div>

    {/* Progress bar */}
    <div className="w-32 h-[2px] bg-dim relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-hud shadow-hud-sm"
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

export default Spinner;