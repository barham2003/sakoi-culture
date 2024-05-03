"use client";

import { getRandomQuote } from "@/actions";
import FormButton from "@/components/ui/form-button";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function QuoteComponent() {
  const [{ quote, message, status }, formAction] = useFormState(
    getRandomQuote,
    {
      message: "کلیك بکە بۆی پەندێك دەربێنیت",
      status: "",
    },
  );

  return (
    <>
      <div className="flex w-full flex-col-reverse items-center pt-3 lg:flex-row lg:justify-between lg:pr-10">
        <Image
          src="/piramerd.png"
          className="pt-10"
          alt=""
          width={200}
          height={400}
        />
        <h1 className="text-4xl font-bold text-myblue lg:text-6xl">
          پەندی پێشینان
        </h1>
      </div>
      <form
        className="flex flex-col rounded-md bg-white  pb-1 pt-5 text-lg transition-all lg:text-2xl"
        action={formAction}
      >
        <h4 dir="rtl" className=" px-2 py-4 text-center text-myblue">
          {status === "success" ? `"${quote?.quote}"` : message}
        </h4>
        <div className="flex flex-col gap-1">
          <FormButton variant="destructive" className="width-4">
            پەندێك دەربێنە
          </FormButton>
          {status === "success" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full" type="button">
                  ڕوونکردنەوە
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" w-60 xl:w-96">
                <p>{quote?.explaination}</p>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </form>
    </>
  );
}
