import Navbar from "@/components/navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mx-auto p-4 lg:max-w-[1100px]">{children}</div>
    </>
  );
}
