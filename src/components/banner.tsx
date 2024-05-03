import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Banner({
  image = "/piramerd.png",
  text,
  reverse = false,
  className,
}: {
  image?: string;
  text: string;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "flex w-full flex-col items-center pt-3 lg:flex-row lg:justify-between",
          reverse && "lg:flex-row-reverse",
          className,
        )}
      >
        <h1 className="text-4xl font-bold text-myblue lg:text-6xl">{text}</h1>
        <Image
          src={image || "/piramerd.png"}
          className="h-[217px] w-[200px] rounded-r-md pt-4"
          alt=""
          width={200}
          height={400}
        />
      </div>
    </>
  );
}
