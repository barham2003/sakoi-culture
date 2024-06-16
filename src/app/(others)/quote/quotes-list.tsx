import { getAllQuotes } from "@/actions/quote-actions";
import { soraniKurdishLetters } from "@/lib/utils";
import Link from "next/link";

export default async function QuotesList() {
  const quotes = await getAllQuotes();
  return (
    <section className="rounded-md bg-white p-2">
      <h2 className=" my-4 text-center text-3xl font-bold text-myblue">
        بگەڕێ بۆ پەند
      </h2>
      <ul>
        <li className="my-4 flex flex-wrap justify-center gap-2 border border-myblue p-2 text-3xl">
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
            <ul>
              {quotes
                .filter((quote) => quote.quote.at(0) === letter)
                .map((quote) => (
                  <li key={quote.id} className="my-2">
                    <span>&quot;{quote.quote}&quot;</span>
                    <span className=" text-myblue/90">
                      :{quote.explaination}
                    </span>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
