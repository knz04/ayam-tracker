"use client";

import { useState } from "react";

export default function AyamRating({
  sendToParent,
}: {
  sendToParent: (rating: number) => void;
}) {
  const [rating, setRating] = useState<number>(1);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = Number(event.target.value);
    setRating(newRating); // Update the state
    sendToParent(newRating); // Send the new rating directly to the parent
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Rate the ayam</span>
      </label>
      <div className="rating">
        <input
          type="radio"
          className="mask mask-star bg-primary"
          value={1}
          checked={rating === 1}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          className="mask mask-star bg-primary"
          value={2}
          checked={rating === 2}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          className="mask mask-star bg-primary"
          value={3}
          checked={rating === 3}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          className="mask mask-star bg-primary"
          value={4}
          checked={rating === 4}
          onChange={handleRatingChange}
        />
        <input
          type="radio"
          className="mask mask-star bg-primary"
          value={5}
          checked={rating === 5}
          onChange={handleRatingChange}
        />
      </div>
    </div>
  );
}
