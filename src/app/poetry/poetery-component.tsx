"use client";
import { addPoetry, getRandomPoetry } from "@/actions/poetry-actions";
import Banner from "@/components/banner";
import FormButton from "@/components/ui/form-button";
import React from "react";
import { useFormState } from "react-dom";
import { Noto_Kufi_Arabic } from "next/font/google";

const inter = Noto_Kufi_Arabic({ subsets: ["arabic"] });

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
      <Banner text="شیعر" image="/bekas.png" reverse={true} />
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

          <pre
            className={`overflow-x-auto py-4 text-center text-myblue ${inter.className}`}
          >
            {status === "success" ? `${poetry?.text}` : message}
          </pre>
          {poetry?.poet && (
            <p className="text-center text-myblue/70 ">
              شیعری{" "}
              <span className=" font-extrabold underline underline-offset-8">
                {poetry.poet}
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
}
