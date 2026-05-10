import PropTypes from "prop-types";
import BookSingleCard from "./BookSingleCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BooksCard = ({ books, onDelete }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {books.length === 0 ? (
        <motion.div 
          className="col-span-full flex flex-col items-center justify-center py-8 sm:py-16 px-3 sm:px-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="hud-panel w-full max-w-xl sm:max-w-2xl bg-void/60 backdrop-blur-sm border border-hud/20 p-10 sm:p-10 flex flex-col items-center gap-6 sm:gap-7 overflow-hidden relative">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-circuit opacity-[0.03] pointer-events-none" />
            {/* Scanline decoration */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-hud/20 animate-scanline-v pointer-events-none" />

            {/* Icon */}
            <div className="relative">
              <div className="absolute -inset-5 border border-hud/5 rounded-full animate-pulse-hud" />
              <div className="absolute -inset-2.5 border border-hud/10 rounded-full" />
              <img
                src="/icons/tribal-flame.png"
                alt=""
                className="w-10 xs:w-12 sm:w-16 h-auto opacity-70 relative z-10"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            {/* Title */}
            <div className="mt-2 flex flex-col items-center gap-1.5 relative z-10 text-center">
              <h3 className="font-display text-lg xs:text-xl sm:text-2xl text-hud tracking-[0.15em] sm:tracking-[0.2em] uppercase text-glow-hud">
                SYSTEM_EMPTY
              </h3>
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-5 sm:w-8 bg-hud/30" />
                <p className="hud-label text-muted text-[9px] xs:text-[10px] sm:text-xs whitespace-nowrap">
                  LOG_ID: 0x00_NULL_RECORDS
                </p>
                <span className="h-[1px] w-5 sm:w-8 bg-hud/30" />
              </div>
            </div>

            {/* Body text */}
            <p className="font-mono text-[10px] xs:text-xs sm:text-sm text-smoke/60 text-center max-w-[260px] xs:max-w-xs sm:max-w-sm leading-relaxed relative z-10">
              Database scan complete. No active data packets detected.
              User initialization required to populate the local library module.
            </p>

            {/* CTA */}
            <div className="relative z-10 w-full flex justify-center">
              <Link
                to="/books/create"
                className="btn-hud group flex items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto text-[10px] xs:text-xs sm:text-sm px-4 py-2.5"
              >
                <span className="text-hud-xs opacity-50 group-hover:opacity-100 transition-opacity hidden sm:block">
                  0x01
                </span>
                <span>[+] INITIALIZE_NEW_ENTRY</span>
              </Link>
            </div>

            {/* Decorative HUD metadata — hanya muncul di sm ke atas */}
            <div className="absolute top-3 left-3 hud-coords opacity-100 hidden sm:block text-[8px] leading-relaxed">
              LAT: 35.6895<br />
              LNG: 139.6917
            </div>
            <div className="absolute bottom-3 right-3 hud-coords opacity-100 text-right hidden sm:block text-[8px] leading-relaxed">
              STATUS: STANDBY<br />
              SIGNAL: LOW
            </div>
          </div>
        </motion.div>
      ) : (
        books.map((item, index) => (
          <BookSingleCard key={item._id} book={item} index={index} onDelete={onDelete} />
        ))
      )}
    </motion.div>
  );
};


BooksCard.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BooksCard;
