import BookSingleCard from "./BookSingleCard";
import { Link } from "react-router-dom";

const BooksCard = ({ books }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 border-l border-t border-hud/20">
    {books.length === 0 ? (
      <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4">
        <img
          src="/icons/skull-plain.png"
          alt=""
          className="w-16 h-auto opacity-30"
          style={{ imageRendering: "pixelated" }}
        />
        <p className="hud-label text-muted">NO_RECORDS_FOUND</p>
        <p className="font-mono text-sm text-muted/80 text-center max-w-md">
          There are no entries in the database yet. Add your first book to start tracking records.
        </p>
        <Link to="/books/create" className="btn-hud h-11 inline-flex items-center">
          [+] ADD_FIRST_ENTRY
        </Link>
        <img
          src="/icons/skull-plain.png"
          alt=""
          className="w-16 h-auto opacity-10"
          style={{ imageRendering: "pixelated", transform: "scaleY(-1)" }}
        />
      </div>
    ) : (
      books.map((item, index) => (
        <BookSingleCard key={item._id} book={item} index={index} />
      ))
    )}
  </div>
);

export default BooksCard;
