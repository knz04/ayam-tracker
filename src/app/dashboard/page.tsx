"use client";

import Stats from "@/components/stats";
import Recent from "@/components/recent";
import Welcome from "@/components/welcome";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center gap-8 ">
      <Welcome />
      <div className="card bg-base-100 w-full md:w-1/2 shadow-xl animate-fade-up">
        <div className="card-body">
          <h2 className="card-title">Stats</h2>
          <Stats />
          <div className="card-actions justify-end">
            <button className="btn btn-primary hover:animate-jump">
              View your ayam stats
            </button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-full md:w-1/2 shadow-xl animate-fade-up">
        <div className="card-body">
          <h2 className="card-title">Your Recent Ayams</h2>
          <Recent />
          <div className="card-actions justify-end">
            <button className="btn btn-primary hover:animate-jump">
              View your ayam history
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
