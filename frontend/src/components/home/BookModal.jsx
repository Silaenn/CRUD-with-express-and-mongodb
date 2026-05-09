import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

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
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        ref={modalRef}
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
            <img src="/icons/tribal-flame.png" alt="" className="w-8 h-8 opacity-70" />
            <span className="hud-label text-hud -ml-1.5" id="book-modal-title">RECORD_VIEW</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="inline-flex items-center rounded-sm border border-hud/40 bg-hud/10 px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.12em] text-hud">
              ID: <span className="ml-1 text-smoke">{book._id?.slice(-6).toUpperCase()}</span>
            </span>
            <button
              onClick={onClose}
              className="text-muted hover:text-hud transition-colors duration-100 hover:text-glow-hud focus-visible:outline-none focus-visible:text-hud"
              aria-label="Close record view"
              ref={closeButtonRef}
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
            <div className="w-2 h-2 bg-hud rotate-45 shadow-hud-sm animate-pulse" />
          </div>

          {/* Title */}
          <div className="flex items-start gap-3 mb-3">
            <PiBookOpenTextLight className="text-hud text-2xl mt-1 flex-shrink-0" />
            <h2 className="font-display text-2xl text-smoke leading-tight tracking-[0.02em] break-words">
              {book.title}
            </h2>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 mb-6">
            <BiUserCircle className="text-hud-dim text-lg flex-shrink-0" />
            <h4 className="font-mono text-sm text-muted tracking-[0.04em] break-words">
              {book.author}
            </h4>
          </div>

          {/* Divider with diamond */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-hud rotate-45 shadow-hud-sm animate-pulse" />
            <div className="flex-1 h-[1px] bg-hud/20" />
          </div>

          {/* Description */}
          <p className="font-mono text-[0.78rem] text-muted/80 leading-relaxed tracking-[0.02em]">
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
