import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => (
  <Link
    to={destination}
    className="group inline-flex items-center gap-3 font-mono text-hud-sm uppercase tracking-widest text-hud transition-all duration-100 hover:text-glow-hud"
  >
    {/* Arrow */}
    <span className="relative flex items-center gap-1">
      <span className="block w-6 h-[2px] bg-hud transition-all duration-100 group-hover:w-8 group-hover:shadow-hud-sm" />
      <span className="block w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-hud"
        style={{ borderRightColor: "#FFB800", marginLeft: "-4px" }}
      />
    </span>

    <span className="group-hover:text-glow-hud transition-all duration-100">
      BACK_TO_DASHBOARD
    </span>
  </Link>
);

export default BackButton;