"use client";
import { getRandomQuote } from "@/actions";
import FormButton from "@/components/ui/form-button";
import Banner from "@/components/banner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Audio from "@/components/audio";
import { Quote } from "@/db/schema";
import { useState } from "react";

export default function QuoteComponent() {

  const [quote, setQuote] = useState<Quote>()
  const [message, setMessage] = useState<string>("پەندێك دەربێنە")
  const [isLoading, setIsLoading] = useState(false)


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    e.preventDefault()
    try {
      const gottenQuote = await getRandomQuote()
      setQuote(gottenQuote)
      setMessage("")
    } catch (e) {
      if (e instanceof Error) setMessage(e.message)
      else setMessage("هەڵەیەك ڕوویدا")
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <>
      <Banner text="پەندی پێشینان" image="/piramerd.png" />
      <form onSubmit={handleSubmit} className="flex min-h-[4em] flex-col rounded-md bg-white pb-1 text-lg transition-all lg:text-2xl" >
        <div className="flex flex-col gap-1">
          <FormButton variant="destructive" isLoading={isLoading}>پەندێك دەربێنە</FormButton>
          <SuccessComponent quote={quote} />
          <ErrorComponent message={message} />
        </div>
      </form >
    </>
  );
}

function SuccessComponent({ quote }: { quote: Quote | undefined }) {
  if (!quote) return null
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
  if (!message) return null
  return <h4 className="px-2 py-4 text-center text-myblue"> {message} </h4>
}
