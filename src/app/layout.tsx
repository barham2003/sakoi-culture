import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Noto_Kufi_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Culture Sako - سەکۆی کولتور",
  description: "A web app for kurdish literature, art, culture and history",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen scroll-smooth">
      <body
        className={`${inter.className} mx-auto bg-mybg text-right `}
        dir="rtl"
      >
        {children}
      </body>
    </html>
  );
}
