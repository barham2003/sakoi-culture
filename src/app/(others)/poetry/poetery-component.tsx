"use client";
import { getRandomPoetry } from "@/actions/poetry-actions";
import Banner from "@/components/banner";
import FormButton from "@/components/ui/form-button";
import PRE from "@/components/ui/pre";
import React from "react";
import { useFormState } from "react-dom";

export default function PoetryComponent() {
  const [{ message, status, poetry }, formAction] = useFormState(
    getRandomPoetry,
    {
      message: "کلیك بکە بۆی شیعرێك دەربێنیت",
      status: "",
    },
  );
  return (
    <>
      <Banner text="شیعر" image="/pashew.png" reverse={true} />
      <form
        action={formAction}
        className="flex min-h-[4em] flex-col rounded-md bg-white pb-1 text-lg transition-all lg:text-2xl"
      >
        <div className="flex flex-col gap-4 pb-2">
          <FormButton>شیعر دەربێنە</FormButton>

          {poetry?.title && (
            <h4 className="text-center font-bold text-myblue">
              {poetry.title}
            </h4>
          )}

          <PRE className="overflow-x-auto py-4 text-center text-myblue">
            {status === "success" ? `${poetry?.text}` : message}
          </PRE>
          {poetry?.poet && (
            <p className="text-center text-myblue/70 ">
              شیعری{" "}
              <span className=" font-extrabold">
                {poetry.poet}
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
}
