"use client";
import { addQuote } from "@/actions/quote-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormState } from "react-dom";

export default function AddQuoteForm() {
  const [{ message, status, errors }, formAction] = useFormState(addQuote, {
    message: "",
    status: "",
  });
  return (
    <form action={formAction}>
      <Input type="text" name="quote" placeholder="Quote" />
      <Input type="text" name="source" placeholder="Source" />
      <Button>Submit</Button>
    </form>
  );
}
