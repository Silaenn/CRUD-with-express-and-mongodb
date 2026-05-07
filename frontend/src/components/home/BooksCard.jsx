import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-hud/20">
    {books.length === 0 ? (
      <div className="col-span-3 flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-8 h-8 border-2 border-hud/30 rotate-45" />
        <p className="hud-label text-muted">NO_RECORDS_FOUND</p>
        <div className="w-8 h-8 border-2 border-hud/30 rotate-45" />
      </div>
    ) : (
      books.map((item, index) => (
        <BookSingleCard key={item._id} book={item} index={index} />
      ))
    )}
  </div>
);

export default BooksCard;