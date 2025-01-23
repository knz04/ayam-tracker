import React from "react";
import AyamPart from "./ayampart";
import AyamRating from "./ayamrating";

export default function AddAyam() {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add an ayam</h3>
        <form className="card-body">
          <AyamPart />
          <AyamRating />
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
