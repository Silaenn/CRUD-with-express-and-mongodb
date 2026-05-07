import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => (
  <Link
    to={destination}
    className="group inline-flex items-center gap-3 font-mono text-hud-sm uppercase tracking-widest text-hud transition-all duration-100 hover:text-glow-hud"
  >
    {/* Chevron arrow image — flipped horizontal */}
    <img
      src="/icons/chevron-yellow.png"
      alt=""
      className="w-8 h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-100"
      style={{ imageRendering: "pixelated", transform: "scaleX(1)" }}
    />

    <span className="group-hover:text-glow-hud transition-all duration-100">
      BACK_TO_DASHBOARD
    </span>
  </Link>
);

export default BackButton;