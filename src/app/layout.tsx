import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

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
    <html lang="ku" className="min-h-screen scroll-smooth">
      <body
        className={`${inter.className} mx-auto  bg-mybg text-right selection:bg-myblue/20 `}
        dir="rtl"
      >
        {children}
      </body>
    </html>
  );
}
