import { cn } from "@/lib/utils";
import { Noto_Kufi_Arabic } from "next/font/google";

const inter = Noto_Kufi_Arabic({ subsets: ["arabic"] });

import React from "react";

export default function PRE({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <pre className={cn(className, inter.className)}>{children}</pre>;
}
