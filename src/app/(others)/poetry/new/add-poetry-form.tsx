"use client";
import { addPoetry } from "@/actions/poetry-actions";
import { addQuote } from "@/actions/quote-actions";
import FormButton from "@/components/ui/form-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormState } from "react-dom";

export default function AddPoetryForm() {
  const [{ message, status, errors }, formAction] = useFormState(addPoetry, {
    message: "",
    status: "",
  });
  return (
    <form action={formAction} className="w-full space-y-4">
      <p
        className={cn(
          "w-full rounded-md py-1 text-center",
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

      <FormButton>پەسەند بکە</FormButton>
    </form>
  );
}
