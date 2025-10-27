import { useLocation } from "wouter";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface RecipesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function RecipesPagination({ currentPage, totalPages, onPageChange }: RecipesPaginationProps) {
  const [, setLocation] = useLocation();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    onPageChange(page);
    
    const newUrl = page === 1 ? window.location.pathname : `${window.location.pathname}?page=${page}`;
    window.history.pushState({}, '', newUrl);
    setLocation(newUrl);
    
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
      mainHeading.focus();
      mainHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const generatePageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('ellipsis');
    }
    
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }
    
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = generatePageNumbers();

  return (
    <Pagination className="my-8" aria-label="Recipe pagination navigation">
      <PaginationContent>
        <PaginationItem>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center gap-1 h-9 px-3 rounded-md bg-dark-accent text-light-text border border-muted-gray/20 hover:bg-warm-amber/10 hover:border-warm-amber/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to first page"
            data-testid="pagination-first"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        </PaginationItem>

        <PaginationItem>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center gap-1 h-9 px-3 rounded-md bg-dark-accent text-light-text border border-muted-gray/20 hover:bg-warm-amber/10 hover:border-warm-amber/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to previous page"
            data-testid="pagination-prev"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
        </PaginationItem>

        {pageNumbers.map((pageNum, idx) => (
          <PaginationItem key={idx}>
            {pageNum === 'ellipsis' ? (
              <PaginationEllipsis className="text-muted-gray" />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(pageNum)}
                isActive={currentPage === pageNum}
                className={
                  currentPage === pageNum
                    ? "bg-warm-amber text-dark-primary hover:bg-warm-amber/90 border-warm-amber"
                    : "bg-dark-accent text-light-text border-muted-gray/20 hover:bg-warm-amber/10 hover:border-warm-amber/40"
                }
                aria-label={`Go to page ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
                data-testid={`pagination-page-${pageNum}`}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center gap-1 h-9 px-3 rounded-md bg-dark-accent text-light-text border border-muted-gray/20 hover:bg-warm-amber/10 hover:border-warm-amber/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to next page"
            data-testid="pagination-next"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </PaginationItem>

        <PaginationItem>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center gap-1 h-9 px-3 rounded-md bg-dark-accent text-light-text border border-muted-gray/20 hover:bg-warm-amber/10 hover:border-warm-amber/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to last page"
            data-testid="pagination-last"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
