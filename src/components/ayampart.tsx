"use client";
import { useState, useEffect } from "react";
import { getAyamPart } from "../lib/db";

export default function AyamPart({
  sendToParent,
}: {
  sendToParent: (partId: number) => void;
}) {
  const [parts, setParts] = useState<{ id: number; part: string }[]>([]);
  const [selectedPartId, setSelectedPartId] = useState<string>(""); // Set to empty string initially

  useEffect(() => {
    const fetchAyamParts = async () => {
      try {
        const data = await getAyamPart(); // Assuming getAyamPart() returns a queryResultRow[] array
        const mappedParts = data.map((item) => ({
          id: item.id,
          part: item.part, // Map the result to match { part: string }
        }));
        setParts(mappedParts); // Set the result into the parts array
      } catch (error) {
        console.error("Error fetching ayam parts:", error);
      }
    };

    fetchAyamParts();
  }, []); // Empty dependency array ensures it runs once on mount

  // Effect to send part ID to parent after it has changed
  useEffect(() => {
    if (selectedPartId !== "") {
      console.log("Selected part ID:", selectedPartId);
      sendToParent(Number(selectedPartId)); // Send the selected part ID to the parent
    }
  }, [selectedPartId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value; // No need to parse here because it's already a string
    setSelectedPartId(selectedId); // Set the selected part ID
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Which ayam part did you eat?</span>
      </label>
      <select
        className="select select-primary w-full max-w-xs"
        value={selectedPartId} // Controlled value for the select
        onChange={handleChange} // Trigger the handleChange function when selection changes
      >
        <option value="" disabled>
          Pick an ayam part
        </option>
        {parts.map((part) => (
          <option key={part.id} value={part.id}>
            {part.part}
          </option>
        ))}
      </select>
    </div>
  );
}
