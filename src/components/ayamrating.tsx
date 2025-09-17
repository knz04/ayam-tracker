"use client";

type AyamRatingProps = {
  value: number;
  onChange: (rating: number) => void;
};

export default function AyamRating({ value, onChange }: AyamRatingProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Rate the ayam</span>
      </label>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((num) => (
          <input
            key={num}
            type="radio"
            className="mask mask-star bg-primary"
            value={num}
            checked={value === num}
            onChange={() => onChange(num)}
          />
        ))}
      </div>
    </div>
  );
}
