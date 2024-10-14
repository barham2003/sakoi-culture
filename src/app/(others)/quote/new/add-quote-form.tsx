"use client";
import { addQuote } from "@/actions/quote-actions";
import FormButton from "@/components/ui/form-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import FileInput from "@/components/file-input";

export default function AddQuoteForm() {
  const [{ message, status, errors, id }, formAction] = useFormState(addQuote, {
    message: "",
    status: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === "success") formRef.current?.reset();
  }, [id, status]);
  return (
    <form ref={formRef} action={formAction} className="w-full space-y-4">
      <p
        className={cn(
          "w-full rounded-md py-1 text-center font-bold text-myblue",
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
      <FileInput />
      <FormButton>پەسەند بکە</FormButton>
    </form>
  );
}
