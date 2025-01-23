"use client";

export default function AyamRating() {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Rate the ayam</span>
      </label>
      <div className="rating">
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-primary"
          defaultChecked
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-primary"
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-primary"
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-primary"
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star bg-primary"
        />
      </div>
    </div>
  );
}
