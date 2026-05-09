import PropTypes from "prop-types";

const MetaChip = ({ label, value, variant = "hud", className = "" }) => {
  const variants = {
    hud: {
      container: "border-hud/40 bg-hud/15",
      label: "text-hud",
      value: "text-smoke",
    },
    danger: {
      container: "border-danger/40 bg-danger/10",
      label: "text-danger",
      value: "text-smoke",
    },
  };

  const activeVariant = variants[variant] || variants.hud;

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-[0.72rem] ${activeVariant.container} ${className}`}
    >
      <span className={`font-semibold uppercase tracking-[0.14em] ${activeVariant.label}`}>{label}</span>
      <span className={`break-all normal-case tracking-[0.02em] ${activeVariant.value}`}>{value}</span>
    </div>
  );
};

MetaChip.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["hud", "danger"]),
  className: PropTypes.string,
};

export default MetaChip;
