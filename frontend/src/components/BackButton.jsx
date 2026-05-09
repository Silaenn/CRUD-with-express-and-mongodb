import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/", label = "BACK_TO_DASHBOARD" }) => (
  <Link
    to={destination}
    className="group inline-flex items-center gap-0 font-mono text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.2em] text-hud transition-all duration-100 hover:text-glow-hud break-all"
  >
    {/* Chevron arrow image — flipped and shifted for perfect alignment */}
    <img
      src="/icons/chevron-yellow.png"
      alt=""
      className="w-8 sm:w-10 md:w-12 h-auto -ml-2 sm:-ml-3 -mr-1.5 sm:-mr-2 md:-mr-2.5 opacity-80 group-hover:opacity-100 transition-opacity duration-100"
      style={{ imageRendering: "pixelated" }}
    />

    <span className="group-hover:text-glow-hud transition-all duration-100">
      {label}
    </span>
  </Link>
);

BackButton.propTypes = {
  destination: PropTypes.string,
  label: PropTypes.string,
};

export default BackButton;
