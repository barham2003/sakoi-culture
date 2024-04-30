"use client";

import { getRandomQuote } from "@/actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function QuoteComponent() {
  const [quote, setQuote] = useState<string>(
    "Click generate to generate a quote"
  );

  async function generateQuote() {
    const theQuote = await getRandomQuote();
    console.log(theQuote);
    setQuote(theQuote?.quote || "None");
  }

  return (
    <section>
      {quote}
      <Button onClick={generateQuote}>Generate Quote</Button>
    </section>
  );
}
