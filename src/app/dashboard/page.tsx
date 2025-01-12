"use client";
import AddAyam from "@/components/addayam";
import Stats from "@/components/stats";
import Recent from "@/components/recent";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center gap-8 ">
      <div className="card bg-base-100 w-full md:w-1/2 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title">Hi, User!</h2>
          <p>Would you like to track your ayam consumption?</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
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
        </div>
      </div>
      <div className="card bg-base-100 w-full md:w-1/2 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Stats</h2>
          <Stats />
          <div className="card-actions justify-end">
            <button className="btn btn-primary">View your ayam stats</button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-full md:w-1/2 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Your Recent Ayams</h2>
          <Recent />
          <div className="card-actions justify-end">
            <button className="btn btn-primary">View your ayam history</button>
          </div>
        </div>
      </div>

      {/* Include the AddAyam modal here */}
      <AddAyam />
    </div>
  );
}
