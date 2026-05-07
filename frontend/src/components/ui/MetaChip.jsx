const MetaChip = ({ label, value, variant = "hud", className = "" }) => {
  const variants = {
    hud: {
      container: "border-hud/40 bg-hud/10",
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
      className={`inline-flex flex-wrap items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${activeVariant.container} ${className}`}
    >
      <span className={`font-semibold ${activeVariant.label}`}>{label}</span>
      <span className={`break-all tracking-[0.08em] ${activeVariant.value}`}>{value}</span>
    </div>
  );
};

export default MetaChip;
