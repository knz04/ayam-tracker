import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="bg-base-200 grow p-6  md:p-12">{children}</div>

      <Footer />
    </div>
  );
}
