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
        className="min-h-screen w-full bg-[#1C1B20] relative"
        suppressHydrationWarning={true}
      >
        <div className="fixed inset-0 w-full h-full z-[-2]">
          <div 
            className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat"
            style={{ minHeight: '100vh', minWidth: '100vw' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1B20]/90 via-[#1C1B20]/50 to-[#1C1B20]/90" />
        </div>
        <main className="relative z-[1]">
          {children}
        </main>
      </body>
    </html>
  );
}
