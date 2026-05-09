import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { API_URL } from "../../config";

const DeleteBookModal = ({ book, onClose, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    
    setLoading(true);
    axios
      .delete(`${API_URL}/books/${book._id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        if (onDelete) onDelete();
        if (onClose) onClose();
      })
      .catch((err) => {
        setLoading(false);
        const errorMessage = err.response?.data?.message || "Error occurred while deleting";
        enqueueSnackbar(errorMessage, { variant: "error" });
        console.log(err);
      });
  };

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative lg:max-w-2xl md:max-w-xl sm:max-w-lg max-w-md w-full bg-obsidian border border-danger/30 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0 0 40px rgba(255,45,45,0.12), inset 0 0 20px rgba(255,45,45,0.05)" }}
      >
        {/* Corner brackets — danger color */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-danger" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-danger" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-danger" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-danger" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="hud-tag-danger text-sm sm:text-base">[!] WARNING</span>
          <div className="flex-1 h-[1px] bg-danger/20" />
          <button 
            onClick={onClose}
            className="text-danger/50 hover:text-danger transition-colors font-mono text-xl"
          >
            [X]
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/icons/flame-red.png"
            alt=""
            className="w-20 h-auto mb-6 opacity-90 animate-pulse"
            style={{ imageRendering: "pixelated" }}
          />

          <h3 className="font-display text-2xl md:text-3xl leading-tight uppercase text-smoke mb-4">
            CONFIRM PERMANENT REMOVAL
          </h3>
          
          <div className="bg-danger/5 border border-danger/20 p-4 mb-6 w-full text-left">
             <p className="font-mono text-sm text-center text-danger/80 mb-1 tracking-wider uppercase">Record to be purged:</p>
             <p className="font-display text-xl text-center text-smoke uppercase">{book.title}</p>
          </div>

          <p className="font-mono text-xs text-muted/70 tracking-wider mb-8 uppercase leading-relaxed">
            THIS ACTION IS IRREVERSIBLE. ALL DATA ASSOCIATED WITH THIS RECORD WILL BE PERMANENTLY ERASED FROM THE ARCHIVES.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-6 w-full">
            <button
              onClick={handleDeleteBook}
              disabled={loading}
              className="btn-danger-hud w-full sm:w-auto"
            >
              {loading ? "[PURGING...]" : "[!] DELETE_PERMANENTLY"}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="font-mono text-sm uppercase tracking-[0.2em] text-muted hover:text-smoke transition-colors"
            >
              [CANCEL]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteBookModal.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

export default DeleteBookModal;
