import { getAllQuotes } from "@/actions/quote-actions";

export default async function QuotesList() {
  const quotes = await getAllQuotes();
  return (
    <section>
      <h2>بگەڕێ بۆ پەند</h2>

      <ul>
        {quotes.map((quote, index) => (
          <li key={quote.id}>{quote.quote}</li>
        ))}
      </ul>
    </section>
  );
}
