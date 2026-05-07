import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(5,5,8,0.85)", backdropFilter: "blur(4px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[560px] max-w-full bg-obsidian border border-hud/30 animate-slide-in"
        style={{ boxShadow: "0 0 40px rgba(255,184,0,0.15), inset 0 0 40px rgba(255,184,0,0.03)" }}
      >
        {/* Corner brackets */}
        <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-hud" />
        <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-hud" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-hud" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-hud" />

        {/* Hazard top bar */}
        <div className="hazard-bar-sm w-full" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            {/* Icon placeholder — swap dengan icon hasil generate */}
            {/* <img src="/icons/diamond-ornament.png" className="w-4 h-4 opacity-70" /> */}
            <span className="hud-label text-hud">RECORD_VIEW</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hud-coords">ID:{book._id?.slice(-6).toUpperCase()}</span>
            <button
              onClick={onClose}
              className="text-muted hover:text-hud transition-colors duration-100 hover:text-glow-hud"
            >
              <AiOutlineClose className="text-lg" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Year badge */}
          <div className="mb-6 flex items-center gap-3">
            <span className="hud-tag">{book.publishYear}</span>
            {/* Decorative line */}
            <div className="flex-1 h-[1px] bg-hud/20" />
            <div className="w-2 h-2 bg-hud rotate-45 shadow-hud-sm" />
          </div>

          {/* Title */}
          <div className="flex items-start gap-3 mb-3">
            <PiBookOpenTextLight className="text-hud text-2xl mt-1 flex-shrink-0" />
            <h2 className="font-display text-2xl text-smoke leading-tight uppercase tracking-wide">
              {book.title}
            </h2>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 mb-6 pl-9">
            <BiUserCircle className="text-hud-dim text-lg flex-shrink-0" />
            <h4 className="font-mono text-sm text-muted uppercase tracking-widest">
              {book.author}
            </h4>
          </div>

          {/* Divider with diamond */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-[1px] bg-border" />
            <div className="w-2 h-2 bg-danger rotate-45" />
            <div className="flex-1 h-[1px] bg-border" />
          </div>

          {/* Description */}
          <p className="font-mono text-xs text-muted/70 leading-relaxed uppercase tracking-wide">
            {`// ENTRY: `}
            <span className="text-hud-dim">{book.title}</span>
            {` — authored by `}
            <span className="text-hud-dim">{book.author}</span>
            {`. Publication record logged in system database. Access level: PUBLIC.`}
          </p>

          {/* Circuit decoration placeholder */}
          {/* <img src="/icons/circuit-ornament.png" className="absolute bottom-4 right-4 w-16 opacity-10" /> */}
        </div>

        {/* Hazard bottom bar */}
        <div className="hazard-bar-sm w-full" />
      </div>
    </div>
  );
};

export default BookModal;