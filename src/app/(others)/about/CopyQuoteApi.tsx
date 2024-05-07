"use client";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import React, { useState } from "react";

export default function CopyQuoteApi({ url }: { url: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  function CopyAndCheck() {
    navigator.clipboard.writeText(url);
    setCopied(true);
  }
  return (
    <>
      <div
        className="flex cursor-pointer justify-start "
        onClick={CopyAndCheck}
      >
        <Button size="sm">
          {copied === false ? <Copy size={18} /> : <CopyCheck size={18} />}
        </Button>
        <span className="rounded-md bg-myblue/10 px-2 py-1 text-myblue">
          {url}
        </span>
      </div>
    </>
  );
}
