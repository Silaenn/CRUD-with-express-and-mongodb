import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import BooksCard from "../components/home/BooksCard";
import MetaChip from "../components/ui/MetaChip";
import { API_URL } from "../config";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBooks = () => {
    setLoading(true);
    setErrorMessage("");
    axios
      .get(`${API_URL}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || "Failed to fetch records.");
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-void">

      {/* Header */}
      <header className="relative overflow-hidden">
        {/* Background circuit decoration */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,184,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 sm:pt-8 pb-6">
          <MetaChip label="SYSTEM" value="LIBRARY DATABASE · ROOT" className="mb-5" />

          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end">
            <div className="relative flex items-end gap-4 sm:gap-6">
              {/* <img
                src="/icons/skull-fire.png"
                alt=""
                className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto opacity-80 mb-1 sm:mb-2 flex-shrink-0"
                style={{ imageRendering: "pixelated" }}
              /> */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-[7px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0"
                  style={{
                    background: "repeating-linear-gradient(45deg, #FFB800 0px, #FFB800 4px, #0a0a0f 4px, #0a0a0f 8px)",
                  }}
                />
                <h1
                  className="font-display text-[clamp(2.75rem,11vw,10rem)] leading-none tracking-tight uppercase text-smoke animate-flicker"
                  data-text="BOOKS"
                >
                  BOOKS
                </h1>
              </div>
            </div>

            <div className="mb-1 flex items-stretch gap-3 self-start lg:self-auto lg:justify-end">
              <MetaChip label="RECORDS" value={`${books.length} FOUND`} className="h-12" />
              <Link to="/books/create" className="btn-hud h-12 inline-flex items-center">
                [+] ADD_ENTRY
              </Link>
            </div>
          </div>

          <div className="relative left-1/2 -translate-x-1/2 w-screen px-4 sm:px-6 md:px-10 lg:px-12 mt-4">
            <div className="max-w-none flex items-center gap-2 sm:gap-4">
            
            <div className="flex-1 h-[1px] bg-hud/20" />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-hud/80">
              ACCESS <span className="text-smoke">PUBLIC</span>
            </span>
            <div className="flex-1 h-[1px] bg-hud/20" />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pb-12">
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        ) : errorMessage ? (
          <div className="max-w-3xl mx-auto mt-12 border border-danger/40 bg-obsidian/80 p-6 sm:p-8">
            <p className="font-display text-2xl text-danger tracking-[0.04em]">DATA LINK FAILED</p>
            <p className="font-mono text-sm text-muted mt-3">{errorMessage}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-danger-hud h-11 inline-flex items-center" onClick={fetchBooks}>
                [!] RETRY_FETCH
              </button>
              <Link to="/books/create" className="btn-hud h-11 inline-flex items-center">
                [+] ADD_ENTRY
              </Link>
            </div>
          </div>
        ) : (
          <BooksCard books={books} />
        )}
      </main>

      {/* Footer HUD bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[3px] hazard-bar pointer-events-none opacity-40" />
    </div>
  );
};

export default Home;
