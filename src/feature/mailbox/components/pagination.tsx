import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from "react-icons/fi";

interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

type PageItem = number | "ellipsis";

const Pagination = ({ currentPage = 1, totalItems = 50, itemsPerPage = 10, onPageChange = () => {} }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPages = (): PageItem[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
  };

  const pages = getPages();

  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-2">
      {/* Results */}
      <p className="text-sm text-[#64748b]">
        Showing <span className="font-medium text-[#14213d]">{startItem}</span>– <span className="font-medium text-[#14213d]">{endItem}</span> of{" "}
        <span className="font-medium text-[#14213d]">{totalItems}</span>
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="
            flex h-9 w-9 items-center justify-center rounded-md
            border border-[#cbd5e1] text-[#475569]
            transition-colors hover:bg-[#f1f5f9]
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          <FiChevronLeft size={17} />
        </button>

        {/* Pages */}
        {pages.map((page, index) => {
          // Ellipsis
          if (page === "ellipsis") {
            return (
              <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center text-[#64748b]">
                <FiMoreHorizontal size={17} />
              </span>
            );
          }

          // Page number
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex h-9 min-w-9 items-center justify-center
                rounded-md px-2 text-sm font-medium transition-colors
                ${isActive ? "bg-background text-[#14213d] ring-1 ring-[#2563eb]" : "text-[#475569] hover:bg-[#f1f5f9]"}
              `}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="
            flex h-9 w-9 items-center justify-center rounded-md
            border border-[#cbd5e1] text-[#475569]
            transition-colors hover:bg-[#f1f5f9]
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          <FiChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
