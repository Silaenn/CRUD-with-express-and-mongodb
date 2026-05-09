import { Link } from "react-router-dom";

const BackButton = ({ destination = "/", label = "BACK_TO_DASHBOARD" }) => (
  <Link
    to={destination}
    className="group inline-flex items-center gap-0 font-mono text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.2em] text-hud transition-all duration-100 hover:text-glow-hud break-all"
  >
    {/* Chevron arrow image — flipped horizontal for back direction */}
    <img
      src="/icons/chevron-yellow.png"
      alt=""
      className="w-10 h-auto -mr-1 opacity-80 group-hover:opacity-100 transition-opacity duration-100"
      style={{ imageRendering: "pixelated" }}
    />

    <span className="group-hover:text-glow-hud transition-all duration-100">
      {label}
    </span>
  </Link>
);

export default BackButton;
