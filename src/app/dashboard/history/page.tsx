import History from "@/components/history";
import { Suspense } from "react";
import Image from "next/image";

export default function HistoryPage() {
  return (
    <Suspense
      fallback={
        <Image src="/loading.gif" alt="Loading..." width={50} height={50} />
      }
    >
      <div className="flex flex-col items-center flex-grow">
        <div className="card bg-base-100 w-full xl:w-1/2 shadow-xl animate-fade-up">
          <div className="card-body">
            <h2 className="card-title">Your Ayam History</h2>
            <History />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
