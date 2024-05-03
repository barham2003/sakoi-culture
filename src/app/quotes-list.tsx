import { getAllQuotes } from "@/actions/quote-actions";
import { like } from "drizzle-orm";
import Link from "next/link";

const soraniKurdishLetters = [
  "ئ",
  "ا",
  "ب",
  "پ",
  "ت",
  "ج",
  "چ",
  "ح",
  "خ",
  "د",
  "ر",
  "ز",
  "ژ",
  "س",
  "ش",
  "ع",
  "غ",
  "ف",
  "ڤ",
  "ق",
  "ک",
  "گ",
  "ل",
  "ڵ",
  "م",
  "ن",
  "ه",
  "و",
  "ۆ",
  "ی",
  "ء",
];

export default async function QuotesList() {
  const quotes = await getAllQuotes();
  return (
    <section className="bg-white p-2" dir="rtl">
      <h2 className=" text-myblue my-4 text-center text-3xl font-bold">
        بگەڕێ بۆ پەند
      </h2>
      <ul>
        <li className="border-myblue my-4 flex flex-wrap justify-center gap-2 border p-2 text-3xl">
          {soraniKurdishLetters.map((letter) => (
            <Link key={letter} href={`#${letter}`}>
              {letter}
            </Link>
          ))}
        </li>
      </ul>

      <ul className="space-y-4">
        {soraniKurdishLetters.map((letter, index) => (
          <li key={index} id={letter}>
            <span className=" text-3xl">{letter}</span>
            {quotes
              .filter((quote) => quote.quote.at(0) === letter)
              .map((quote) => (
                <li key={quote.id} dir="rtl">
                  <span>&quot;{quote.quote}&quot;</span>
                  <p className=" text-myblue/90">
                    ڕوونکردنەوە: {quote.explaination}
                  </p>
                </li>
              ))}
          </li>
        ))}

        {/* {quotes.map((quote, index) => (
          <li key={quote.id} dir="rtl">
            <span>&quot;{quote.quote}&quot;</span>
            <p className=" text-myblue/90">ڕوونکردنەوە: {quote.explaination}</p>
          </li>
        ))} */}
      </ul>
    </section>
  );
}
