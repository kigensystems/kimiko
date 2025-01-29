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
    <div className="min-h-screen bg-[#1C1B20]">
      <Navbar />
      <div className="pt-24">
        {children}
      </div>
    </div>
  );
}