import { getPoetries } from "@/actions/poetry-actions";
import PRE from "@/components/ui/pre";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PoetryItem from "./poetry";

export default async function PoetryList() {
  const poetries = await getPoetries();
  const poets = [...new Set(poetries.map((poet) => poet.poet))];
  return (
    <section className=" rounded-md bg-white p-2 text-center">
      <h2 className=" my-4 text-center text-3xl font-bold text-myblue">
        بگەڕێ بۆ شیعر
      </h2>

      <ul>
        <LI>
          {poets.map((poet) => (
            <Link key={poet} href={`#${poet}`}>
              {poet}
            </Link>
          ))}
        </LI>
      </ul>
      {poets.map((poet) => {
        const filteredPoetries = poetries.filter(
          (poetry) => poetry.poet === poet,
        );
        return (
          <article key={poet} id={poet} className="my-10">
            <h2 className="text-right text-base text-myblue lg:text-3xl">
              {poet}
            </h2>
            {filteredPoetries.map((poetry) => (
              <PoetryItem poetry={poetry} key={poetry.id} />
            ))}
          </article>
        );
      })}
    </section>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="
  my-4 flex flex-wrap justify-start gap-4 border border-myblue p-2 text-sm
  "
    >
      {children}
    </li>
  );
}
