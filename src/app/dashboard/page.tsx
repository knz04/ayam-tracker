"use client";
import { useState } from "react";
import Stats from "@/components/stats";
import Recent from "@/components/recent";
import Welcome from "@/components/welcome";
import Link from "next/link";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex flex-col items-center gap-8 flex-grow">
      <Welcome onLogAdded={handleRefresh} />
      <div className="card bg-base-100 w-full lg:w-1/2 shadow-xl animate-fade-up">
        <div className="card-body">
          <h2 className="card-title">Stats</h2>
          <Stats refreshKey={refreshKey} />
          <div className="card-actions justify-end">
            <button className="btn btn-primary hover:animate-jump">
              View your ayam stats
            </button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-full lg:w-1/2 shadow-xl animate-fade-up">
        <div className="card-body">
          <h2 className="card-title">Your Recent Ayams</h2>
          <Recent refreshKey={refreshKey} />
          <div className="card-actions justify-end">
            <Link
              href="/dashboard/history"
              className="btn btn-primary hover:animate-jump"
            >
              View your ayam history
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
