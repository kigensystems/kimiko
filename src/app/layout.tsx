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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
