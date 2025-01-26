import { useState, useEffect } from "react";
import { getRecentAyam } from "@/lib/db";

// Define a type for the log data
interface AyamLog {
  part_name: string;
  rating: number;
  created_at: string; // or Date if it's a Date object
}

export default function Recent() {
  const [recentAyam, setRecentAyam] = useState<AyamLog[]>([]);

  useEffect(() => {
    const fetchRecentAyam = async () => {
      try {
        // Fetch data from the database
        const data = await getRecentAyam();

        // Map the result to match AyamLog structure
        const mappedData: AyamLog[] = data.map((log: any) => ({
          part_name: log.part_name,
          rating: log.rating,
          created_at: log.created_at,
        }));

        // Set the state with the mapped data
        setRecentAyam(mappedData);
      } catch (error) {
        console.error("Error fetching recent ayam:", error);
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
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
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
    </div>
  );
}
