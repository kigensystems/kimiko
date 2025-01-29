import type { Metadata } from "next";
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
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="min-h-screen w-full"
        suppressHydrationWarning={true}
      >
        <div
          className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat z-[-2] opacity-80"
          style={{ minHeight: '100vh', minWidth: '100vw' }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-[#1C1B20]/30 via-transparent to-[#1C1B20]/30 z-[-1]" />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
