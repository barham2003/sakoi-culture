"use client";
import { headers } from "next/headers";
import React from "react";

export default function CopyQuoteApi({ url }: { url: string }) {
  return (
    <span
      className=" cursor-pointer"
      onClick={() => navigator.clipboard.writeText(url)}
    >
      {url}
    </span>
  );
}
