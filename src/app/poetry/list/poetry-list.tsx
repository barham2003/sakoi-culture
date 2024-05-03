import { getPoetries } from "@/actions/poetry-actions";
import PRE from "@/components/ui/pre";
import Link from "next/link";

export default async function PoetryList() {
  const poetries = await getPoetries();
  const poets = [...new Set(poetries.map((poet) => poet.poet))];
  return (
    <section className=" bg-white p-2 text-center">
      <h2 className=" my-4 text-center text-3xl font-bold text-myblue">
        بگەڕێ بۆ شیعر
      </h2>

      <ul>
        <li className="my-4 flex flex-wrap justify-start gap-4 border border-myblue p-2 text-sm">
          {poets.map((poet) => (
            <Link key={poet} href={`#${poet}`}>
              {poet}
            </Link>
          ))}
        </li>
      </ul>
      {poets.map((poet, index) => {
        const filteredPoetries = poetries.filter(
          (poetry) => poetry.poet === poet,
        );
        return (
          <article key={poet} id={poet} className="my-10">
            <h2 className="text-3xl text-myblue  underline underline-offset-8">
              {poet}
            </h2>
            {filteredPoetries.map((poetry) => (
              <div key={poetry.id} className="my-4 ">
                <h3 className=" font-bold lg:text-2xl">{poetry.title}</h3>
                <PRE className="overflow-x-auto overflow-y-hidden text-[0.8em] lg:text-lg">
                  {poetry.text}
                </PRE>
              </div>
            ))}
          </article>
        );
      })}
    </section>
  );
}
