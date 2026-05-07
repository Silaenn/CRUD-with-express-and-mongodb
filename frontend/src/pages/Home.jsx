import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import BooksCard from "../components/home/BooksCard";
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
      <header className="relative px-6 pt-8 pb-6 border-b border-hud/30 overflow-hidden">
        {/* Background circuit decoration */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,184,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        {/* HUD top-left coordinate */}
        <div className="hud-coords mb-4">SYS://LIBRARY_DATABASE/ROOT</div>

        <div className="flex justify-between items-end gap-4">
          <div className="relative flex items-end gap-6">
            {/* Skull on fire — accent kiri */}
            <img
              src="/icons/skull-fire.png"
              alt=""
              className="w-20 md:w-28 h-auto opacity-80 mb-2 flex-shrink-0"
              style={{ imageRendering: "pixelated" }}
            />
            <div>
              <h1
                className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tighter uppercase text-smoke animate-flicker"
                data-text="BOOKS"
              >
                BOOKS
              </h1>
              {/* Glitch underline */}
              <div className="hazard-bar-sm w-full mt-2" />
            </div>
          </div>

          <div className="mb-2 flex flex-col items-end gap-2">
            {/* Record count badge */}
            <span className="hud-coords">{books.length} RECORDS_FOUND</span>
            <Link to="/books/create" className="btn-hud">
              [+] ADD_ENTRY
            </Link>
          </div>
        </div>

        {/* Bottom HUD line */}
        <div className="flex items-center gap-4 mt-4">
          {/* Crosshair */}
          <img
            src="/icons/crosshair.png"
            alt=""
            className="w-6 h-6 opacity-60 animate-pulse-hud flex-shrink-0"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="flex-1 h-[1px] bg-hud/20" />
          <span className="hud-coords">ACCESS_LEVEL: PUBLIC</span>
          <div className="flex-1 h-[1px] bg-hud/20" />
          {/* Data link small decoration */}
          <img
            src="/icons/data-link.png"
            alt=""
            className="w-6 h-6 opacity-30 flex-shrink-0"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </header>

      {/* Main */}
      <main>
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