import { getOnePoetry, getPoetryIds } from "@/actions/poetry-actions";
import notFound from "@/app/not-found";
import PRE from "@/components/ui/pre";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const poetry = await getOnePoetry(+params.id);
  if (!poetry) notFound();

  return (
    <main>
      <h1 className="my-10 text-center text-xl font-bold text-myblue lg:text-5xl">
        {poetry?.title}
      </h1>
      <h2 className="my-2 text-center font-bold text-myblue/70">
        وتراوە لە لایەن {poetry?.poet}
      </h2>
      <section className="overflow-x-auto rounded-md bg-white px-4 pb-8 pt-4">
        <PRE className="text-center text-lg lg:text-2xl">{poetry?.text} </PRE>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const poetryIds = await getPoetryIds();
  return poetryIds.map((poetry) => ({
    id: poetry.id.toString(),
  }));
}
