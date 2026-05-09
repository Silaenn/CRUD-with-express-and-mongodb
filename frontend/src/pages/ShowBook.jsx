import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import MetaChip from "../components/ui/MetaChip";
import { API_URL } from "../config";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
  };

  const InfoRow = ({ label, value }) => (
    <div className="group py-6 sm:py-8 border-b border-hud/10 hover:border-hud/30 flex flex-col md:flex-row md:items-baseline gap-2 sm:gap-3 md:gap-10 transition-colors duration-150">
      {/* Label */}
      <span className="hud-label text-hud-dim text-sm sm:text-base md:w-36 lg:w-40 flex items-center gap-2">
        <span className="w-1 h-1 bg-hud rotate-45 inline-block opacity-50 group-hover:opacity-100 transition-opacity" />
        {label}
      </span>
      {/* Value */}
      <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-smoke tracking-[0.02em] group-hover:text-hud transition-colors duration-150 break-words">
        {value}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="relative border-b border-hud/30 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 sm:pt-8 pb-6">
          <MetaChip
            label="SYSTEM"
            value={`LIBRARY DATABASE · RECORD ${id?.slice(-6).toUpperCase()}`}
            className="mb-5"
          />
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Hazard bar kiri — tampil hanya di lg ke atas */}
              <div className="hidden lg:flex gap-1.5">
                <div
                  className="w-[7px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0"
                  style={{ background: "repeating-linear-gradient(45deg, #FFB800 0px, #FFB800 4px, #0a0a0f 4px, #0a0a0f 8px)" }}
                />
                <div className="w-[3px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 bg-hud/40" />
              </div>

              <h1 className="font-display text-[clamp(2.4rem,10vw,6rem)] leading-none tracking-tight uppercase text-smoke animate-flicker"
                style={{ textShadow: "0 0 40px rgba(255,184,0,0.4), 0 0 80px rgba(255,184,0,0.2)" }}>
                DETAILS
              </h1>

              {/* Hazard bar kanan — tampil hanya di bawah lg */}
              <div className="flex lg:hidden gap-1.5">
                <div className="w-[3px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 bg-hud/40" />
                <div
                  className="w-[7px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0"
                  style={{ background: "repeating-linear-gradient(45deg, #FFB800 0px, #FFB800 4px, #0a0a0f 4px, #0a0a0f 8px)" }}
                />
              </div>
            </div>
            
            <div className="mt-auto lg:ml-auto">
              <BackButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <div className="max-w-4xl">
            {/* Record badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="hud-tag">RECORD_DATA</span>
              <div className="flex-1 h-[1px] bg-hud/20" />
              <div className="w-2 h-2 bg-hud rotate-45 shadow-hud-sm animate-pulse" />
            </div>

            {/* Info rows */}
            <InfoRow label="TITLE"  value={book.title} />
            <InfoRow label="AUTHOR" value={book.author} />
            <InfoRow label="YEAR"   value={book.publishYear} />

            {/* Divider */}
            <div className="flex items-center gap-3 my-8 sm:my-10">
              <div className="w-2 h-2 bg-hud rotate-45 shadow-hud-sm animate-pulse" />
              <div className="flex-1 h-[1px] bg-hud/20" />
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <MetaChip label="ENTRY ID" value={book._id || "-"} className="w-full" />
              <MetaChip label="CREATED" value={formatDate(book.createdAt)} className="w-full" />
              <MetaChip label="LAST UPDATED" value={formatDate(book.updatedAt)} className="w-full md:col-span-2" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShowBook;
