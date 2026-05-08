import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";

const App = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Left edge decoration */}
      <img
        src="/icons/edge-left.png"
        alt=""
        className="fixed left-0 top-0 h-[114vh] w-52 md:w-72 lg:w-96 opacity-20 md:opacity-30 pointer-events-none z-0"
        style={{ imageRendering: "pixelated", transform: "translateY(-4%) translateX(-40%)" }}
      />
      {/* Right — mirror dari left */}
      <img
        src="/icons/edge-left.png"
        alt=""
        className="fixed right-0 top-0 h-[114vh] w-52 md:w-72 lg:w-96 opacity-20 md:opacity-30 pointer-events-none z-0"
        style={{ imageRendering: "pixelated", transform: "translateY(-4%) translateX(40%) scaleX(-1)" }}
      />

      {/* Semua routes harus z lebih tinggi dari image */}
      <div className="z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<CreateBooks />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;