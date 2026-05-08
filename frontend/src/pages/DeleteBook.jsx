import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { API_URL } from "../config";
import MetaChip from "../components/ui/MetaChip";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${API_URL}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-void text-smoke">
      {/* Header — danger theme */}
      <header className="relative border-b border-danger/30 overflow-hidden">
        {/* Red tint overlay */}
        <div className="absolute inset-0 bg-danger/[0.03] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 sm:pt-8 pb-6">
          <MetaChip
            label="SYSTEM"
            value={`LIBRARY DATABASE · DELETE ${id?.slice(-6).toUpperCase()}`}
            variant="danger"
            className="mb-5"
          />

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Hazard bar kiri (merah) — tampil hanya di lg ke atas */}
              <div className="hidden lg:flex gap-1.5">
                <div
                  className="w-[7px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0"
                  style={{ background: "repeating-linear-gradient(45deg, #FF2D2D 0px, #FF2D2D 4px, #0a0a0f 4px, #0a0a0f 8px)" }}
                />
                <div className="w-[3px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 bg-danger/40" />
              </div>

              <h1
                className="font-display text-[clamp(2.4rem,10vw,6rem)] leading-none tracking-tight uppercase animate-flicker"
                style={{ color: "#FF2D2D", textShadow: "0 0 40px rgba(255,45,45,0.4), 0 0 80px rgba(255,45,45,0.2)" }}
              >
                DELETE
              </h1>

              {/* Hazard bar kanan (merah) — tampil hanya di bawah lg */}
              <div className="flex lg:hidden gap-1.5">
                <div className="w-[3px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 bg-danger/40" />
                <div
                  className="w-[7px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0"
                  style={{ background: "repeating-linear-gradient(45deg, #FF2D2D 0px, #FF2D2D 4px, #0a0a0f 4px, #0a0a0f 8px)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-10">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Spinner variant="danger" />
          </div>
        ) : (
          <div className="flex flex-col gap-8 max-w-2xl">
            {/* Warning panel */}
            <div
              className="relative border border-danger/30 bg-obsidian p-4 sm:p-6"
              style={{ boxShadow: "0 0 20px rgba(255,45,45,0.08), inset 0 0 20px rgba(255,45,45,0.03)" }}
            >
              {/* Corner brackets — danger color */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-danger" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-danger" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-danger" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-danger" />

              {/* Warning badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="hud-tag-danger">[!] WARNING</span>
                <div className="flex-1 h-[1px] bg-danger/20" />
              </div>

              {/* Flame red centerpiece */}
              <div className="flex justify-center mb-6">
                <img
                  src="/icons/flame-red.png"
                  alt=""
                  className="w-24 h-auto opacity-90"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 border-2 border-danger rotate-45" />
                <div className="w-3 h-3 border-2 border-danger/50 rotate-45" />
                <div className="w-3 h-3 border-2 border-danger/20 rotate-45" />
              </div>
              
              <h3 className="font-display text-2xl md:text-4xl leading-tight uppercase text-smoke mb-2">
                CONFIRM PERMANENT REMOVAL
              </h3>
              <p className="font-mono text-xs text-muted/80 tracking-[0.02em]">
                {"// THIS ACTION CANNOT BE UNDONE. RECORD WILL BE PERMANENTLY DELETED FROM DATABASE."}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={handleDeleteBook} className="btn-danger-hud">
                [!] DELETE_PERMANENTLY
              </button>
              <BackButton destination="/" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeleteBook;
