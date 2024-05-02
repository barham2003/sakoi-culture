"use client";
import { addQuote } from "@/actions/quote-actions";
import { Button } from "@/components/ui/button";
import FormButton from "@/components/ui/form-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormState } from "react-dom";

export default function AddQuoteForm() {
  const [{ message, status, errors }, formAction] = useFormState(addQuote, {
    message: "",
    status: "",
  });
  return (
    <form action={formAction} className="w-full space-y-1">
      <p
        className={cn(
          "w-full rounded-md py-1 text-center",
          status === "error" && "bg-destructive text-white",
        )}
      >
        {message}
      </p>
      <fieldset>
        <Input type="text" name="quote" placeholder="وتە" />
        {errors?.quote && (
          <span className="text-sm text-destructive">{errors.quote}</span>
        )}
      </fieldset>
      <Input type="text" name="source" placeholder="سەرچاوە" />
      <Input type="text" name="explaination" placeholder="ڕوونکردنەوە" />
      <FormButton>پەسەند بکە</FormButton>
    </form>
  );
}
