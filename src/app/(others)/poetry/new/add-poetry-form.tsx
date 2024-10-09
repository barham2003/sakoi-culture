"use client";
import { addPoetry } from "@/actions/poetry-actions";
import { addQuote } from "@/actions/quote-actions";
import FormButton from "@/components/ui/form-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

export default function AddPoetryForm() {
  const [{ message, status, errors, id }, formAction] = useFormState(
    addPoetry,
    {
      message: "",
      status: "",
    },
  );
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
        <Input type="text" name="title" placeholder="ناوی شیعرەکە" />
        {errors?.title && (
          <span className="text-sm text-destructive">{errors.title}</span>
        )}
      </fieldset>

      <fieldset>
        <Input type="text" name="poet" placeholder="ناوی شاعیر" />
        {errors?.poet && (
          <span className="text-sm text-destructive">{errors.poet}</span>
        )}
      </fieldset>

      <fieldset>
        <Textarea name="text" placeholder="شیعر" />
        {errors?.text && (
          <span className="text-sm text-destructive">{errors.text}</span>
        )}
      </fieldset>

      <fieldset className="w-full">
        <label
          htmlFor="voice"
          className="block rounded border border-myblue bg-white p-2 transition-all hover:bg-gray-100"
        >
          دەنگ دابنێ
        </label>
        <Input
          type="file"
          id="voice"
          name="voice"
          accept=".mp3"
          className="hidden"
        />
      </fieldset>

      <FormButton>پەسەند بکە</FormButton>
    </form>
  );
}
