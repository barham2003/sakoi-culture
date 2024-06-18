import {
  getAllQuotes,
  getAllQuotesID,
  getOneQuote,
} from "@/actions/quote-actions";
import notFound from "@/app/not-found";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const poetry = await getOneQuote(+params.id);
  return {
    title: poetry?.quote || "سەکۆی کولتور",
  };
}

export default async function page({ params }: { params: { id: string } }) {
  if (!params.id) notFound();
  const quote = await getOneQuote(+params.id);

  return (
    <main>
      <h1 className="my-10 text-center text-xl font-bold text-myblue lg:text-5xl">
        {quote?.quote}
      </h1>
      <div className="rounded-md bg-white px-4 pb-8 pt-4">
        <h2 className="my-2 text-xl font-medium lg:text-3xl">ڕوونکردنەوە</h2>
        <p className="text-lg lg:text-2xl">{quote?.explaination} </p>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const quoteList = await getAllQuotesID();
  return quoteList.map((quote) => ({
    id: quote.id.toString(),
  }));
}
