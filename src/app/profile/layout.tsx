import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12 bg-base-200">
        {children}
      </div>
    </div>
  );
}
