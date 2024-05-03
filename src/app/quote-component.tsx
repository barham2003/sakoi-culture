"use client";

import { getRandomQuote } from "@/actions";
import FormButton from "@/components/ui/form-button";
import Image from "next/image";
import { useFormState } from "react-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Banner from "@/components/banner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <Banner text="پەندی پێشینان" />
      <form
        className="flex min-h-[4em] flex-col rounded-md bg-white pb-1 text-lg transition-all lg:text-2xl"
        action={formAction}
      >
        <div className="flex flex-col gap-1">
          <FormButton variant="destructive">پەندێك دەربێنە</FormButton>
          <h4 className=" px-2 py-4 text-center text-myblue">
            {status === "success" ? `"${quote?.quote}"` : message}
          </h4>

          {status === "success" && quote?.explaination && (
            <Accordion className="" type="single" collapsible>
              <AccordionItem value="item-1" className="border-0  px-2">
                <AccordionTrigger className="text-base">
                  ڕوونکردنەوە
                </AccordionTrigger>
                <AccordionContent>
                  <p>{quote?.explaination}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </form>
    </>
  );
}
