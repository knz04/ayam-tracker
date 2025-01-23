"use client";
import { useState, useEffect } from "react";
import { getAyamPart } from "../lib/db";

export default function AyamPart() {
  const [parts, setParts] = useState<{ part: string }[]>([]);
  const [selectedPart, setSelectedPart] = useState<string>("");

  useEffect(() => {
    const fetchAyamParts = async () => {
      try {
        const data = await getAyamPart(); // Assuming getAyamPart() returns a queryResultRow[] array
        const mappedParts = data.map((item) => ({
          part: item.part, // Map the result to match { part: string }
        }));
        setParts(mappedParts); // Set the result into the parts array
      } catch (error) {
        console.error("Error fetching ayam parts:", error);
      }
    };

    fetchAyamParts();
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Which ayam part did you eat?</span>
      </label>
      <select
        className="select select-primary w-full max-w-xs"
        value={selectedPart} // Controlled value for the select
        onChange={(e) => {
          setSelectedPart(e.target.value); // Update state when selection changes
          console.log(e.target.value); // Log the selected part
        }}
      >
        <option value="" disabled>
          Pick an ayam part
        </option>
        {parts.map((part, index) => (
          <option key={index} value={part.part}>
            {part.part}
          </option> // Render each part in the list
        ))}
      </select>
    </div>
  );
}
