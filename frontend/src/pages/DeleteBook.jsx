import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { API_URL } from "../config";

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
      <header className="relative px-6 pt-8 pb-6 border-b border-danger/30 overflow-hidden">
        {/* Red tint overlay */}
        <div className="absolute inset-0 bg-danger/[0.03] pointer-events-none" />

        <div className="hud-coords mb-4" style={{ color: "rgba(255,45,45,0.5)" }}>
          SYS://LIBRARY_DATABASE/DELETE/{id?.slice(-6).toUpperCase()}
        </div>

        <div className="flex justify-between items-end gap-4">
          <div>
            <h1
              className="font-display text-5xl md:text-8xl leading-none tracking-tighter uppercase"
              style={{ color: "#FF2D2D", textShadow: "0 0 30px rgba(255,45,45,0.4)" }}
            >
              DELETE
            </h1>
            {/* Red hazard bar */}
            <div className="hazard-bar-red w-full mt-2" style={{ height: "3px" }} />
          </div>
          <div className="mb-2">
            <BackButton />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 md:px-12 py-10">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-8 max-w-xl">
            {/* Warning panel */}
            <div className="relative border border-danger/30 bg-obsidian p-6"
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
              <p className="font-mono text-xs text-muted uppercase tracking-wide">
                // THIS ACTION CANNOT BE UNDONE. RECORD WILL BE PERMANENTLY DELETED FROM DATABASE.
              </p>
            </div>

            {/* Enemy bar — nama book sebagai "target" */}
            <img
              src="/icons/bar-enemy.png"
              alt="Target record"
              className="w-full max-w-sm opacity-80"
              style={{ imageRendering: "pixelated" }}
            />

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <img
                src="/icons/chevron-red.png"
                alt=""
                className="w-8 h-auto opacity-70"
                style={{ imageRendering: "pixelated" }}
              />
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