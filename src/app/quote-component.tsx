"use client";

import { getRandomQuote } from "@/actions";
import { Button } from "@/components/ui/button";
import FormButton from "@/components/ui/form-button";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function QuoteComponent() {
  const [currentQuoteId, setQuoteId] = useState<number>(0);
  const [{ message: quote }, formAction] = useFormState(getRandomQuote, {
    message: "کلیك بکە بۆی پەندێك دەربێنیت",
    status: "",
  });

  return (
    <form
      className="flex flex-col  rounded-md bg-white pt-5 transition-all"
      action={formAction}
    >
      <h4 className=" text-myblue max-h-[200px] overflow-auto px-2  py-4 text-center text-2xl ">
        {quote}
      </h4>
      <FormButton variant="destructive" className="width-4">
        پەندێك دەربێنە
      </FormButton>
    </form>
  );
}
