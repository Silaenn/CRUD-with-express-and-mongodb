import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const BooksTable = ({ books }) => (
  <div className="overflow-x-auto">
    {/* Table header bar */}
    <div className="hazard-bar-sm w-full mb-0" />

    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-hud/30">
          {["#", "Title", "Author", "Year", "OPS"].map((h, i) => (
            <th
              key={h}
              className={`py-3 px-4 text-left hud-label text-hud-dim ${i >= 2 && i <= 3 ? "max-md:hidden" : ""}`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr
            key={book._id}
            className="border-b border-border hover:bg-obsidian hover:border-hud/20 transition-all duration-100 group"
          >
            <td className="py-3 px-4 font-display text-sm text-hud/40 group-hover:text-hud/80 transition-colors">
              {String(index + 1).padStart(2, "0")}
            </td>
            <td className="py-3 px-4 font-mono text-sm text-smoke uppercase tracking-wide">
              {book.title}
            </td>
            <td className="py-3 px-4 font-mono text-sm text-muted uppercase max-md:hidden">
              {book.author}
            </td>
            <td className="py-3 px-4 max-md:hidden">
              <span className="hud-tag">{book.publishYear}</span>
            </td>
            <td className="py-3 px-4">
              <div className="flex items-center gap-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-lg text-muted hover:text-hud transition-colors hover:drop-shadow-[0_0_4px_#FFB800]" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-lg text-muted hover:text-hud transition-colors hover:drop-shadow-[0_0_4px_#FFB800]" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-lg text-muted hover:text-danger transition-colors hover:drop-shadow-[0_0_4px_#FF2D2D]" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="hazard-bar-sm w-full mt-0" />
  </div>
);

export default BooksTable;