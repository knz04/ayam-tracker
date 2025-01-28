"use client";

import { useState, useEffect } from "react";
import PaginationControl from "./pagination";
import { useSearchParams } from "next/navigation";
import Edit from "./edit";
import { AyamLog, Pagination } from "@/lib/definitions";
import Image from "next/image";

export default function History() {
  const [history, setHistory] = useState<AyamLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<Pagination>({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  });

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const url = new URL("/api/ayam", window.location.origin);
        url.searchParams.append("page", page);

        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch ayam history");
        }

        // Explicitly typing the data response
        const data = await response.json();
        const { logs, totalItems, totalPages, currentPage } = data;

        setHistory(logs);
        setPagination({
          totalItems,
          totalPages,
          currentPage,
        });
        setIsLoading(false); // Set loading to false after fetch
      } catch (error) {
        console.error("Error fetching ayam history:", error);
        setIsLoading(false); // Set loading to false if there's an error
      }
    };

    fetchHistory();
  }, [page]); // Add `page` as a dependency to re-fetch on page change

  // Function to display stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="rating">
        {[...Array(5)].map((_, index) => (
          <input
            key={index}
            type="radio"
            className="mask mask-star bg-primary"
            value={index + 1}
            checked={rating === index + 1}
            readOnly
          />
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Show spinner while loading */}
      {isLoading ? (
        <div className="flex justify-center items-center py-5">
          <Image src="/loading.gif" alt="Loading..." width={50} height={50} />
        </div>
      ) : history.length === 0 ? (
        <div className="flex justify-center items-center py-5">
          <span>No history logs found. Please add a new entry!</span>
        </div>
      ) : (
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Ayam Part</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {history.map((log, index) => (
              <tr key={index}>
                {/* Corrected row number logic */}
                <th>{(pagination.currentPage - 1) * 12 + index + 1}</th>
                <td>{log.part_name}</td>
                <td>{renderStars(log.rating)}</td>
                <td>{new Date(log.created_at).toLocaleDateString()}</td>
                <td>{log.notes}</td>
                <Edit />
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-center">
        <PaginationControl
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </div>
    </div>
  );
}
