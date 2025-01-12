import React from "react";

export default function AddAyam() {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add an ayam</h3>
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Which ayam part did you eat?</span>
            </label>
            <select className="select select-primary w-full max-w-xs">
              <option disabled selected>
                Pick an ayam part
              </option>
              <option>Game of Thrones</option>
              <option>Lost</option>
              <option>Breaking Bad</option>
              <option>Walking Dead</option>
            </select>
          </div>
          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
          </div> */}
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Notes</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="What's up with this ayam?"
            ></textarea>
          </div>
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* Close the modal when this button is clicked */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
