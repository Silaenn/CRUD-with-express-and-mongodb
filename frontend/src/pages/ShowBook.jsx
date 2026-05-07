import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
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
  }, []);

  const InfoRow = ({ label, value }) => (
    <div className="group py-8 border-b border-hud/10 hover:border-hud/30 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-12 transition-colors duration-150">
      {/* Label */}
      <span className="hud-label text-muted md:w-40 flex items-center gap-2">
        <span className="w-1 h-1 bg-hud rotate-45 inline-block opacity-50 group-hover:opacity-100 transition-opacity" />
        {label}
      </span>
      {/* Value */}
      <span className="font-display text-3xl md:text-5xl text-smoke uppercase tracking-tight group-hover:text-hud transition-colors duration-150">
        {value}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-void">
      {/* Header */}
      <header className="relative px-6 pt-8 pb-6 border-b border-hud/30 overflow-hidden">
        <div className="hud-coords mb-4">
          SYS://LIBRARY_DATABASE/RECORD/{id?.slice(-6).toUpperCase()}
        </div>
        <div className="flex justify-between items-end gap-4">
          <div>
            <h1 className="font-display text-5xl md:text-8xl leading-none tracking-tighter uppercase text-smoke">
              DETAILS
            </h1>
            <div className="hazard-bar-sm w-full mt-2" />
          </div>
          <div className="mb-2">
            <BackButton />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 md:px-12 py-6">
        {loading ? (
          <Spinner />
        ) : (
          <div className="max-w-3xl">
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
            <div className="flex flex-col gap-2">
              <p className="hud-coords">
                ENTRY_ID: <span className="text-hud-dim">{book._id}</span>
              </p>
              <p className="hud-coords">
                CREATED: <span className="text-hud-dim">{new Date(book.createdAt).toLocaleString()}</span>
              </p>
              <p className="hud-coords">
                LAST_UPDATED: <span className="text-hud-dim">{new Date(book.updatedAt).toLocaleString()}</span>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShowBook;