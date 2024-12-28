import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function PaginationBlogs() {
  const pages = [1, 2, 3, 4, 5];
  const searchParams = useSearchParams();

  const currentPage = useMemo(() => {
    return searchParams.get('page') || 1;
  }, [searchParams]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/blogs/${Number(currentPage) < 1 ? 1 : Number(currentPage) > 1 ? Number(currentPage) - 1 : 1}`}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === Number(currentPage)}
              href={`/blogs?page=${page}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`/blogs/${Number(currentPage) + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
