"use client";

import { getRandomQuote } from "@/actions";
import FormButton from "@/components/ui/form-button";
import { useFormState } from "react-dom";
import Banner from "@/components/banner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Audio from "@/components/audio";
import { Quote } from "@/db/schema";

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
          {status === "success" && quote ? <SuccessComponent quote={quote} /> : <ErrorComponent message={message} />}

        </div>
      </form >
    </>
  );
}

function SuccessComponent({ quote }: { quote: Quote }) {
  return (
    <>
      <h3 className=" px-2 py-4 text-center text-myblue">&quot;{quote?.quote}&quot;</h3>
      {quote?.voice && <Audio audioFile={quote.voice} />}
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
    </>
  )
}
function ErrorComponent({ message }: { message: string }) {
  return <h4 className="px-2 py-4 text-center text-myblue"> {message} </h4>
}
