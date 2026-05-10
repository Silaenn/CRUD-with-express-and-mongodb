import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import BooksCard from "../components/home/BooksCard";
import MetaChip from "../components/ui/MetaChip";
import { API_URL } from "../config";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const headerVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <header className="relative overflow-hidden ">
        {/* Background circuit decoration */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,184,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,184,0,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-6 sm:pt-8 pb-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={headerVariants}>
            <MetaChip label="SYSTEM" value="LIBRARY DATABASE · ROOT" className="mb-5" />
          </motion.div>

          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end">
            <motion.div 
              className="relative flex items-center gap-3 sm:gap-4"
              variants={itemVariants}
            >
              {/* Hazard bar kiri — tampil hanya di lg ke atas */}
              <div className="hidden lg:flex gap-1.5">
                <div
                  className="w-[7px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0"
                  style={{ background: "repeating-linear-gradient(45deg, #FFB800 0px, #FFB800 4px, #0a0a0f 4px, #0a0a0f 8px)" }}
                />
                <div className="w-[3px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 bg-hud/40" />
              </div>

              <h1
                className="font-display text-[clamp(2.75rem,11vw,10rem)] leading-none tracking-tight uppercase text-smoke animate-flicker"
                style={{ textShadow: "0 0 40px rgba(255,184,0,0.4), 0 0 80px rgba(255,184,0,0.2)" }}
                data-text="BOOKS"
              >
                BOOKS
              </h1>

              {/* Hazard bar kanan — tampil hanya di bawah lg */}
              <div className="flex lg:hidden gap-1.5">
                <div className="w-[3px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 bg-hud/40" />
                <div
                  className="w-[7px] h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0"
                  style={{ background: "repeating-linear-gradient(45deg, #FFB800 0px, #FFB800 4px, #0a0a0f 4px, #0a0a0f 8px)" }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="mb-1 flex items-stretch gap-3 self-start lg:self-auto lg:justify-end"
              variants={itemVariants}
            >
              <MetaChip label="RECORDS" value={`${books.length} FOUND`} className="h-12" />
              <Link to="/books/create" className="btn-hud h-12 inline-flex items-center">
                [+] ADD_ENTRY
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="relative left-1/2 -translate-x-1/2 w-screen px-4 sm:px-6 md:px-10 lg:px-12 mt-4"
            variants={itemVariants}
          >
            <div className="max-w-none flex items-center gap-2 sm:gap-4">
            
            <div className="flex-1 h-[1px] bg-hud/20" />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-hud/80">
              ACCESS <span className="text-smoke">PUBLIC</span>
            </span>
            <div className="flex-1 h-[1px] bg-hud/20" />
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Main */}
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pb-12 flex-1 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {loading ? (
          <div className="flex justify-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : errorMessage ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 min-h-[60vh]">
            <div className="lg:max-w-2xl md:max-w-xl sm:max-w-lg max-w-md w-full border border-danger/30 bg-obsidian p-8 sm:p-10 relative text-center">
              {/* Minimalist HUD Accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-danger" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-danger" />

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-danger/50 rotate-45 animate-pulse" />
                  <div className="flex-1 h-[1px] bg-danger/20" />
                  <span className="hud-tag-danger">SYSTEM_ALERT</span>
                  <div className="flex-1 h-[1px] bg-danger/20" />
                  <div className="w-2 h-2 bg-danger/50 rotate-45 animate-pulse" />
                </div>

                <div className="space-y-3">
                  <h2 className="font-display text-2xl sm:text-3xl text-danger uppercase tracking-[0.1em]">LINK_FAILURE</h2>
                  <p className="font-mono text-sm text-muted/90 leading-relaxed uppercase max-w-md mx-auto">
                    {`> ERROR_LOG: `}
                    <span className="text-danger-dim">{errorMessage}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                  <button 
                    className="btn-danger-hud text-xs sm:text-sm px-6 py-2.5" 
                    onClick={fetchBooks}
                  >
                    [ REINITIALIZE ]
                  </button>
                  <Link 
                    to="/books/create" 
                    className="font-mono text-xs uppercase tracking-widest text-muted hover:text-smoke transition-colors"
                  >
                    [ NEW_ENTRY_FALLBACK ]
                  </Link>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-[1px] bg-danger/20" />
                  <div className="w-1.5 h-1.5 bg-danger/30 rotate-45" />
                  <div className="flex-1 h-[1px] bg-danger/20" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <BooksCard books={books} onDelete={fetchBooks} />
        )}
      </motion.main>

      {/* Footer HUD bar */}
      {/* <div className="fixed bottom-0 left-0 right-0 h-[3px] hazard-bar pointer-events-none opacity-40" /> */}
    </div>
  );
};

export default Home;
