import History from "@/components/history";

export default function HistoryPage() {
  return (
    <div className="flex flex-col items-center h-lvh">
      <div className="card bg-base-100 w-full h-lvh md:w-1/2 shadow-xl animate-fade-up">
        <div className="card-body">
          <h2 className="card-title">Your Ayam History</h2>
          <History />
        </div>
      </div>
    </div>
  );
}
