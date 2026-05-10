import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="bg-void min-h-screen relative overflow-x-hidden">
      {/* Gambar dekorasi di belakang (z-0) */}
      <motion.img
        src="/icons/edge-left.png"
        alt=""
        initial={{ x: "-100%", y: "-4%", opacity: 0 }}
        animate={{ x: "-40%", y: "-4%", opacity: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="fixed left-0 top-0 h-[114vh] w-52 md:w-72 lg:w-96 pointer-events-none z-0"
        style={{ imageRendering: "pixelated" }}
      />
      {/* Right — mirror dari left */}
      <motion.img
        src="/icons/edge-left.png"
        alt=""
        initial={{ x: "100%", y: "-4%", scaleX: -1, opacity: 0 }}
        animate={{ x: "40%", y: "-4%", scaleX: -1, opacity: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="fixed right-0 top-0 h-[114vh] w-52 md:w-72 lg:w-96 pointer-events-none z-0"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Konten halaman di depan (z-10) */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<CreateBooks />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
        </Routes>
      </div>
    </div>
  );
};


export default App;



