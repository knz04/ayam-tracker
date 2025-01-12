"use client";
import AddAyam from "@/components/addayam";

export default function Dashboard() {
  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 md:w-1/2 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Hi, User!</h2>
          <p>Would you like to track your ayam consumption?</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("my_modal_5")?.showModal()}
            >
              Add ayam
            </button>
          </div>
        </div>
      </div>

      {/* Include the AddAyam modal here */}
      <AddAyam />
    </div>
  );
}
