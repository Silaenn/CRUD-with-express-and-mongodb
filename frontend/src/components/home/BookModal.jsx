import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight, PiCalendarBlank, PiUserFocus } from "react-icons/pi";
import { BiInfoCircle } from "react-icons/bi";

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(5,5,8,0.85)", backdropFilter: "blur(8px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-obsidian border border-hud/30 animate-in fade-in zoom-in duration-200 overflow-hidden"
        style={{ boxShadow: "0 0 60px rgba(255,184,0,0.1), inset 0 0 40px rgba(255,184,0,0.02)" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        ref={modalRef}
      >
        {/* Scanning Line Animation — Behind content (z-0) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute left-0 w-full h-[2px] bg-hud/40 shadow-[0_0_20px_#FFB800] opacity-100 animate-scanline-v" />
        </div>

        {/* Decorative Watermark */}
        <img 
          src="/icons/tribal-flame.png" 
          alt="" 
          className="absolute bottom-72 -right-0 w-40 opacity-[0.08] pointer-events-none grayscale" 
        />

        {/* Corner brackets */}
        <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-hud z-10" />
        <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-hud z-10" />
        <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-hud z-10" />
        <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-hud z-10" />

        {/* Hazard top bar */}
        <div className="hazard-bar-sm w-full relative z-10" />

        {/* Header Section */}
        <div className="relative px-6 py-5 border-b border-hud/10 bg-void/50 z-10">
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center border border-hud/20 bg-hud/5 rounded-sm">
                <img src="/icons/tribal-flame.png" alt="" className="w-10 h-8 opacity-80" />
              </div>
              <div>
                <span className="hud-label text-[0.6rem] block text-hud/80 mb-0.5">DATA_STREAM :: ACCESSED</span>
                <h1 className="font-display text-xl text-smoke tracking-wider uppercase" id="book-modal-title">RECORD_VIEW</h1>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-hud/20 text-muted hover:text-hud hover:border-hud transition-all duration-150 focus-visible:outline-none"
              aria-label="Close record view"
              ref={closeButtonRef}
            >
              <AiOutlineClose className="text-lg" />
            </button>
          </div>
          
          {/* Micro Meta Info */}
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 font-mono text-[0.6rem] text-hud/70 uppercase">
              <span className="w-1 h-1 bg-hud rotate-45" />
              STATUS: <span className="text-smoke">ENCRYPTED</span>
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.6rem] text-hud/70 uppercase">
              <span className="w-1 h-1 bg-hud rotate-45" />
              PRIORITY: <span className="text-smoke">LEVEL_01</span>
            </span>
            <div className="flex-1 h-[1px] bg-hud/10" />
            <span className="font-mono text-[0.6rem] text-muted">ID_REF: {book._id?.slice(-8).toUpperCase()}</span>
          </div>
        </div>

        {/* Body Section */}
        <div className="relative p-6 sm:p-8 z-10 bg-void/30">
          {/* Main Info Display */}
          <div className="flex flex-col gap-6">
            
            {/* Title Block */}
            <div className="group">
              <div className="flex items-center gap-2 mb-2">
                <PiBookOpenTextLight className="text-hud text-lg" />
                <span className="hud-label text-[0.65rem] text-hud/50">ENTRY_SUBJECT</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-smoke leading-none uppercase tracking-tight group-hover:text-hud transition-colors duration-300">
                {book.title}
              </h2>
            </div>

            {/* Grid for Author and Year */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-hud/10 bg-obsidian/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-hud/30" />
                <div className="flex items-center gap-2 mb-1.5">
                  <PiUserFocus className="text-hud-dim" />
                  <span className="hud-label text-[0.6rem]">ARCHIVE_AUTHOR</span>
                </div>
                <p className="font-mono text-sm text-smoke uppercase tracking-wide truncate">
                  {book.author}
                </p>
              </div>

              <div className="p-3 border border-hud/10 bg-obsidian/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-hud/30" />
                <div className="flex items-center gap-2 mb-1.5">
                  <PiCalendarBlank className="text-hud-dim" />
                  <span className="hud-label text-[0.6rem]">LOG_DATE</span>
                </div>
                <p className="font-mono text-sm text-smoke uppercase tracking-widest">
                  {book.publishYear}
                </p>
              </div>
            </div>

            {/* Analysis / System Log Section */}
            <div className="relative mt-2">
              <div className="flex items-center gap-3 mb-3">
                <BiInfoCircle className="text-hud/40" />
                <span className="hud-label text-[0.65rem]">SYSTEM_ANALYSIS</span>
                <div className="flex-1 h-[1px] bg-hud/10" />
              </div>
              
              <div className="font-mono text-[0.7rem] text-muted/80 leading-relaxed p-4 bg-void/60 border-l-2 border-hud/30 italic">
                <span className="text-hud-dim">{"[LOG_01]"}</span> Initializing database link...<br/>
                <span className="text-hud-dim">{"[LOG_02]"}</span> Entry confirmed: {book.title}.<br/>
                <span className="text-hud-dim">{"[LOG_03]"}</span> This record is registered under the authority of {book.author}. All rights reserved under Library Protocol 77-B.
              </div>
            </div>
          </div>
        </div>

        {/* Action / Footer Section */}
        <div className="relative px-6 py-4 bg-obsidian border-t border-hud/10 z-10 flex justify-between items-center">
          <div className="flex gap-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-1.5 bg-hud/20 rotate-45" />
            ))}
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-[0.2em] text-hud hover:text-smoke transition-colors py-1 px-3 border border-hud/0 hover:border-hud/30"
          >
            [ DISMISS_INTERFACE ]
          </button>
        </div>

        {/* Hazard bottom bar */}
        <div className="hazard-bar-sm w-full relative z-10" />
      </div>
    </div>
  );
};

BookModal.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookModal;
