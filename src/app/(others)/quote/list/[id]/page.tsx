import {
  getAllQuotes,
  getAllQuotesID,
  getOneQuote,
} from "@/actions/quote-actions";
import notFound from "@/app/not-found";
import { db } from "@/db";
import { quotes } from "@/db/schema";

export default async function page({ params }: { params: { id: string } }) {
  if (!params.id) notFound();
  const quote = await getOneQuote(+params.id);

  return (
    <main className="space-y-8">
      <h1 className="text-center text-4xl text-myblue">{quote?.quote}</h1>
      <div className="rounded-md bg-white px-3 pb-8 pt-4">
        <h2 className="my-2 text-3xl font-medium">ڕوونکردنەوە</h2>
        <p className="text-2xl">{quote?.explaination}</p>
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
