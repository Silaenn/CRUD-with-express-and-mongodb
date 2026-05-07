import { Link } from "react-router-dom";

const BackButton = ({ destination = "/", label = "BACK_TO_DASHBOARD" }) => (
  <Link
    to={destination}
    className="group inline-flex items-center gap-2 sm:gap-3 font-mono text-[0.65rem] sm:text-hud-sm uppercase tracking-[0.18em] sm:tracking-widest text-hud transition-all duration-100 hover:text-glow-hud break-all"
  >
    {/* Chevron arrow image — flipped horizontal */}
    <img
      src="/icons/chevron-yellow.png"
      alt=""
      className="w-6 sm:w-8 h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-100"
      style={{ imageRendering: "pixelated", transform: "scaleX(1)" }}
    />

    <span className="group-hover:text-glow-hud transition-all duration-100">
      {label}
    </span>
  </Link>
);

export default BackButton;
