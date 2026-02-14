export default function Pagination({ page, pages, setPage }) {
  return (
    <div className="flex gap-4 justify-center mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <span>
        Page {page} of {pages}
      </span>
      <button
        disabled={page === pages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
