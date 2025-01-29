import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Dashboard | Kimiko",
  description: "Your Kimiko dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat z-[-2]"
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      />
      <div className="fixed inset-0 bg-black/50 z-[-2]" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#1C1B20]/30 via-transparent to-[#1C1B20]/30 z-[-1]" />
      <Navbar />
      <main className="relative">
        {children}
      </main>
    </>
  );
}