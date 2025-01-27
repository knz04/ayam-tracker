"use client";

import { PaginationProps } from "@/lib/definitions";
import { useRouter } from "next/navigation";

export default function PaginationControl({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };
  return (
    <div className="join mt-5">
      <button
        className="join-item btn"
        disabled={!hasPrevious}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        «
      </button>
      <button className="join-item btn">{currentPage}</button>
      <button
        className="join-item btn"
        disabled={!hasNext}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
}
