import { useState } from "react";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";

const BookSingleCard = ({ book, index }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="group relative border-b border-r border-hud/20 p-6 h-[360px] flex flex-col justify-between overflow-hidden transition-all duration-150 hover:border-hud/60 hover:bg-obsidian cursor-pointer"
        style={{ background: "rgba(10,10,15,0.8)" }}
      >
        {/* Corner brackets — visible on hover */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-hud/0 group-hover:border-hud transition-all duration-150" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-hud/0 group-hover:border-hud transition-all duration-150" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-hud/0 group-hover:border-hud transition-all duration-150" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-hud/0 group-hover:border-hud transition-all duration-150" />

        {/* Neon glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
          style={{ boxShadow: "inset 0 0 30px rgba(255,184,0,0.05)" }}
        />

        {/* Icon placeholder — pojok kanan bawah watermark */}
        <img src="/icons/tribal-flame.png" className="absolute bottom-16 right-4 w-12 opacity-50 group-hover:opacity-80 transition-opacity duration-150" />

        {/* Top row */}
        <div className="flex justify-between items-start">
          <span className="font-display text-3xl text-hud/20 group-hover:text-hud/60 transition-all duration-150 group-hover:text-glow-hud">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col items-end gap-1">
            <span className="hud-tag">{book.publishYear}</span>
            {/* Scan line micro decoration */}
            <div className="w-8 h-[1px] bg-hud/30 group-hover:bg-hud/60 transition-colors duration-150" />
          </div>
        </div>

        {/* Book info */}
        <div className="mt-4 flex-1 flex flex-col justify-end">
          {/* Hazard micro bar */}
          <div className="w-8 h-[3px] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            style={{
              background: "repeating-linear-gradient(90deg, #FFB800 0px, #FFB800 4px, transparent 4px, transparent 8px)"
            }}
          />

          <h2 className="font-display text-xl leading-tight mb-2 uppercase tracking-wide text-smoke group-hover:text-hud transition-colors duration-150 break-words">
            {book.title}
          </h2>
          <h4 className="font-mono text-xs tracking-widest uppercase text-muted">
            {book.author}
          </h4>
        </div>

        {/* Actions — slide up on hover */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-hud/0 group-hover:border-hud/20 transition-all duration-150 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => setShowModal(true)}
            className="font-mono text-hud-xs uppercase tracking-widest text-hud border-b border-hud/50 hover:border-hud pb-0.5 transition-colors duration-100 hover:text-glow-hud"
          >
            [VIEW]
          </button>
          <Link
            to={`/books/details/${book._id}`}
            className="font-mono text-hud-xs uppercase tracking-widest text-muted border-b border-muted/30 hover:text-hud hover:border-hud pb-0.5 transition-colors duration-100"
          >
            [INFO]
          </Link>
          <Link
            to={`/books/edit/${book._id}`}
            className="font-mono text-hud-xs uppercase tracking-widest text-muted border-b border-muted/30 hover:text-hud hover:border-hud pb-0.5 transition-colors duration-100"
          >
            [EDIT]
          </Link>
          <Link
            to={`/books/delete/${book._id}`}
            className="font-mono text-hud-xs uppercase tracking-widest text-danger border-b border-danger/50 hover:border-danger pb-0.5 transition-colors duration-100 hover:text-glow-danger"
          >
            [DELETE]
          </Link>
        </div>
      </div>

      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default BookSingleCard;