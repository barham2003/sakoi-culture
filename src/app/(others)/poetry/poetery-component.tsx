"use client";
import { getRandomPoetry } from "@/actions/poetry-actions";
import Audio from "@/components/audio";
import Banner from "@/components/banner";
import FormButton from "@/components/ui/form-button";
import PRE from "@/components/ui/pre";
import { Poetry } from "@/db/schema";
import React from "react";

export default function PoetryComponent() {
  const [poetry, setPoetry] = React.useState<Poetry | null>(null);
  const [message, setMessage] = React.useState<string>("شیعر دەربێنە");
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    e.preventDefault()
    try {
      const gottenPoetry = await getRandomPoetry()
      setPoetry(gottenPoetry)
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
      <Banner text="شیعر" image="/pashew.png" reverse={true} />
      <form onSubmit={handleSubmit}
        className="flex min-h-[4em] flex-col rounded-md bg-white pb-1 text-lg transition-all lg:text-2xl" >
        <div className="flex flex-col gap-4 pb-2">
          <FormButton isLoading={isLoading}>شیعر دەربێنە</FormButton>
          <SuccessComponent poetry={poetry} />
          <MessageComponent message={message} />
        </div>
      </form>
    </>
  );
}


function SuccessComponent({ poetry }: { poetry: Poetry | null }) {
  if (!poetry) return null

  return <>
    <Audio audioFile={poetry.voice} />
    <h4 className="text-center font-bold text-myblue">
      {poetry.title}
    </h4>
    <PRE className="overflow-x-auto py-4 text-center text-myblue">
      {poetry?.text}
    </PRE>

    <p className="text-center text-myblue/70 ">
      شیعری <span className="font-extrabold">{poetry.poet}</span>
    </p>
  </>
}

function MessageComponent({ message }: { message: string }) {
  if (!message) return null
  return <h4 className="text-center text-myblue">
    {message}</h4>
}
