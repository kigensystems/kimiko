import type { Metadata } from "next";
import { WalletProvider } from "@/lib/wallet/providers/WalletProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kimiko",
  description: "AI-powered solutions for your creative needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
