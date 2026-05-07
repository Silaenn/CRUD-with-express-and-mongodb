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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-void">

      {/* Header */}
      <header className="relative border-b border-hud/30 overflow-hidden">
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
              <img
                src="/icons/skull-fire.png"
                alt=""
                className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto opacity-80 mb-1 sm:mb-2 flex-shrink-0"
                style={{ imageRendering: "pixelated" }}
              />
              <div>
                <h1
                  className="font-display text-[clamp(2.75rem,11vw,10rem)] leading-none tracking-tight uppercase text-smoke animate-flicker"
                  data-text="BOOKS"
                >
                  BOOKS
                </h1>
                <div className="hazard-bar-sm w-full mt-2" />
              </div>
            </div>

            <div className="mb-1 flex items-stretch gap-3 self-start lg:self-auto lg:justify-end">
              <MetaChip label="RECORDS" value={`${books.length} FOUND`} className="h-12" />
              <Link to="/books/create" className="btn-hud h-12 inline-flex items-center">
                [+] ADD_ENTRY
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 mt-4">
            <img
              src="/icons/crosshair.png"
              alt=""
              className="w-5 h-5 sm:w-6 sm:h-6 opacity-60 animate-pulse-hud flex-shrink-0"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="flex-1 h-[1px] bg-hud/20" />
            <MetaChip label="ACCESS" value="PUBLIC" className="px-2.5 py-1" />
            <div className="flex-1 h-[1px] bg-hud/20" />
            <img
              src="/icons/data-link.png"
              alt=""
              className="w-5 h-5 sm:w-6 sm:h-6 opacity-30 flex-shrink-0"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pb-12">
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner />
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
