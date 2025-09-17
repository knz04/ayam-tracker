"use client";
import { useState, useEffect } from "react";
import { getAyamPart } from "../lib/db";

type AyamPartProps = {
  value: string;
  onChange: (id: string) => void;
};

export default function AyamPart({ value, onChange }: AyamPartProps) {
  const [parts, setParts] = useState<{ id: number; part: string }[]>([]);

  useEffect(() => {
    const fetchAyamParts = async () => {
      try {
        const data = await getAyamPart();
        const mappedParts = data.map((item) => ({
          id: item.id,
          part: item.part,
        }));
        setParts(mappedParts);
      } catch (error) {
        console.error("Error fetching ayam parts:", error);
      }
    };

    fetchAyamParts();
  }, []);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Which ayam part did you eat?</span>
      </label>
      <select
        className="select select-primary w-full max-w-xs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
