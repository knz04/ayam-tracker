"use client";

import AddAyam from "./addayam";

export default function Welcome() {
  return (
    <div className="card bg-base-100 w-full md:w-1/2 shadow-xl animate-fade-up">
      <div className="card-body">
        <h2 className="card-title">Hi, User!</h2>
        <p>Would you like to track your ayam consumption?</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary hover:animate-jump"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_5"
              ) as HTMLDialogElement;
              modal?.showModal();
            }}
          >
            Add an ayam
          </button>
        </div>
        <AddAyam />
      </div>
    </div>
  );
}
