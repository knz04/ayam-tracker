"use client";
import { useState, useEffect } from "react";

// Define a type for the log data
interface AyamLog {
  part_name: string;
  rating: number;
  created_at: string; // or Date if it's a Date object
  notes: string;
}

export default function History() {
  const [history, setHistory] = useState<AyamLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/ayam", {
          // Ensure correct URL is used
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch ayam history");
        }

        const data = await response.json();
        const transformedData: AyamLog[] = data.map((item) => ({
          part_name: item.part_name,
          rating: item.rating,
          created_at: item.created_at,
          notes: item.notes,
        }));
        setHistory(transformedData);
        setIsLoading(false); // Set loading to false after fetch
      } catch (error) {
        console.error("Error fetching ayam history:", error);
        setIsLoading(false); // Set loading to false if there's an error
      }
    };

    fetchHistory();
  }, []);

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
          <span className="loading loading-spinner loading-lg"></span>
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
            {/* Map over the history data and create rows dynamically */}
            {history.map((log, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{log.part_name}</td>
                <td>{renderStars(log.rating)}</td>
                <td>{new Date(log.created_at).toLocaleDateString()}</td>
                <td>{log.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
