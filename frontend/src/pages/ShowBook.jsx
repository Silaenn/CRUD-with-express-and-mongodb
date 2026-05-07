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
      <span className="hud-label text-muted md:w-36 lg:w-40 flex items-center gap-2">
        <span className="w-1 h-1 bg-hud rotate-45 inline-block opacity-50 group-hover:opacity-100 transition-opacity" />
        {label}
      </span>
      {/* Value */}
      <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-smoke uppercase tracking-tight group-hover:text-hud transition-colors duration-150 break-words">
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
          <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-end">
            <div>
              <h1 className="font-display text-[clamp(2.4rem,10vw,6rem)] leading-none tracking-tight uppercase text-smoke">
                DETAILS
              </h1>
              <div className="hazard-bar-sm w-full mt-2" />
            </div>
            <div className="mb-1">
              <BackButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8">
        {loading ? (
          <Spinner />
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
            <div className="flex items-center gap-3 my-6">
              <div className="w-2 h-2 border border-hud/40 rotate-45" />
              <div className="flex-1 h-[1px] bg-border" />
              <div className="w-2 h-2 border border-danger/40 rotate-45" />
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
