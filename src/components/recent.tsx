"use client";
import { useState, useEffect } from "react";
import { getRecentAyam } from "@/lib/db";
import Image from "next/image";

// Define a type for the log data
interface AyamLog {
  part_name: string;
  rating: number;
  created_at: string; // or Date if it's a Date object
}

export default function Recent() {
  const [recentAyam, setRecentAyam] = useState<AyamLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecentAyam = async () => {
      try {
        const data = await getRecentAyam();
        const transformedData: AyamLog[] = data.map((item) => ({
          part_name: item.part_name,
          rating: item.rating,
          created_at: item.created_at,
        }));
        setRecentAyam(transformedData);
        setIsLoading(false); // Set loading to false after fetch
      } catch (error) {
        console.error("Error fetching recent ayam:", error);
        setIsLoading(false); // Set loading to false if there's an error
      }
    };

    fetchRecentAyam();
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
          <Image src="/loading.gif" alt="Loading..." width={50} height={50} />
        </div>
      ) : recentAyam.length === 0 ? (
        <div className="flex justify-center items-center py-16">
          <span>No recent ayam logs found. Please add a new entry!</span>
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
            </tr>
          </thead>
          <tbody>
            {/* Map over the recentAyam data and create rows dynamically */}
            {recentAyam.map((log, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{log.part_name}</td>
                <td>{renderStars(log.rating)}</td>
                <td>{new Date(log.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
