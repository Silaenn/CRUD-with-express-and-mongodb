import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-hud/20">
    {books.length === 0 ? (
      <div className="col-span-3 flex flex-col items-center justify-center py-24 gap-4">
        <img
          src="/icons/skull-plain.png"
          alt=""
          className="w-16 h-auto opacity-30"
          style={{ imageRendering: "pixelated" }}
        />
        <p className="hud-label text-muted">NO_RECORDS_FOUND</p>
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