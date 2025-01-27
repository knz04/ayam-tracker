import History from "@/components/history";
import { Suspense } from "react";

export default function HistoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center h-screen">
        <div className="card bg-base-100 w-full lg:w-1/2 shadow-xl animate-fade-up">
          <div className="card-body">
            <h2 className="card-title">Your Ayam History</h2>
            <History />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
